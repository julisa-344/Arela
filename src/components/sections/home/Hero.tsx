import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

export function Hero() {
  return (
    <section className="relative flex h-screen w-full items-end overflow-hidden bg-arela-ink">
      <video
        src="/images/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-arela-ink/80 via-arela-ink/10 to-transparent" />

      <Container className="relative pb-20">
        <FadeIn>
          <h1 className="font-display text-6xl leading-[1.05] text-arela-cream md:text-8xl">
            skincare consciente,
            <br />
            resultados reales.
          </h1>
          <p className="mt-5 max-w-sm text-sm text-arela-cream/80">
            Formulas comprometidas con tu piel y con el planeta, pensadas para tu rutina diaria.
          </p>
          <Button href="/tienda" className="mt-8 w-fit">
            ver tienda
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
