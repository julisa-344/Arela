import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { SITE } from "@/shared/constants/site";

export const metadata = {
  title: `Politica de privacidad | ${SITE.name}`,
};

const SECTIONS = [
  {
    title: "1. Datos que recopilamos",
    body: "Recopilamos los datos que nos proporcionas voluntariamente al crear una cuenta o realizar un pedido: nombre, correo electronico, telefono y direccion de envio.",
  },
  {
    title: "2. Uso de tus datos",
    body: "Usamos tu informacion unicamente para procesar tus pedidos, coordinar envios y comunicarnos contigo sobre tu compra. No vendemos ni compartimos tus datos con terceros para fines comerciales.",
  },
  {
    title: "3. Almacenamiento y seguridad",
    body: "Tus datos se almacenan de forma segura y solo el personal autorizado de la marca tiene acceso a ellos.",
  },
  {
    title: "4. Tus derechos",
    body: `De acuerdo a la Ley N.° 29733 (Ley de Proteccion de Datos Personales), puedes solicitar el acceso, rectificacion, cancelacion u oposicion al tratamiento de tus datos escribiendonos a ${SITE.email}.`,
  },
  {
    title: "5. Cookies",
    body: "Este sitio puede utilizar cookies para mejorar tu experiencia de navegacion, como recordar los productos en tu carrito.",
  },
];

export default function PoliticaPrivacidadPage() {
  return (
    <Container className="max-w-3xl py-20">
      <FadeIn>
        <h1 className="font-display text-4xl text-arela-ink">Politica de privacidad</h1>
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
