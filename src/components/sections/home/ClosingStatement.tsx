import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";

export function ClosingStatement() {
  return (
    <section className="relative overflow-hidden py-24 md:py-28">
      <Image
        src="/images/horizontal.jpg"
        alt="Detalle de piel cuidada con productos Arela"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-arela-ink/75" />
      <Container className="relative text-center">
        <FadeIn>
          <span className="text-xs uppercase tracking-[0.3em] text-arela-honey">Arela</span>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-tight text-arela-cream md:text-5xl">
            La marca que formula con intencion, pensada para tu piel.
          </h2>
          <Button href="/tienda" className="mt-10 w-fit" variant="primary">
            explorar coleccion
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
