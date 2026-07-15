"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { TRANSPARENT_OVER_HERO_PATHS } from "@/shared/constants/layout";

export function MainOffset({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hasHero = TRANSPARENT_OVER_HERO_PATHS.includes(pathname);

  return (
    <main className={cn("flex-1", !hasHero && "pt-20")}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </main>
  );
}
