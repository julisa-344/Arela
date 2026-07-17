import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { ComplaintForm } from "@/components/legal/ComplaintForm";
import { SITE } from "@/shared/constants/site";

export const metadata = {
  title: `Libro de reclamaciones | ${SITE.name}`,
};

export default function LibroReclamacionesPage() {
  return (
    <Container className="max-w-2xl py-20">
      <FadeIn>
        <h1 className="font-display text-4xl text-arela-ink">Libro de reclamaciones</h1>
        <p className="mt-6 text-sm leading-relaxed text-arela-ink/70">
          Conforme a lo establecido en el Codigo de Proteccion y Defensa del Consumidor, {SITE.name}{" "}
          cuenta con un libro de reclamaciones virtual a disposicion de los consumidores. Completa el
          siguiente formulario y te responderemos a la brevedad.
        </p>
        <ComplaintForm />
      </FadeIn>
    </Container>
  );
}
