import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/shared/types/product";
import { formatPrice } from "@/lib/format";
import { QuickAddButton } from "@/components/product/QuickAddButton";

export function ProductCard({ product }: { product: Product }) {
  const discountPercent = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : null;

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

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {discountPercent && discountPercent > 0 && (
            <span className="rounded-full bg-arela-rust px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-arela-cream">
              -{discountPercent}%
            </span>
          )}
          {product.isFeatured && (
            <span className="rounded-full bg-arela-ink px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-arela-cream">
              Best seller
            </span>
          )}
          {product.isNew && !product.isFeatured && (
            <span className="rounded-full bg-arela-white/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-arela-ink">
              Nuevo
            </span>
          )}
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-arela-cream/70">
            <span className="rounded-full bg-arela-ink px-3 py-1 text-[10px] uppercase tracking-widest text-arela-cream">
              Agotado
            </span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="pointer-events-auto">
            <QuickAddButton product={product} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        {product.brandName && (
          <span className="text-[10px] uppercase tracking-widest text-arela-ink/40">
            {product.brandName}
          </span>
        )}

        <Link href={`/producto/${product.slug}`}>
          <h3 className="text-sm text-arela-ink/80 transition-colors group-hover:text-arela-ink">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-base font-medium text-arela-ink">{formatPrice(product.price)}</span>
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
