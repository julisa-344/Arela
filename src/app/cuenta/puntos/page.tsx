"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { useAuth } from "@/lib/auth-context";
import { formatPrice } from "@/lib/format";

export default function PuntosPage() {
  const { userData } = useAuth();
  const points = userData?.rewardPoints ?? 0;
  const totalSpent = userData?.totalSpent ?? 0;
  const nextPointsAt = Math.ceil((totalSpent + 0.01) / 10) * 10;
  const missingForNextPoint = Math.max(0, nextPointsAt - totalSpent);

  return (
    <FadeIn className="flex flex-col gap-12">
      <div>
        <h2 className="text-xs uppercase tracking-widest text-arela-ink/50">Arela Points</h2>
        <p className="mt-3 max-w-md text-sm text-arela-ink/60">
          Gana 1 Arela Point por cada S/10 que gastes en tus compras. Próximamente podrás
          canjearlos por descuentos y productos exclusivos.
        </p>
      </div>

      <div className="grid gap-10 border-t border-arela-ink/10 pt-10 sm:grid-cols-2">
        <div>
          <p className="font-price text-4xl text-arela-rust">{points}</p>
          <p className="mt-2 text-xs uppercase tracking-widest text-arela-ink/50">
            Arela Points disponibles
          </p>
        </div>

        <div>
          <p className="font-price text-4xl text-arela-ink">{formatPrice(totalSpent)}</p>
          <p className="mt-2 text-xs uppercase tracking-widest text-arela-ink/50">Total gastado</p>
        </div>
      </div>

      {totalSpent > 0 && (
        <p className="font-price text-xs text-arela-ink/50">
          Te faltan {formatPrice(missingForNextPoint)} en tu próxima compra para sumar otro Arela Point.
        </p>
      )}
    </FadeIn>
  );
}
