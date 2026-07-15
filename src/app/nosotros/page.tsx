import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata = {
  title: "Nosotros | Arela",
};

export default function NosotrosPage() {
  return (
    <Container className="max-w-3xl py-20">
      <FadeIn>
        <h1 className="font-display text-4xl text-arela-ink">nosotros</h1>
        <p className="mt-6 text-sm leading-relaxed text-arela-ink/70">
          Arela nace de la conviccion de que el cuidado de la piel puede ser efectivo, consciente y
          cercano. Trabajamos con ingredientes seleccionados y formulas pensadas para acompañar tu
          rutina diaria, cuidando tanto tu piel como el entorno que nos rodea.
        </p>
        {/* TODO: reemplazar con la historia real de la marca, equipo, valores, etc. */}
      </FadeIn>
    </Container>
  );
}
