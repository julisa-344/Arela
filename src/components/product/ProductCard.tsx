import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/shared/types/product";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "@/components/product/AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-arela-sand/60">
        <Link href={`/producto/${product.slug}`} className="block h-full w-full p-6">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <AddToCartButton
          product={product}
          icon
          className="absolute bottom-3 right-3 shadow-md"
        />
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <Link href={`/producto/${product.slug}`}>
          <h3 className="text-sm text-arela-ink/70">{product.name}</h3>
        </Link>

        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-arela-ink">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-xs text-arela-ink/40 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
