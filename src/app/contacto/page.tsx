import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { ContactForm } from "@/components/contact/ContactForm";
import { SITE } from "@/shared/constants/site";
import { whatsappGeneralUrl } from "@/lib/whatsapp";

export const metadata = {
  title: `Contacto | ${SITE.name}`,
};

const CONTACT_CHANNELS = [
  { label: "WhatsApp", value: "Respuesta mas rapida", href: whatsappGeneralUrl() },
  { label: "Correo", value: SITE.email, href: `mailto:${SITE.email}` },
  { label: "Instagram", value: "@arela", href: SITE.instagram },
];

export default function ContactoPage() {
  return (
    <Container className="max-w-5xl py-20">
      <FadeIn>
        <span className="text-xs uppercase tracking-[0.3em] text-arela-rust">Contacto</span>
        <h1 className="mt-4 font-display text-4xl text-arela-ink md:text-5xl">
          Conversemos sobre tu piel.
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-arela-ink/70">
          Escribenos por el medio que prefieras. Respondemos de lunes a sabado y con gusto te
          ayudamos a elegir tu rutina.
        </p>
      </FadeIn>

      <div className="mt-14 grid gap-12 md:grid-cols-[minmax(0,1fr)_1.3fr]">
        <FadeIn delay={0.1} className="flex flex-col divide-y divide-arela-ink/10">
          {CONTACT_CHANNELS.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex flex-col gap-1 py-5 first:pt-0"
            >
              <span className="text-xs uppercase tracking-widest text-arela-ink/50">
                {channel.label}
              </span>
              <span className="font-display text-xl text-arela-ink transition-colors group-hover:text-arela-rust">
                {channel.value}
              </span>
            </a>
          ))}
        </FadeIn>

        <FadeIn delay={0.15}>
          <ContactForm />
        </FadeIn>
      </div>
    </Container>
  );
}
