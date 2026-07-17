import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { getAllProducts } from "@/lib/products";

export async function BestSellers() {
  const products = (await getAllProducts()).slice(0, 3);

  return (
    <section className="py-20">
      <Container>
        <FadeIn className="mb-10 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-arela-ink" />
          <h2 className="text-2xl">mas vendidos</h2>
        </FadeIn>

        <Stagger className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:gap-10">
          {products.map((product) => (
            <StaggerItem key={product.slug}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}