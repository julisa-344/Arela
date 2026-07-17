import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { NAV_LINKS, SITE } from "@/shared/constants/site";
import { whatsappGeneralUrl } from "@/lib/whatsapp";

const HELP_LINKS = [
  { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
  { label: "Envios y devoluciones", href: "/envios-y-devoluciones" },
];

const LEGAL_LINKS = [
  { label: "Libro de reclamaciones", href: "/libro-de-reclamaciones" },
  { label: "Terminos y condiciones", href: "/terminos-y-condiciones" },
  { label: "Politica de privacidad", href: "/politica-de-privacidad" },
];

function WhatsappIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.3.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5 0-.1-.6-1.5-.8-2-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 2 3.1 4.9 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.5-.3Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 6.5 8 6 8-6" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "WhatsApp", href: whatsappGeneralUrl(), icon: WhatsappIcon },
  { label: "Instagram", href: SITE.instagram, icon: InstagramIcon },
  { label: "Correo", href: `mailto:${SITE.email}`, icon: MailIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-arela-cream/10 bg-arela-ink text-arela-sand">
      <FadeIn>
        <Container className="flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-arela-sand/20 transition-colors hover:border-arela-honey hover:text-arela-honey"
              >
                <Icon />
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 text-xs uppercase tracking-widest">
            <span className="text-arela-sand/50">Explorar</span>
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-arela-honey">
                {link.label}
              </Link>
            ))}
            <Link href="/carrito" className="hover:text-arela-honey">
              carrito
            </Link>
          </div>

          <div className="flex flex-col gap-3 text-xs uppercase tracking-widest">
            <span className="text-arela-sand/50">Ayuda</span>
            {HELP_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-arela-honey">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3 text-xs uppercase tracking-widest">
            <span className="text-arela-sand/50">Legal</span>
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-arela-honey">
                {link.label}
              </Link>
            ))}
          </div>
        </Container>
      </FadeIn>

      <Container>
        <Link
          href="/"
          className="block select-none py-6 font-display leading-[0.85] text-arela-cream transition-colors hover:text-arela-honey"
          style={{ fontSize: "clamp(4rem, 16vw, 11rem)" }}
        >
          {SITE.name}
        </Link>
      </Container>

      <Container className="flex flex-col gap-3 border-t border-arela-sand/10 py-6 text-[11px] text-arela-sand/50 md:flex-row md:items-center md:justify-between">
        <span>
          © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
        </span>
        <span>{SITE.email}</span>
      </Container>
    </footer>
  );
}
