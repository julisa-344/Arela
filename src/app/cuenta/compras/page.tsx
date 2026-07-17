"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { useAuth } from "@/lib/auth-context";
import { ordersService } from "@/lib/firebase/services/orders.service";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { Order, OrderStatus } from "@/shared/types/firebase";

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pendiente",
  processing: "En proceso",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "text-arela-honey",
  processing: "text-arela-terracotta",
  shipped: "text-arela-rust",
  delivered: "text-green-700",
  cancelled: "text-arela-ink/40",
};

function formatDate(timestamp: Order["createdAt"]) {
  try {
    const date = "toDate" in timestamp ? timestamp.toDate() : new Date(timestamp as unknown as string);
    return date.toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return "";
  }
}

export default function ComprasPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    ordersService
      .getByUserId(user.uid)
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <FadeIn className="flex flex-col gap-10">
      <h2 className="text-xs uppercase tracking-widest text-arela-ink/50">
        Mis compras {orders.length > 0 && `(${orders.length})`}
      </h2>

      {loading ? (
        <p className="text-sm text-arela-ink/50">Cargando pedidos...</p>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-start gap-3">
          <p className="text-sm text-arela-ink/60">Todavía no tienes pedidos.</p>
          <Link href="/tienda" className="text-sm text-arela-rust hover:underline">
            Ir a la tienda
          </Link>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-arela-ink/10 border-t border-arela-ink/10">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {order.items.slice(0, 3).map((item, i) => (
                    <div
                      key={i}
                      className="h-12 w-12 overflow-hidden rounded-full border-2 border-arela-white bg-arela-sand/40"
                    >
                      <Image
                        src={item.thumbnail}
                        alt={item.productName}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-arela-ink">{order.orderNumber}</p>
                  <p className="font-price text-xs text-arela-ink/50">{formatDate(order.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "text-[10px] font-medium uppercase tracking-widest",
                    STATUS_STYLES[order.status]
                  )}
                >
                  {STATUS_LABELS[order.status]}
                </span>
                <span className="font-price text-sm text-arela-ink">{formatPrice(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </FadeIn>
  );
}
