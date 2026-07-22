import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { SITE, SHIPPING } from "@/shared/constants/site";
import { formatPrice } from "@/lib/format";

export const metadata = {
  title: `Envios y devoluciones | ${SITE.name}`,
};

export default function EnviosYDevolucionesPage() {
  return (
    <Container className="max-w-3xl py-20">
      <FadeIn>
        <h1 className="font-display text-4xl text-arela-ink">Envios y devoluciones</h1>

        <section className="mt-10">
          <h2 className="font-display text-lg text-arela-ink">Envios</h2>
          <p className="mt-2 text-sm leading-relaxed text-arela-ink/70">
            Manejamos una tarifa unica de envio {SHIPPING.zone.toLowerCase()}, sin importar tu
            distrito o ciudad. Una vez confirmado tu pedido por WhatsApp, coordinamos la entrega:
          </p>

          <div className="mt-6 overflow-hidden rounded-xl border border-arela-ink/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-arela-ink/5 text-xs uppercase tracking-widest text-arela-ink/50">
                <tr>
                  <th className="px-4 py-3">Zona</th>
                  <th className="px-4 py-3">Tiempo estimado</th>
                  <th className="px-4 py-3">Costo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-arela-ink/10">
                  <td className="px-4 py-3 text-arela-ink">{SHIPPING.zone}</td>
                  <td className="px-4 py-3 text-arela-ink/70">{SHIPPING.estimatedTime}</td>
                  <td className="px-4 py-3 text-arela-ink/70">{formatPrice(SHIPPING.cost)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-lg text-arela-ink">Cambios y devoluciones</h2>
          <p className="mt-2 text-sm leading-relaxed text-arela-ink/70">
            Tienes 7 dias calendario desde la entrega para solicitar un cambio o devolucion, siempre
            que el producto conserve su empaque original y no haya sido usado. Para iniciar el proceso,
            escribenos por WhatsApp o a {SITE.email} indicando tu numero de pedido y el motivo.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-lg text-arela-ink">Pedidos con problemas</h2>
          <p className="mt-2 text-sm leading-relaxed text-arela-ink/70">
            Si tu pedido llego incompleto, danado o no corresponde a lo solicitado, contactanos dentro
            de las 48 horas posteriores a la entrega para coordinar la solucion sin costo adicional.
          </p>
        </section>
      </FadeIn>
    </Container>
  );
}
