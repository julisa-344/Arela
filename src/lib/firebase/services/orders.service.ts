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
} from 'firebase/firestore';
import { db } from '../config';
import { COLLECTIONS, ORDER_STATUSES } from '../constants';
import type { Order, OrderItem, OrderStatus } from '@/shared/types/firebase';
import { productsService } from './products.service';
import { usersService } from './users.service';

export const ordersService = {
  // Crear pedido
  async create(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt' | 'statusHistory'>) {
    const docRef = doc(collection(db, COLLECTIONS.ORDERS));
    const now = Timestamp.now();
    
    // Generar número de orden
    const year = new Date().getFullYear();
    const orderNumber = `ARF-${year}-${docRef.id.slice(-6).toUpperCase()}`;

    const order: Order = {
      id: docRef.id,
      orderNumber,
      ...orderData,
      statusHistory: [
        {
          status: orderData.status,
          timestamp: now,
          note: 'Pedido creado',
        },
      ],
      createdAt: now,
      updatedAt: now,
    };

    await setDoc(docRef, order);

    // Reducir stock de productos
    for (const item of orderData.items) {
      await productsService.reduceStock(item.productId, item.variantId, item.quantity);
      await productsService.incrementSales(item.productId, item.quantity);
    }

    // Actualizar total gastado del usuario
    await usersService.updateTotalSpent(orderData.userId, orderData.total);

    // Agregar puntos de recompensa (1 punto por cada S/ 10 gastados)
    const points = Math.floor(orderData.total / 10);
    await usersService.addRewardPoints(orderData.userId, points);

    return order;
  },

  // Obtener pedido por ID
  async getById(orderId: string) {
    const docRef = doc(db, COLLECTIONS.ORDERS, orderId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return { id: docSnap.id, ...docSnap.data() } as Order;
  },

  // Obtener pedidos de un usuario
  async getByUserId(userId: string, limitCount = 20) {
    const q = query(
      collection(db, COLLECTIONS.ORDERS),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Order));
  },

  // Obtener todos los pedidos (para admin)
  async getAll(limitCount = 50) {
    const q = query(
      collection(db, COLLECTIONS.ORDERS),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Order));
  },

  // Obtener pedidos por estado
  async getByStatus(status: OrderStatus, limitCount = 50) {
    const q = query(
      collection(db, COLLECTIONS.ORDERS),
      where('status', '==', status),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Order));
  },

  // Actualizar estado del pedido
  async updateStatus(orderId: string, newStatus: OrderStatus, note?: string) {
    const order = await this.getById(orderId);
    if (!order) throw new Error('Pedido no encontrado');

    const docRef = doc(db, COLLECTIONS.ORDERS, orderId);
    const now = Timestamp.now();

    const updates: Partial<Order> = {
      status: newStatus,
      statusHistory: [
        ...order.statusHistory,
        {
          status: newStatus,
          timestamp: now,
          note,
        },
      ],
      updatedAt: now,
    };

    // Si se entrega, agregar timestamp
    if (newStatus === ORDER_STATUSES.DELIVERED) {
      updates.deliveredAt = now;
    }

    await updateDoc(docRef, updates);
  },

  // Actualizar estado de pago
  async updatePaymentStatus(orderId: string, status: 'pending' | 'confirmed' | 'failed', proofUrl?: string) {
    const docRef = doc(db, COLLECTIONS.ORDERS, orderId);
    const updates: any = {
      paymentStatus: status,
      updatedAt: Timestamp.now(),
    };

    if (proofUrl) {
      updates.paymentProof = proofUrl;
    }

    await updateDoc(docRef, updates);

    // Si se confirma el pago, cambiar a processing
    if (status === 'confirmed') {
      await this.updateStatus(orderId, ORDER_STATUSES.PROCESSING, 'Pago confirmado');
    }
  },

  // Agregar información de tracking
  async addTrackingInfo(orderId: string, trackingNumber: string, courierName: string) {
    const order = await this.getById(orderId);
    if (!order) throw new Error('Pedido no encontrado');

    const docRef = doc(db, COLLECTIONS.ORDERS, orderId);
    await updateDoc(docRef, {
      'shippingDetails.trackingNumber': trackingNumber,
      'shippingDetails.courierName': courierName,
      updatedAt: Timestamp.now(),
    });

    await this.updateStatus(orderId, ORDER_STATUSES.SHIPPED, `Envío por ${courierName} - ${trackingNumber}`);
  },

  // Cancelar pedido
  async cancel(orderId: string, reason?: string) {
    await this.updateStatus(orderId, ORDER_STATUSES.CANCELLED, reason);
  },

  // Agregar nota de admin
  async addAdminNote(orderId: string, note: string) {
    const order = await this.getById(orderId);
    if (!order) throw new Error('Pedido no encontrado');

    const docRef = doc(db, COLLECTIONS.ORDERS, orderId);
    const currentNotes = order.adminNotes || '';
    const newNotes = currentNotes 
      ? `${currentNotes}\n[${new Date().toLocaleString('es-PE')}] ${note}`
      : `[${new Date().toLocaleString('es-PE')}] ${note}`;

    await updateDoc(docRef, {
      adminNotes: newNotes,
      updatedAt: Timestamp.now(),
    });
  },
};
