import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PRODUCT_CATEGORIES } from "@/shared/constants/site";
import { getAllProducts, getProductsByCategory } from "@/lib/products";

export const metadata = {
  title: "Tienda | Arela",
};

interface TiendaPageProps {
  searchParams: Promise<{ categoria?: string }>;
}

export default async function TiendaPage({ searchParams }: TiendaPageProps) {
  const { categoria } = await searchParams;
  const products = categoria ? getProductsByCategory(categoria) : getAllProducts();

  return (
    <Container className="py-16">
      <FadeIn>
        <h1 className="font-display text-4xl text-arela-ink">tienda</h1>

        <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-widest">
          <Link
            href="/tienda"
            className={!categoria ? "text-arela-rust" : "text-arela-ink/60 hover:text-arela-rust"}
          >
            todos
          </Link>
          {PRODUCT_CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={`/tienda?categoria=${cat.value}`}
              className={
                categoria === cat.value
                  ? "text-arela-rust"
                  : "text-arela-ink/60 hover:text-arela-rust"
              }
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </FadeIn>

      <Stagger className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
        {products.length > 0 ? (
          products.map((product) => (
            <StaggerItem key={product.slug}>
              <ProductCard product={product} />
            </StaggerItem>
          ))
        ) : (
          <p className="col-span-full text-sm text-arela-ink/60">
            No hay productos en esta categoria por el momento.
          </p>
        )}
      </Stagger>
    </Container>
  );
}