"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/shared/types/product";
import { formatPrice } from "@/lib/format";
import { QuickAddButton } from "@/components/product/QuickAddButton";

export function ProductCard({ product }: { product: Product }) {
  const discountPercent = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : null;

  return (
    <motion.article
      className="group flex cursor-pointer flex-col"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <motion.div
        variants={{
          rest: { y: 0, boxShadow: "0 1px 2px rgba(43,10,5,0.04)" },
          hover: { y: -6, boxShadow: "0 20px 32px -12px rgba(43,10,5,0.18)" },
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-square overflow-hidden rounded-2xl border border-arela-ink/5 bg-arela-white"
      >
        <Link href={`/producto/${product.slug}`} className="block h-full w-full p-6">
          <motion.div
            variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className="h-full w-full object-contain"
            />
          </motion.div>
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {discountPercent && discountPercent > 0 && (
            <span className="font-price rounded-full bg-arela-rust px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-arela-cream">
              -{discountPercent}%
            </span>
          )}
          {product.isFeatured && (
            <span className="rounded-full bg-arela-ink px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-arela-cream">
              Best seller
            </span>
          )}
          {product.isNew && !product.isFeatured && (
            <span className="rounded-full border border-arela-ink/15 bg-arela-white px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-arela-ink">
              Nuevo
            </span>
          )}
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-arela-white/80">
            <span className="rounded-full bg-arela-ink px-3 py-1 text-[10px] uppercase tracking-widest text-arela-cream">
              Agotado
            </span>
          </div>
        )}

        <motion.div
          variants={{
            rest: { opacity: 0, y: 10 },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-x-3 bottom-3"
        >
          <div className="pointer-events-auto">
            <QuickAddButton product={product} />
          </div>
        </motion.div>
      </motion.div>

      <div className="mt-4 flex flex-col gap-1">
        {product.brandName && (
          <span className="text-[10px] uppercase tracking-widest text-arela-ink/40">
            {product.brandName}
          </span>
        )}

        <Link href={`/producto/${product.slug}`}>
          <h3 className="text-sm text-arela-ink/80 transition-colors group-hover:text-arela-rust">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-price text-base font-medium text-arela-ink">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="font-price text-xs text-arela-ink/40 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
