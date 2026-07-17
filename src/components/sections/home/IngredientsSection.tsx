import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

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
          <ImagePlaceholder
            tone="rust"
            hint="Ingrediente natural en primer plano (ej. arroz, centella, jojoba)"
            className="aspect-square"
          />
          <ImagePlaceholder
            tone="honey"
            hint="Textura del producto extendida sobre la piel"
            className="mt-8 aspect-square"
          />
        </FadeIn>
      </Container>
    </section>
  );
}