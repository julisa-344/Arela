import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

export function EditorialBanner() {
  return (
    <section className="py-24">
      <Container className="grid gap-4 md:grid-cols-3">
        <FadeIn className="md:col-span-2">
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/banner.jpg"
              alt="Modelo aplicando el producto sobre el rostro"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 66vw, 100vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-arela-ink/60 via-arela-ink/10 to-transparent" />
            <span className="absolute bottom-6 left-6 font-display text-3xl tracking-tight text-arela-cream md:text-4xl">
              Arela
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1} className="flex flex-col justify-center gap-4">
          <span className="text-xs uppercase tracking-[0.3em] text-arela-rust">
            Cuidado real
          </span>
          <h2 className="font-display text-2xl leading-tight text-arela-ink md:text-3xl">
            Cuidado consciente, resultados que se sienten.
          </h2>
          <p className="text-sm leading-relaxed text-arela-ink/60">
            Rutinas simples con formulas de alto rendimiento, pensadas para pieles reales en su
            dia a dia.
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
