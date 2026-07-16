'use client';

import { useState, useEffect } from 'react';
import { productsService } from '../firebase/services/products.service';
import type { Product } from '@/shared/types/firebase';

export function useProducts(limitCount = 20) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await productsService.getAll(limitCount);
        setProducts(result.products);
      } catch (err) {
        setError('Error al cargar productos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limitCount]);

  return { products, loading, error };
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const result = await productsService.getBySlug(slug);
        setProduct(result);
        
        // Incrementar vistas
        if (result) {
          await productsService.incrementViews(result.id);
        }
      } catch (err) {
        setError('Error al cargar producto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  return { product, loading, error };
}

export function useFeaturedProducts(limitCount = 8) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await productsService.getFeatured(limitCount);
        setProducts(result);
      } catch (err) {
        setError('Error al cargar productos destacados');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limitCount]);

  return { products, loading, error };
}

export function useProductsByCategory(categoryId: string, limitCount = 20) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await productsService.getByCategory(categoryId, limitCount);
        setProducts(result);
      } catch (err) {
        setError('Error al cargar productos de la categoría');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId, limitCount]);

  return { products, loading, error };
}
