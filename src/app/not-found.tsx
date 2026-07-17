import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="font-display text-7xl text-arela-ink/20 md:text-9xl">404</span>
      <h1 className="mt-4 font-display text-2xl text-arela-ink md:text-3xl">
        No encontramos esta pagina
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-arela-ink/60">
        El enlace puede estar roto o la pagina ya no existe. Vuelve al inicio o sigue explorando la
        tienda.
      </p>
      <div className="mt-8 flex gap-4">
        <Button href="/">Volver al inicio</Button>
        <Button href="/tienda" variant="outline">
          Ir a la tienda
        </Button>
      </div>
    </Container>
  );
}
