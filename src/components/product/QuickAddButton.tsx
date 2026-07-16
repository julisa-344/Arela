"use client";

import { useState } from "react";
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
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Agregar ${product.name} al carrito`}
      className={cn(
        "w-full rounded-full bg-arela-ink/95 py-2.5 text-[11px] font-medium uppercase tracking-widest text-arela-cream shadow-md backdrop-blur transition-colors hover:bg-arela-rust",
        className
      )}
    >
      {added ? "Agregado ✓" : "Agregar rápido"}
    </button>
  );
}
