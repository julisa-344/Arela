"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/cn";

export function CartIndicator({ light = false }: { light?: boolean }) {
  const { totalItems } = useCart();

  return (
    <Link
      href="/carrito"
      className={cn(
        "relative flex items-center transition-colors duration-300",
        light ? "text-arela-white" : "text-arela-ink"
      )}
      aria-label="Ver carrito"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="21" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="17" cy="21" r="1.4" fill="currentColor" stroke="none" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-arela-rust text-[10px] text-arela-sand">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
