import Link from "next/link";
import Image from "next/image";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const CATEGORIES = [
  { label: "skincare", value: "skincare", image: "/images/skincare.jpg" },
  { label: "maquillaje", value: "maquillaje", image: "/images/makeup.jpg" },
  { label: "accesorios", value: "accesorios", image: "/images/tools.jpg" },
];

export function CategoryShowcase() {
  return (
    <Stagger className="grid grid-cols-1 gap-1 md:grid-cols-3">
      {CATEGORIES.map((category) => (
        <StaggerItem key={category.value}>
          <Link
            href={`/tienda?categoria=${category.value}`}
            className="group relative flex min-h-[600px] overflow-hidden bg-arela-ink md:min-h-[760px]"
          >
            <Image
              src={category.image}
              alt={category.label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-arela-ink/60 via-transparent to-transparent" />

            <span className="absolute left-6 top-8 rotate-180 text-sm uppercase tracking-[0.3em] text-arela-white [writing-mode:vertical-rl]">
              {category.label}
            </span>

            <span className="absolute bottom-8 left-6 rounded-full bg-arela-cream px-6 py-2 text-[11px] uppercase tracking-widest text-arela-ink transition-colors group-hover:bg-arela-white">
              ver {category.label}
            </span>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
