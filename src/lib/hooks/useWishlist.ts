'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../auth-context';
import { usersService } from '../firebase/services/users.service';
import type { Product } from '@/shared/types/firebase';

export function useWishlist() {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        setWishlist([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const items = await usersService.getWishlist(user.uid);
        setWishlist(items as Product[]);
      } catch (err) {
        setError('Error al cargar lista de deseos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  const addToWishlist = async (productId: string) => {
    if (!user) {
      throw new Error('Debes iniciar sesión para agregar a favoritos');
    }

    try {
      await usersService.addToWishlist(user.uid, productId);
      // Recargar wishlist
      const items = await usersService.getWishlist(user.uid);
      setWishlist(items as Product[]);
    } catch (err) {
      throw new Error('Error al agregar a favoritos');
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) {
      throw new Error('Debes iniciar sesión');
    }

    try {
      await usersService.removeFromWishlist(user.uid, productId);
      // Recargar wishlist
      const items = await usersService.getWishlist(user.uid);
      setWishlist(items as Product[]);
    } catch (err) {
      throw new Error('Error al quitar de favoritos');
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  return {
    wishlist,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
}
