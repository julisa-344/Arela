'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../auth-context';
import { ordersService } from '../firebase/services/orders.service';
import type { Order } from '@/shared/types/firebase';

export function useOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userOrders = await ordersService.getByUserId(user.uid);
        setOrders(userOrders);
      } catch (err) {
        setError('Error al cargar pedidos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const refreshOrders = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const userOrders = await ordersService.getByUserId(user.uid);
      setOrders(userOrders);
    } catch (err) {
      setError('Error al actualizar pedidos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { orders, loading, error, refreshOrders };
}

export function useOrder(orderId: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const result = await ordersService.getById(orderId);
        setOrder(result);
      } catch (err) {
        setError('Error al cargar pedido');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  return { order, loading, error };
}
