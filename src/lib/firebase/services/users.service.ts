import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  increment,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from '../config';
import { COLLECTIONS } from '../constants';
import type { User, UserAddress } from '@/shared/types/firebase';

export const usersService = {
  // Crear o actualizar usuario
  async createOrUpdate(userId: string, userData: Partial<User>) {
    const docRef = doc(db, COLLECTIONS.USERS, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Actualizar usuario existente
      await updateDoc(docRef, {
        ...userData,
        updatedAt: Timestamp.now(),
        lastLoginAt: Timestamp.now(),
      });
    } else {
      // Crear nuevo usuario
      const newUser: User = {
        id: userId,
        email: userData.email || '',
        displayName: userData.displayName || '',
        ...(userData.phone !== undefined && { phone: userData.phone }),
        ...(userData.photoURL !== undefined && { photoURL: userData.photoURL }),
        addresses: [],
        wishlist: [],
        rewardPoints: 0,
        totalSpent: 0,
        isActive: true,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        lastLoginAt: Timestamp.now(),
      };
      await setDoc(docRef, newUser);
    }
  },

  // Obtener usuario por ID
  async getById(userId: string) {
    const docRef = doc(db, COLLECTIONS.USERS, userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return { id: docSnap.id, ...docSnap.data() } as User;
  },

  // Agregar dirección
  async addAddress(userId: string, address: Omit<UserAddress, 'id'>) {
    const user = await this.getById(userId);
    if (!user) throw new Error('Usuario no encontrado');

    const newAddress: UserAddress = {
      ...address,
      id: `addr_${Date.now()}`,
    };

    // Si es la primera dirección o se marca como default, desmarcar otras
    if (address.isDefault || user.addresses.length === 0) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
      newAddress.isDefault = true;
    }

    const docRef = doc(db, COLLECTIONS.USERS, userId);
    await updateDoc(docRef, {
      addresses: [...user.addresses, newAddress],
      updatedAt: Timestamp.now(),
    });

    return newAddress;
  },

  // Actualizar dirección
  async updateAddress(userId: string, addressId: string, updates: Partial<UserAddress>) {
    const user = await this.getById(userId);
    if (!user) throw new Error('Usuario no encontrado');

    const updatedAddresses = user.addresses.map((addr) => {
      if (addr.id === addressId) {
        return { ...addr, ...updates };
      }
      // Si se marca esta como default, desmarcar las demás
      if (updates.isDefault && addr.id !== addressId) {
        return { ...addr, isDefault: false };
      }
      return addr;
    });

    const docRef = doc(db, COLLECTIONS.USERS, userId);
    await updateDoc(docRef, {
      addresses: updatedAddresses,
      updatedAt: Timestamp.now(),
    });
  },

  // Eliminar dirección
  async deleteAddress(userId: string, addressId: string) {
    const user = await this.getById(userId);
    if (!user) throw new Error('Usuario no encontrado');

    const updatedAddresses = user.addresses.filter((addr) => addr.id !== addressId);

    // Si se eliminó la default y hay otras, marcar la primera como default
    const hadDefault = user.addresses.find((a) => a.id === addressId)?.isDefault;
    if (hadDefault && updatedAddresses.length > 0) {
      updatedAddresses[0].isDefault = true;
    }

    const docRef = doc(db, COLLECTIONS.USERS, userId);
    await updateDoc(docRef, {
      addresses: updatedAddresses,
      updatedAt: Timestamp.now(),
    });
  },

  // Agregar producto a wishlist
  async addToWishlist(userId: string, productId: string) {
    const docRef = doc(db, COLLECTIONS.USERS, userId);
    await updateDoc(docRef, {
      wishlist: arrayUnion(productId),
      updatedAt: Timestamp.now(),
    });
  },

  // Quitar producto de wishlist
  async removeFromWishlist(userId: string, productId: string) {
    const docRef = doc(db, COLLECTIONS.USERS, userId);
    await updateDoc(docRef, {
      wishlist: arrayRemove(productId),
      updatedAt: Timestamp.now(),
    });
  },

  // Obtener wishlist completa (con datos de productos)
  async getWishlist(userId: string) {
    const user = await this.getById(userId);
    if (!user || user.wishlist.length === 0) {
      return [];
    }

    // Obtener productos de la wishlist
    const productPromises = user.wishlist.map((productId) =>
      getDoc(doc(db, COLLECTIONS.PRODUCTS, productId))
    );

    const productDocs = await Promise.all(productPromises);
    return productDocs
      .filter((doc) => doc.exists())
      .map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  // Agregar puntos de recompensa
  async addRewardPoints(userId: string, points: number) {
    const docRef = doc(db, COLLECTIONS.USERS, userId);
    await updateDoc(docRef, {
      rewardPoints: increment(points),
      updatedAt: Timestamp.now(),
    });
  },

  // Usar puntos de recompensa
  async useRewardPoints(userId: string, points: number) {
    const user = await this.getById(userId);
    if (!user) throw new Error('Usuario no encontrado');
    if (user.rewardPoints < points) {
      throw new Error('Puntos insuficientes');
    }

    const docRef = doc(db, COLLECTIONS.USERS, userId);
    await updateDoc(docRef, {
      rewardPoints: increment(-points),
      updatedAt: Timestamp.now(),
    });
  },

  // Actualizar total gastado
  async updateTotalSpent(userId: string, amount: number) {
    const docRef = doc(db, COLLECTIONS.USERS, userId);
    await updateDoc(docRef, {
      totalSpent: increment(amount),
      updatedAt: Timestamp.now(),
    });
  },
};
