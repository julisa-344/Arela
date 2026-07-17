"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { whatsappCartUrl } from "@/lib/whatsapp";

export default function CarritoPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <FadeIn>
        <Container className="flex flex-col items-center gap-6 py-24 text-center">
          <h1 className="font-display text-3xl text-arela-ink">tu carrito esta vacio</h1>
          <p className="text-sm text-arela-ink/60">Explora la tienda y encuentra tu proxima rutina.</p>
          <Button href="/tienda">ir a la tienda</Button>
        </Container>
      </FadeIn>
    );
  }

  return (
    <Container className="py-16">
      <FadeIn>
        <h1 className="font-display text-3xl text-arela-ink">tu carrito</h1>
      </FadeIn>

      <Stagger className="mt-10 flex flex-col gap-6">
        {items.map((item) => (
          <StaggerItem key={item.product.slug}>
            <div className="flex items-center gap-4 border-b border-arela-ink/10 pb-6">
              <Link href={`/producto/${item.product.slug}`} className="h-24 w-20 shrink-0 overflow-hidden bg-arela-terracotta/10">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  width={160}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </Link>

              <div className="flex flex-1 flex-col gap-1">
                <Link href={`/producto/${item.product.slug}`} className="text-sm uppercase tracking-wide text-arela-ink">
                  {item.product.name}
                </Link>
                <span className="font-price text-xs text-arela-ink/50">{formatPrice(item.product.price)}</span>

                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-arela-ink/20">
                    <button
                      type="button"
                      className="px-3 py-1 text-sm"
                      onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                      aria-label="Disminuir cantidad"
                    >
                      -
                    </button>
                    <span className="font-price w-6 text-center text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      className="px-3 py-1 text-sm"
                      onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="text-xs uppercase tracking-wide text-arela-rust hover:underline"
                    onClick={() => removeItem(item.product.slug)}
                  >
                    quitar
                  </button>
                </div>
              </div>

              <span className="font-price text-sm text-arela-ink">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <FadeIn delay={0.1} className="mt-10 flex flex-col items-end gap-4">
        <div className="flex items-baseline gap-3">
          <span className="text-xs uppercase tracking-widest text-arela-ink/50">Total</span>
          <span className="font-price text-xl text-arela-ink">{formatPrice(totalPrice)}</span>
        </div>

        <Button
          href={whatsappCartUrl(items)}
          target="_blank"
          rel="noopener noreferrer"
        >
          finalizar pedido por whatsapp
        </Button>
      </FadeIn>
    </Container>
  );
}
