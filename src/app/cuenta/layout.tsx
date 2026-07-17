"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { AuthModal } from "@/components/auth/AuthModal";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { useAuth } from "@/lib/auth-context";

export default function CuentaLayout({ children }: { children: React.ReactNode }) {
  const { user, userData, loading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  if (loading) {
    return (
      <Container className="flex min-h-[60vh] items-center justify-center py-16">
        <p className="text-sm text-arela-ink/50">Cargando...</p>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-16 text-center">
        <FadeIn className="flex flex-col items-center gap-4">
          <h1 className="font-display text-3xl text-arela-ink">mi cuenta</h1>
          <p className="max-w-sm text-sm text-arela-ink/60">
            Inicia sesión para ver tu perfil, tus direcciones, tus compras y tus Arela Points.
          </p>
          <Button onClick={() => setAuthModalOpen(true)}>Iniciar sesión</Button>
        </FadeIn>
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </Container>
    );
  }

  return (
    <div>
      <div className="relative h-56 w-full overflow-hidden md:h-72">
        <Image
          src="/images/skincare.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-arela-ink/80 via-arela-ink/35 to-arela-ink/10" />

        <div className="relative flex h-full items-end">
          <Container className="pb-8">
            <FadeIn>
              <h1 className="font-display text-4xl text-arela-white md:text-5xl">mi cuenta</h1>
              <p className="mt-3 text-sm text-arela-white/80">
                Hola, {userData?.displayName || user.displayName || "bienvenida"}. Aquí puedes administrar tu cuenta.
              </p>
            </FadeIn>
          </Container>
        </div>
      </div>

      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-[240px_1fr] md:gap-16">
          <AccountSidebar />
          <div className="max-w-2xl">{children}</div>
        </div>
      </Container>
    </div>
  );
}
