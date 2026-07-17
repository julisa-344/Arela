import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

export function PhilosophySection() {
  return (
    <section className="bg-arela-cream py-24 md:py-32">
      <Container className="text-center">
        <FadeIn>
          <span className="text-xs uppercase tracking-[0.3em] text-arela-rust">
            Nuestra filosofia
          </span>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-3xl leading-tight text-arela-ink md:text-5xl">
            Una filosofia, una practica, un ritual.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-arela-ink/60 md:text-base">
            Creemos que el cuidado de la piel es un acto de conciencia. Seleccionamos cada formula
            por su eficacia real, respetando ingredientes activos y procesos que honran tanto la
            tradicion como la ciencia moderna.
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
