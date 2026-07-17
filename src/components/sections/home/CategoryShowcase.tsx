import Link from "next/link";
import Image from "next/image";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { getAllCategories } from "@/lib/products";

const CATEGORY_IMAGES: Record<string, string> = {
  skincare: "/images/skincare.jpg",
  makeup: "/images/makeup.jpg",
  herramientas: "/images/tools.jpg",
};

export async function CategoryShowcase() {
  const categories = await getAllCategories();

  if (categories.length === 0) return null;

  return (
    <Stagger className="grid grid-cols-1 gap-1 md:grid-cols-3">
      {categories.map((category) => (
        <StaggerItem key={category.id}>
          <Link
            href={`/tienda?categoria=${category.id}`}
            className="group relative flex min-h-[600px] flex-col justify-between overflow-hidden bg-arela-ink p-8 md:min-h-[760px]"
          >
            <Image
              src={category.image || CATEGORY_IMAGES[category.id] || "/images/skincare.jpg"}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-arela-ink/85 via-arela-ink/10 to-arela-ink/30" />

            <span className="relative font-display text-sm tracking-[0.2em] text-arela-cream/80">
              Arela
            </span>

            <div className="relative flex flex-col items-start gap-4">
              <h3 className="font-display text-4xl capitalize leading-none text-arela-white md:text-5xl">
                {category.name}
              </h3>
              <p className="max-w-[220px] text-xs text-arela-cream/70">
                Descubre la seleccion completa de {category.name.toLowerCase()}.
              </p>
              <span className="rounded-full bg-arela-cream px-6 py-2.5 text-[11px] uppercase tracking-widest text-arela-ink transition-colors group-hover:bg-arela-white">
                explorar
              </span>
            </div>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
