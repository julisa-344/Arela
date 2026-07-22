import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";

export function AboutHero() {
  return (
    <section className="relative flex h-[85vh] min-h-[560px] w-full items-end overflow-hidden bg-arela-ink">
      <Image
        src="/images/vertical.jpg"
        alt="Retrato editorial de piel cuidada con productos Arela"
        fill
        priority
        className="object-cover opacity-80"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-arela-ink/90 via-arela-ink/20 to-arela-ink/50" />

      <div className="relative w-full px-6 pb-16 md:px-10 md:pb-20">
        <FadeIn>
          <span className="text-xs uppercase tracking-[0.3em] text-arela-honey">Nosotros</span>
          <h1 className="mt-4 max-w-2xl font-display text-5xl leading-[0.95] text-arela-cream md:text-7xl">
            Belleza que respeta tu piel y tu historia.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-arela-cream/75 md:text-base">
            Somos Arela: una marca peruana de skincare que estamos por lanzar, nacida de la union
            entre la tradicion ancestral y la ciencia moderna.
          </p>
          <Button
            href="/contacto"
            className="mt-10 w-fit border-arela-cream/30 bg-arela-cream/10 text-arela-cream backdrop-blur-sm hover:bg-arela-cream hover:text-arela-ink"
          >
            Se de las primeras en probar Arela
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
