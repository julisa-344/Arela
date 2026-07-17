import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { SortSelect } from "@/components/product/SortSelect";
import { BrandFilter } from "@/components/product/BrandFilter";
import { getAllProducts, getAllCategories, getAllBrands, type SortOrder } from "@/lib/products";

export const metadata = {
  title: "Tienda | Arela",
};

export const revalidate = 60;

interface TiendaPageProps {
  searchParams: Promise<{ categoria?: string; marca?: string; orden?: string }>;
}

export default async function TiendaPage({ searchParams }: TiendaPageProps) {
  const { categoria, marca, orden } = await searchParams;
  const sort = (orden as SortOrder) || "relevancia";

  const [products, categories, brands] = await Promise.all([
    getAllProducts({ categoryId: categoria, brandId: marca, sort }),
    getAllCategories(),
    getAllBrands(),
  ]);

  const buildHref = (next: { categoria?: string; marca?: string; orden?: string }) => {
    const params = new URLSearchParams();
    const merged = { categoria, marca, orden, ...next };
    if (merged.categoria) params.set("categoria", merged.categoria);
    if (merged.marca) params.set("marca", merged.marca);
    if (merged.orden) params.set("orden", merged.orden);
    const qs = params.toString();
    return qs ? `/tienda?${qs}` : "/tienda";
  };

  return (
    <Container className="py-16">
      <FadeIn>
        <h1 className="font-display text-4xl text-arela-ink">tienda</h1>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-widest">
            <Link
              href={buildHref({ categoria: undefined })}
              className={!categoria ? "text-arela-rust" : "text-arela-ink/60 hover:text-arela-rust"}
            >
              todos
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={buildHref({ categoria: cat.id })}
                className={
                  categoria === cat.id
                    ? "text-arela-rust"
                    : "text-arela-ink/60 hover:text-arela-rust"
                }
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <Suspense fallback={<div className="h-9 w-64" />}>
            <div className="flex items-center gap-3">
              <BrandFilter
                brands={brands.map((b) => ({ id: b.id, name: b.name }))}
                selected={marca}
              />
              <SortSelect selected={sort} />
            </div>
          </Suspense>
        </div>
      </FadeIn>

      <Stagger className="mt-10 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3">
        {products.length > 0 ? (
          products.map((product) => (
            <StaggerItem key={product.slug}>
              <ProductCard product={product} />
            </StaggerItem>
          ))
        ) : (
          <p className="col-span-full text-sm text-arela-ink/60">
            No hay productos con estos filtros por el momento.
          </p>
        )}
      </Stagger>
    </Container>
  );
}
