import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

export function IngredientsSection() {
  return (
    <section className="bg-arela-honey/15 py-24">
      <Container className="grid gap-10 md:grid-cols-2 md:items-center">
        <FadeIn>
          <h2 className="font-display text-4xl leading-tight text-arela-ink md:text-5xl">
            ingredientes
            <br />
            que respetan tu piel.
          </h2>
          <p className="mt-4 max-w-md text-sm text-arela-ink/70">
            Cuidamos cada paso del abastecimiento de nuestros ingredientes activos, priorizando
            calidad y etica en cada formula.
          </p>
          <Button href="/nosotros" variant="outline" className="mt-8 w-fit">
            conoce mas
          </Button>
        </FadeIn>

        <FadeIn delay={0.15} className="grid grid-cols-2 gap-4">
          <div className="aspect-square rounded-2xl bg-arela-terracotta/30" />
          <div className="mt-8 aspect-square rounded-2xl bg-arela-rust/30" />
        </FadeIn>
      </Container>
    </section>
  );
}