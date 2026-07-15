import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { NAV_LINKS, SITE } from "@/shared/constants/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-arela-ink/10 bg-arela-ink text-arela-sand">
      <FadeIn>
        <Container className="flex flex-col gap-10 py-16 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <span className="font-display text-2xl">{SITE.name}</span>
            <p className="mt-3 text-sm text-arela-sand/70">{SITE.description}</p>
          </div>

          <div className="flex gap-16 text-xs uppercase tracking-widest">
            <div className="flex flex-col gap-3">
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
          </div>
        </Container>
      </FadeIn>

      <Container className="border-t border-arela-sand/10 py-6 text-[11px] text-arela-sand/50">
        © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
      </Container>
    </footer>
  );
}
