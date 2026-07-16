import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../config';
import { COLLECTIONS } from '../constants';
import type { Category, Brand } from '@/shared/types/firebase';

export const categoriesService = {
  async getAll() {
    const q = query(
      collection(db, COLLECTIONS.CATEGORIES),
      where('isActive', '==', true),
      orderBy('order', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Category));
  },
};

export const brandsService = {
  async getAll() {
    const q = query(
      collection(db, COLLECTIONS.BRANDS),
      where('isActive', '==', true),
      orderBy('name', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Brand));
  },
};
