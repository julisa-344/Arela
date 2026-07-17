"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="font-display text-7xl text-arela-ink/20 md:text-9xl">Ups</span>
      <h1 className="mt-4 font-display text-2xl text-arela-ink md:text-3xl">Algo salio mal</h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-arela-ink/60">
        Ocurrio un error inesperado. Intenta de nuevo o vuelve al inicio.
      </p>
      <div className="mt-8 flex gap-4">
        <Button onClick={() => reset()}>Intentar de nuevo</Button>
        <Button href="/" variant="outline">
          Volver al inicio
        </Button>
      </div>
    </Container>
  );
}
