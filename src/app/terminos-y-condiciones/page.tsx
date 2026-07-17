import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { SITE } from "@/shared/constants/site";

export const metadata = {
  title: `Terminos y condiciones | ${SITE.name}`,
};

const SECTIONS = [
  {
    title: "1. Aceptacion de los terminos",
    body: `Al acceder y comprar en ${SITE.name} aceptas los presentes terminos y condiciones. Si no estas de acuerdo con alguno de ellos, te pedimos no utilizar este sitio.`,
  },
  {
    title: "2. Productos y precios",
    body: "Los precios mostrados en el catalogo incluyen los impuestos de ley y estan expresados en soles (PEN). Nos reservamos el derecho de modificar precios y disponibilidad sin previo aviso.",
  },
  {
    title: "3. Pedidos y pagos",
    body: "Los pedidos se confirman por WhatsApp una vez seleccionados los productos en el carrito. El pago se coordina directamente con nuestro equipo segun los metodos disponibles al momento de la compra.",
  },
  {
    title: "4. Envios",
    body: "Los tiempos y costos de envio se informan al momento de coordinar el pedido y varian segun tu ubicacion.",
  },
  {
    title: "5. Cambios y devoluciones",
    body: "Aceptamos cambios o devoluciones dentro de los 7 dias calendario posteriores a la entrega, siempre que el producto no haya sido usado y conserve su empaque original.",
  },
  {
    title: "6. Propiedad intelectual",
    body: `Todo el contenido de este sitio (textos, imagenes, logotipos) es propiedad de ${SITE.name} y no puede reproducirse sin autorizacion.`,
  },
  {
    title: "7. Contacto",
    body: `Para cualquier consulta sobre estos terminos escribenos a ${SITE.email}.`,
  },
];

export default function TerminosPage() {
  return (
    <Container className="max-w-3xl py-20">
      <FadeIn>
        <h1 className="font-display text-4xl text-arela-ink">Terminos y condiciones</h1>
        <p className="mt-4 text-xs uppercase tracking-widest text-arela-ink/40">
          Ultima actualizacion: {new Date().toLocaleDateString("es-PE", { year: "numeric", month: "long" })}
        </p>

        <div className="mt-10 flex flex-col gap-8">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-lg text-arela-ink">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-arela-ink/70">{section.body}</p>
            </div>
          ))}
        </div>
      </FadeIn>
    </Container>
  );
}
