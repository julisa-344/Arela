import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

const REASONS = [
  {
    number: "01",
    text: "Equipo apasionado por el bienestar de tu piel, en constante formacion sobre ingredientes y dermocosmetica.",
  },
  {
    number: "02",
    text: "Formulas desarrolladas con activos de alta pureza y trazabilidad verificada.",
  },
  {
    number: "03",
    text: "Enfoque personalizado: cada rutina se piensa segun tu tipo de piel y tus objetivos.",
  },
  {
    number: "04",
    text: "Procesos de elaboracion seguros, con minimo impacto ambiental.",
  },
  {
    number: "05",
    text: "Catalogo pensado para cubrir distintas necesidades de la piel, del rostro al cuerpo.",
  },
  {
    number: "06",
    text: "Acompañamiento cercano, antes y despues de cada compra, por WhatsApp.",
  },
];

export function ReasonsSection() {
  return (
    <section className="bg-arela-white py-24 md:py-32">
      <Container>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-arela-rust">
            Nuestra promesa
          </span>
          <h2 className="mt-4 font-display text-3xl leading-tight text-arela-ink md:text-5xl">
            Creamos belleza que resalta tu individualidad.
          </h2>
        </FadeIn>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:items-center">
          <FadeIn className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/skincare.jpg"
                alt="Rutina de cuidado facial con productos Arela"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 25vw, 50vw"
              />
            </div>
            <div className="relative mt-10 aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/serum.jpg"
                alt="Detalle de textura de serum Arela"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 25vw, 50vw"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="flex flex-col gap-8">
            {REASONS.map((reason) => (
              <div key={reason.number} className="flex gap-5 border-t border-arela-ink/10 pt-5">
                <span className="font-display text-sm text-arela-rust">/{reason.number}</span>
                <p className="text-sm leading-relaxed text-arela-ink/70">{reason.text}</p>
              </div>
            ))}
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
