import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryConstraint,
  DocumentSnapshot,
  Timestamp,
  increment,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from '../config';
import { COLLECTIONS } from '../constants';
import type { Product, ProductVariant } from '@/shared/types/firebase';

// ============= PRODUCTOS =============

export const productsService = {
  // Obtener todos los productos (con paginación)
  async getAll(limitCount = 20, lastDoc?: DocumentSnapshot) {
    const constraints: QueryConstraint[] = [
      where('isActive', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount),
    ];

    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }

    const q = query(collection(db, COLLECTIONS.PRODUCTS), ...constraints);
    const snapshot = await getDocs(q);

    return {
      products: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product)),
      lastDoc: snapshot.docs[snapshot.docs.length - 1],
      hasMore: snapshot.docs.length === limitCount,
    };
  },

  // Obtener producto por ID
  async getById(productId: string) {
    const docRef = doc(db, COLLECTIONS.PRODUCTS, productId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return { id: docSnap.id, ...docSnap.data() } as Product;
  },

  // Obtener producto por slug
  async getBySlug(slug: string) {
    const q = query(
      collection(db, COLLECTIONS.PRODUCTS),
      where('slug', '==', slug),
      where('isActive', '==', true),
      limit(1)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Product;
  },

  // Obtener productos por categoría
  async getByCategory(categoryId: string, limitCount = 20) {
    const q = query(
      collection(db, COLLECTIONS.PRODUCTS),
      where('categoryId', '==', categoryId),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
  },

  // Obtener productos por marca
  async getByBrand(brandId: string, limitCount = 20) {
    const q = query(
      collection(db, COLLECTIONS.PRODUCTS),
      where('brandId', '==', brandId),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
  },

  // Obtener productos destacados (best sellers)
  async getFeatured(limitCount = 8) {
    const q = query(
      collection(db, COLLECTIONS.PRODUCTS),
      where('isFeatured', '==', true),
      where('isActive', '==', true),
      orderBy('salesCount', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
  },

  // Obtener productos nuevos
  async getNew(limitCount = 8) {
    const q = query(
      collection(db, COLLECTIONS.PRODUCTS),
      where('isNew', '==', true),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
  },

  // Buscar productos
  async search(searchTerm: string, limitCount = 20) {
    // Nota: Para búsqueda más avanzada, considera usar Algolia o Typesense
    // Esta es una búsqueda básica por tags
    const q = query(
      collection(db, COLLECTIONS.PRODUCTS),
      where('tags', 'array-contains', searchTerm.toLowerCase()),
      where('isActive', '==', true),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
  },

  // Crear producto
  async create(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    const docRef = doc(collection(db, COLLECTIONS.PRODUCTS));
    const now = Timestamp.now();

    const product: Product = {
      id: docRef.id,
      ...productData,
      viewsCount: 0,
      salesCount: 0,
      createdAt: now,
      updatedAt: now,
    };

    await setDoc(docRef, product);
    return product;
  },

  // Actualizar producto
  async update(productId: string, updates: Partial<Product>) {
    const docRef = doc(db, COLLECTIONS.PRODUCTS, productId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  },

  // Eliminar producto (soft delete)
  async delete(productId: string) {
    const docRef = doc(db, COLLECTIONS.PRODUCTS, productId);
    await updateDoc(docRef, {
      isActive: false,
      updatedAt: Timestamp.now(),
    });
  },

  // Incrementar contador de vistas
  async incrementViews(productId: string) {
    const docRef = doc(db, COLLECTIONS.PRODUCTS, productId);
    await updateDoc(docRef, {
      viewsCount: increment(1),
    });
  },

  // Incrementar contador de ventas
  async incrementSales(productId: string, quantity = 1) {
    const docRef = doc(db, COLLECTIONS.PRODUCTS, productId);
    await updateDoc(docRef, {
      salesCount: increment(quantity),
    });
  },

  // Actualizar stock de variante
  async updateVariantStock(productId: string, variantId: string, newStock: number) {
    const product = await this.getById(productId);
    if (!product) throw new Error('Producto no encontrado');

    const updatedVariants = product.variants.map((v) =>
      v.id === variantId ? { ...v, stock: newStock } : v
    );

    await this.update(productId, { variants: updatedVariants });
  },

  // Reducir stock después de una compra
  async reduceStock(productId: string, variantId: string | undefined, quantity: number) {
    const product = await this.getById(productId);
    if (!product) throw new Error('Producto no encontrado');

    if (product.hasVariants && variantId) {
      const updatedVariants = product.variants.map((v) =>
        v.id === variantId ? { ...v, stock: Math.max(0, v.stock - quantity) } : v
      );
      await this.update(productId, { variants: updatedVariants });
    } else if (!product.hasVariants && product.baseStock !== undefined) {
      await this.update(productId, {
        baseStock: Math.max(0, product.baseStock - quantity),
      });
    }
  },
};
