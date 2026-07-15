"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { CartIndicator } from "@/components/layout/CartIndicator";
import { NAV_LINKS, SITE } from "@/shared/constants/site";
import { cn } from "@/lib/cn";
import { TRANSPARENT_OVER_HERO_PATHS } from "@/shared/constants/layout";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const hasHero = TRANSPARENT_OVER_HERO_PATHS.includes(pathname);

  useEffect(() => {
    if (!hasHero) return;

    function onScroll() {
      setScrolled(window.scrollY > 64);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasHero]);

  const isTransparent = hasHero && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300",
        isTransparent
          ? "border-transparent bg-transparent"
          : "border-arela-ink/10 bg-arela-cream/90 backdrop-blur"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
          className={cn(
            "font-display text-2xl transition-colors duration-300",
            isTransparent ? "text-arela-white" : "text-arela-ink"
          )}
        >
          {SITE.name}
        </Link>

        <nav
          className={cn(
            "hidden items-center gap-8 text-xs uppercase tracking-widest transition-colors duration-300 md:flex",
            isTransparent ? "text-arela-white" : "text-arela-ink"
          )}
        >
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-arela-rust">
              {link.label}
            </Link>
          ))}
        </nav>

        <CartIndicator light={isTransparent} />
      </Container>
    </header>
  );
}
