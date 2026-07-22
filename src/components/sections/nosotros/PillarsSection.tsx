import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const PILLARS = [
  {
    number: "01",
    title: "Ingredientes conscientes",
    description: "Seleccionamos activos con trazabilidad clara y proveedores responsables.",
    image: "/images/skincare.jpg",
  },
  {
    number: "02",
    title: "Ciencia aplicada",
    description: "Formulamos con respaldo tecnico, probando eficacia real antes de lanzar.",
    image: "/images/makeup.jpg",
  },
  {
    number: "03",
    title: "Ritual personal",
    description: "Acompañamos tu rutina diaria, no solo la venta de un producto.",
    image: "/images/tools.jpg",
  },
];

export function PillarsSection() {
  return (
    <section className="bg-arela-cream py-24 md:py-32">
      <Container>
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-arela-rust">
            Nuestros pilares
          </span>
          <h2 className="mt-4 font-display text-3xl leading-tight text-arela-ink md:text-5xl">
            Lo que sostiene cada formula.
          </h2>
        </FadeIn>

        <Stagger className="mt-14 grid grid-cols-1 gap-1 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <StaggerItem key={pillar.number}>
              <div className="group relative flex min-h-[420px] flex-col justify-between overflow-hidden bg-arela-ink p-8">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-arela-ink/85 via-arela-ink/20 to-arela-ink/30" />

                <span className="relative font-display text-sm text-arela-cream/80">
                  ({pillar.number})
                </span>

                <div className="relative flex flex-col items-start gap-3">
                  <h3 className="font-display text-2xl leading-tight text-arela-white md:text-3xl">
                    {pillar.title}
                  </h3>
                  <p className="max-w-[240px] text-xs text-arela-cream/70">{pillar.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
