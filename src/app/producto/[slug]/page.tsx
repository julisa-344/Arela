import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { FadeIn } from "@/components/motion/FadeIn";
import { formatPrice } from "@/lib/format";
import { getAllProducts, getProductBySlug } from "@/lib/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return (
    <Container className="grid gap-10 py-16 md:grid-cols-2">
      <FadeIn className="aspect-4/5 overflow-hidden bg-arela-terracotta/10">
        <Image
          src={product.image}
          alt={product.name}
          width={800}
          height={1000}
          className="h-full w-full object-cover"
          priority
        />
      </FadeIn>

      <FadeIn delay={0.15} className="flex flex-col gap-4">
        <h1 className="font-display text-3xl text-arela-ink">{product.name}</h1>
        {product.size && <p className="text-xs uppercase tracking-widest text-arela-ink/50">{product.size}</p>}

        <div className="flex items-baseline gap-3">
          <span className="text-xl text-arela-ink">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-arela-ink/40 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>

        <p className="max-w-md text-sm leading-relaxed text-arela-ink/70">{product.description}</p>

        <div className="mt-4">
          <AddToCartButton product={product} />
        </div>
      </FadeIn>
    </Container>
  );
}
