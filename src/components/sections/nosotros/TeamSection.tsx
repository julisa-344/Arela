import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function TeamSection() {
  return (
    <section className="bg-arela-white py-24">
      <Container className="grid gap-10 md:grid-cols-2 md:items-center">
        <FadeIn>
          <ImagePlaceholder
            tone="rust"
            hint="Foto de Julisa Leon, fundadora de Arela"
            className="aspect-4/5 w-full"
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <span className="text-xs uppercase tracking-[0.3em] text-arela-rust">
            Quien esta detras
          </span>
          <h2 className="mt-4 font-display text-3xl leading-tight text-arela-ink md:text-4xl">
            Julisa Leon
          </h2>
          <p className="mt-1 text-xs uppercase tracking-widest text-arela-ink/50">
            Fundadora de Arela
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-arela-ink/70">
            Arela es un proyecto que estoy por lanzar, con la idea de acercarte formulas honestas
            y un cuidado de piel que se siente cercano, sin perder rigor cientifico. Cada detalle
            de la marca lo estoy construyendo pensando en como me gustaria que me hablen de mi
            propia piel.
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-arela-ink/70">
            Muy pronto abrimos la tienda. Si quieres ser de las primeras en probar Arela,
            escribenos.
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
