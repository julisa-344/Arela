import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { SITE } from "@/shared/constants/site";

export const metadata = {
  title: `Preguntas frecuentes | ${SITE.name}`,
};

const FAQS = [
  {
    question: "¿Como hago un pedido?",
    answer:
      "Agrega los productos que quieras al carrito y presiona 'finalizar por WhatsApp'. Te escribiremos para coordinar el pago y el envio.",
  },
  {
    question: "¿Que metodos de pago aceptan?",
    answer:
      "Coordinamos el metodo de pago directamente por WhatsApp: transferencia, Yape/Plin o pago contra entrega segun tu zona.",
  },
  {
    question: "¿Cuanto demora el envio?",
    answer:
      "Lima Metropolitana: 1 a 3 dias utiles. Provincias: 3 a 7 dias utiles, segun el operador logistico. Los tiempos exactos se confirman al coordinar tu pedido.",
  },
  {
    question: "¿Puedo cambiar o devolver un producto?",
    answer:
      "Si, tienes 7 dias calendario desde la entrega para solicitar un cambio o devolucion, siempre que el producto no haya sido usado y conserve su empaque original.",
  },
  {
    question: "¿Los productos son aptos para pieles sensibles?",
    answer:
      "Cada ficha de producto incluye su lista de ingredientes. Si tienes alguna duda puntual sobre tu tipo de piel, escribenos por WhatsApp antes de comprar.",
  },
  {
    question: "¿Tienen tienda fisica?",
    answer: `Por ahora ${SITE.name} opera 100% online. Puedes escribirnos a ${SITE.email} o por WhatsApp para cualquier consulta.`,
  },
];

export default function PreguntasFrecuentesPage() {
  return (
    <Container className="max-w-3xl py-20">
      <FadeIn>
        <h1 className="font-display text-4xl text-arela-ink">Preguntas frecuentes</h1>

        <div className="mt-10 flex flex-col divide-y divide-arela-ink/10">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg text-arela-ink">
                {faq.question}
                <span className="ml-4 text-arela-ink/40 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-arela-ink/70">{faq.answer}</p>
            </details>
          ))}
        </div>
      </FadeIn>
    </Container>
  );
}
