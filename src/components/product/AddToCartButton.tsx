"use client";

import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { Product } from "@/shared/types/product";

export function AddToCartButton({
  product,
  className,
  icon = false,
  quantity = 1,
  size = "sm",
  label = "Agregar",
}: {
  product: Product;
  className?: string;
  icon?: boolean;
  quantity?: number;
  size?: "sm" | "md" | "lg";
  label?: string;
}) {
  const { addItem } = useCart();

  if (icon) {
    return (
      <Button
        type="button"
        aria-label={`Agregar ${product.name} al carrito`}
        className={cn("h-10 w-10 rounded-full! p-0! text-lg", className)}
        onClick={() => addItem(product, quantity)}
      >
        +
      </Button>
    );
  }

  return (
    <Button
      type="button"
      size={size}
      className={className}
      onClick={() => addItem(product, quantity)}
    >
      {label}
    </Button>
  );
}
