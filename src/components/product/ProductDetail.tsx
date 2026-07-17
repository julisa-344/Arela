"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/shared/types/product";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { IngredientDiagram } from "@/components/product/IngredientDiagram";
import { Accordion, type AccordionItemData } from "@/components/ui/Accordion";
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
  const [quantity, setQuantity] = useState(1);

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
  const availableStock = selectedVariant ? selectedVariant.stock : product.stock;
  const lowStock = typeof availableStock === "number" && availableStock > 0 && availableStock <= 5;
  const inStock = selectedVariant ? selectedVariant.stock > 0 : product.inStock;
  const maxQuantity = typeof availableStock === "number" ? Math.max(availableStock, 1) : 99;

  const accordionItems: AccordionItemData[] = [
    {
      key: "descripcion",
      title: "Descripción",
      content: <p>{product.description}</p>,
    },
    ...(product.ingredients && product.ingredients.length > 0
      ? [
          {
            key: "composicion",
            title: "Composición / Ingredientes",
            content: <p>{product.ingredients.join(", ")}</p>,
          },
        ]
      : []),
    ...(product.howToUse
      ? [
          {
            key: "como-usar",
            title: "Cómo usar",
            content: <p>{product.howToUse}</p>,
          },
        ]
      : []),
    ...(product.resultOfApplication
      ? [
          {
            key: "resultado",
            title: "Resultado de la aplicación",
            content: <p>{product.resultOfApplication}</p>,
          },
        ]
      : []),
    ...(product.texture
      ? [
          {
            key: "textura",
            title: "Textura",
            content: <p>{product.texture}</p>,
          },
        ]
      : []),
    ...(product.aroma
      ? [
          {
            key: "aroma",
            title: "Aroma",
            content: <p>{product.aroma}</p>,
          },
        ]
      : []),
  ];

  return (
    <div className="grid gap-10 py-16 md:grid-cols-2 md:gap-16">
      {/* Galeria */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-4"
      >
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-arela-ink/5 bg-arela-white">
          {discountPercent && discountPercent > 0 && (
            <span className="font-price absolute left-4 top-4 z-10 rounded-full bg-arela-rust px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-arela-cream">
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
                  "relative h-20 w-20 cursor-pointer overflow-hidden rounded-xl border border-arela-ink/5 bg-arela-white ring-1 ring-transparent transition-all hover:border-arela-ink/20",
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
          <span className="font-price text-2xl text-arela-ink">{formatPrice(displayProduct.price)}</span>
          {displayProduct.compareAtPrice && (
            <span className="font-price text-sm text-arela-ink/40 line-through">
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
                    "cursor-pointer rounded-full border px-4 py-2 text-xs uppercase tracking-wide transition-colors",
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
          <p className="font-price text-xs font-medium uppercase tracking-wide text-arela-rust">
            Últimas {availableStock} unidades disponibles
          </p>
        )}

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full border border-arela-ink/15">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Disminuir cantidad"
              className="flex h-10 w-10 cursor-pointer items-center justify-center text-arela-ink/70 transition-colors hover:text-arela-ink disabled:cursor-not-allowed disabled:opacity-30"
            >
              −
            </button>
            <span className="font-price w-8 text-center text-sm text-arela-ink">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
              disabled={quantity >= maxQuantity}
              aria-label="Aumentar cantidad"
              className="flex h-10 w-10 cursor-pointer items-center justify-center text-arela-ink/70 transition-colors hover:text-arela-ink disabled:cursor-not-allowed disabled:opacity-30"
            >
              +
            </button>
          </div>

          <AddToCartButton
            product={displayProduct}
            quantity={quantity}
            size="lg"
            label="Agregar al carrito"
            className={cn("flex-1 md:flex-initial", !inStock && "pointer-events-none opacity-40")}
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

        <Accordion items={accordionItems} defaultOpenKey="descripcion" />
      </motion.div>

      {product.compositionIngredients && product.compositionIngredients.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-2"
        >
          <div className="border-t border-arela-ink/10 pt-10">
            <h2 className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-arela-ink/50">
              Ingredientes clave
            </h2>
            <IngredientDiagram
              image={gallery[0] ?? product.image}
              alt={product.name}
              ingredients={product.compositionIngredients}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
