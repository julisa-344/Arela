import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-arela-ink">
      {/* Imagen de fondo con overlay artístico */}
      <div className="absolute inset-0">
        <video
          src="/images/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-50"
        />
        {/* Overlay de gradiente oscuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        {/* Textura adicional para efecto editorial */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
      </div>

      {/* Contenido editorial centrado */}
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <FadeIn>
          {/* Título principal estilo editorial */}
          <h1 className="font-display text-8xl leading-[0.95] tracking-tight text-arela-cream sm:text-9xl md:text-[11rem] lg:text-[14rem]">
            Arela
          </h1>

          {/* Línea decorativa */}
          <div className="mx-auto my-8 h-[1px] w-16 bg-arela-honey/60" />

          {/* Claim editorial */}
          <p className="mx-auto max-w-md font-sans text-base leading-relaxed tracking-wide text-arela-cream/80 md:text-lg">
            Donde la tradición ancestral se encuentra con la ciencia moderna
            para revelar tu belleza natural
          </p>

          {/* CTAs minimalistas */}
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <Button 
              href="/tienda" 
              className="border-arela-cream/30 bg-arela-cream/10 text-arela-cream backdrop-blur-sm transition-all hover:bg-arela-cream hover:text-arela-ink"
            >
              Explorar Colección
            </Button>
            <button className="font-sans text-sm uppercase tracking-widest text-arela-cream/70 transition-colors hover:text-arela-cream">
              Ver Lookbook
            </button>
          </div>

          {/* Indicador de scroll */}
          <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-arela-cream/50">
              Scroll
            </span>
            <div className="h-12 w-[1px] animate-pulse bg-gradient-to-b from-arela-cream/50 to-transparent" />
          </div>
        </FadeIn>
      </div>

      {/* Detalles decorativos en las esquinas */}
      <div className="pointer-events-none absolute left-8 top-8 text-arela-cream/20">
        <div className="h-12 w-12 border-l border-t border-arela-cream/30" />
      </div>
      <div className="pointer-events-none absolute bottom-8 right-8 text-arela-cream/20">
        <div className="h-12 w-12 border-b border-r border-arela-cream/30" />
      </div>
    </section>
  );
}
