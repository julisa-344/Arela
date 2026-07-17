import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { getAllProducts } from "@/lib/products";

export async function NewArrivals() {
  const products = await getAllProducts();
  const newProducts = products.filter((p) => p.isNew).slice(0, 4);

  if (newProducts.length === 0) return null;

  return (
    <section className="bg-arela-cream/60 py-20">
      <Container>
        <FadeIn className="mb-10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-arela-rust" />
            <h2 className="text-2xl">recien llegados</h2>
          </div>
          <Button href="/tienda" variant="ghost" size="sm" className="hidden sm:inline-flex">
            ver todo
          </Button>
        </FadeIn>

        <Stagger className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-10">
          {newProducts.map((product) => (
            <StaggerItem key={product.slug}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
