import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";

const STRIP_IMAGES = [
  { src: "/images/vertical.jpg", alt: "Perfil de rostro con piel cuidada" },
  { src: "/images/serum.jpg", alt: "Textura de serum Arela" },
  { src: "/images/horizontal.jpg", alt: "Detalle de aplicacion de producto" },
];

export function AboutCTA() {
  return (
    <section className="bg-arela-ink py-24 md:py-28">
      <Container className="text-center">
        <FadeIn>
          <span className="text-xs uppercase tracking-[0.3em] text-arela-honey">
            Hablemos de tu piel
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-tight text-arela-cream md:text-5xl">
            Escribenos y te ayudamos a armar tu rutina ideal.
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contacto" variant="primary" className="bg-arela-cream text-arela-ink hover:bg-arela-honey">
              Contactanos
            </Button>
            <Button
              href="/tienda"
              variant="outline"
              className="border-arela-cream/30 text-arela-cream hover:bg-arela-cream hover:text-arela-ink"
            >
              Ver productos
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-16 grid grid-cols-3 gap-2">
          {STRIP_IMAGES.map((image) => (
            <div key={image.src} className="relative aspect-3/4 overflow-hidden rounded-xl">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
          ))}
        </FadeIn>

        <FadeIn delay={0.2} className="mt-10">
          <p className="text-xs uppercase tracking-widest text-arela-cream/50">
            Lista de espera
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-arela-cream/75">
            Escribenos por WhatsApp y te avisamos apenas abramos la tienda, con un descuento
            especial de lanzamiento.
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
