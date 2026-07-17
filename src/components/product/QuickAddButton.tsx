"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/cn";
import type { Product } from "@/shared/types/product";

export function QuickAddButton({ product, className }: { product: Product; className?: string }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (!product.inStock) return null;

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      aria-label={`Agregar ${product.name} al carrito`}
      className={cn(
        "flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-full bg-arela-ink py-2.5 text-[11px] font-medium uppercase tracking-widest text-arela-cream shadow-lg transition-colors duration-200 hover:bg-arela-rust",
        className
      )}
    >
      {added ? (
        "Agregado ✓"
      ) : (
        <>
          <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
            <path
              d="M10 4v12M4 10h12"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          Agregar rápido
        </>
      )}
    </motion.button>
  );
}
