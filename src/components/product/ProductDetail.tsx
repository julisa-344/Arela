"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/shared/types/product";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { cn } from "@/lib/cn";

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0 text-arela-rust">
      <path
        d="M4 10.5l3.5 3.5L16 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.hasVariants ? product.variants[0]?.id : undefined
  );

  const selectedVariant = product.hasVariants
    ? product.variants.find((v) => v.id === selectedVariantId)
    : undefined;

  const displayProduct = useMemo(() => {
    if (!selectedVariant) return product;
    return {
      ...product,
      price: selectedVariant.price,
      compareAtPrice: selectedVariant.compareAtPrice,
      size: selectedVariant.name,
      image: selectedVariant.image || product.image,
    };
  }, [product, selectedVariant]);

  const gallery = product.gallery.length > 0 ? product.gallery : [product.image];
  const discountPercent = displayProduct.compareAtPrice
    ? Math.round((1 - displayProduct.price / displayProduct.compareAtPrice) * 100)
    : null;
  const lowStock = selectedVariant ? selectedVariant.stock > 0 && selectedVariant.stock <= 5 : false;
  const inStock = selectedVariant ? selectedVariant.stock > 0 : product.inStock;

  return (
    <div className="grid gap-10 py-16 md:grid-cols-2 md:gap-16">
      {/* Galeria */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-4"
      >
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-arela-sand/60">
          {discountPercent && discountPercent > 0 && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-arela-rust px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-arela-cream">
              -{discountPercent}%
            </span>
          )}
          <Image
            src={gallery[activeImage] ?? product.image}
            alt={product.name}
            width={700}
            height={700}
            priority
            className="h-full w-full object-contain p-10"
          />
        </div>

        {gallery.length > 1 && (
          <div className="flex gap-3">
            {gallery.map((src, index) => (
              <button
                key={src + index}
                type="button"
                onClick={() => setActiveImage(index)}
                className={cn(
                  "relative h-20 w-20 overflow-hidden rounded-xl bg-arela-sand/60 ring-1 ring-transparent transition-all",
                  activeImage === index && "ring-arela-ink/40"
                )}
              >
                <Image src={src} alt="" width={120} height={120} className="h-full w-full object-contain p-2" />
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {product.brandName && (
              <span className="text-xs uppercase tracking-widest text-arela-ink/50">
                {product.brandName}
              </span>
            )}
            {product.isFeatured && (
              <span className="rounded-full bg-arela-ink px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-arela-cream">
                Best seller
              </span>
            )}
            {product.isNew && (
              <span className="rounded-full border border-arela-ink/20 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-arela-ink/70">
                Nuevo
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl text-arela-ink md:text-4xl">{product.name}</h1>

          {product.shortDescription && (
            <p className="max-w-md text-sm leading-relaxed text-arela-ink/60">
              {product.shortDescription}
            </p>
          )}
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-2xl text-arela-ink">{formatPrice(displayProduct.price)}</span>
          {displayProduct.compareAtPrice && (
            <span className="text-sm text-arela-ink/40 line-through">
              {formatPrice(displayProduct.compareAtPrice)}
            </span>
          )}
        </div>

        {product.hasVariants && product.variants.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-arela-ink/50">Presentación</span>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariantId(variant.id)}
                  disabled={variant.stock === 0}
                  className={cn(
                    "rounded-full border px-4 py-2 text-xs uppercase tracking-wide transition-colors",
                    variant.id === selectedVariantId
                      ? "border-arela-ink bg-arela-ink text-arela-cream"
                      : "border-arela-ink/20 text-arela-ink/70 hover:border-arela-ink/50",
                    variant.stock === 0 && "cursor-not-allowed opacity-40 line-through"
                  )}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {lowStock && (
          <p className="text-xs font-medium uppercase tracking-wide text-arela-rust">
            Últimas {selectedVariant?.stock} unidades disponibles
          </p>
        )}

        <div>
          <AddToCartButton
            product={displayProduct}
            className={cn("w-full md:w-auto", !inStock && "pointer-events-none opacity-40")}
          />
        </div>

        {product.benefits.length > 0 && (
          <div className="flex flex-col gap-2 border-t border-arela-ink/10 pt-5">
            <span className="text-xs uppercase tracking-widest text-arela-ink/50">Bondades</span>
            <ul className="flex flex-col gap-2">
              {product.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2 text-sm text-arela-ink/75">
                  <CheckIcon />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-2 border-t border-arela-ink/10 pt-5">
          <span className="text-xs uppercase tracking-widest text-arela-ink/50">Descripción</span>
          <p className="max-w-md text-sm leading-relaxed text-arela-ink/70">{product.description}</p>
        </div>

        {product.ingredients && product.ingredients.length > 0 && (
          <div className="flex flex-col gap-2 border-t border-arela-ink/10 pt-5">
            <span className="text-xs uppercase tracking-widest text-arela-ink/50">Ingredientes</span>
            <p className="max-w-md text-sm leading-relaxed text-arela-ink/70">
              {product.ingredients.join(", ")}
            </p>
          </div>
        )}

        {product.howToUse && (
          <div className="flex flex-col gap-2 border-t border-arela-ink/10 pt-5">
            <span className="text-xs uppercase tracking-widest text-arela-ink/50">Cómo usar</span>
            <p className="max-w-md text-sm leading-relaxed text-arela-ink/70">{product.howToUse}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
