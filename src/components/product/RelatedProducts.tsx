import { ProductCard } from "@/components/product/ProductCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { Product } from "@/shared/types/product";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="border-t border-arela-ink/10 py-16">
      <h2 className="font-display text-2xl text-arela-ink">también te puede gustar</h2>

      <Stagger className="mt-8 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
        {products.map((product) => (
          <StaggerItem key={product.slug}>
            <ProductCard product={product} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
