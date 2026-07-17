"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface AccordionItemData {
  key: string;
  title: string;
  content: ReactNode;
}

export function Accordion({
  items,
  defaultOpenKey,
  className,
}: {
  items: AccordionItemData[];
  defaultOpenKey?: string;
  className?: string;
}) {
  const [openKey, setOpenKey] = useState<string | null>(defaultOpenKey ?? null);

  return (
    <div className={cn("divide-y divide-arela-ink/10 border-t border-arela-ink/10", className)}>
      {items.map((item) => {
        const isOpen = openKey === item.key;
        return (
          <div key={item.key}>
            <button
              type="button"
              onClick={() => setOpenKey(isOpen ? null : item.key)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left"
            >
              <span className="text-xs uppercase tracking-widest text-arela-ink/70">
                {item.title}
              </span>
              <span
                className={cn(
                  "relative flex h-4 w-4 shrink-0 items-center justify-center text-arela-ink/50 transition-transform duration-300",
                  isOpen && "rotate-45 text-arela-rust"
                )}
              >
                <span className="absolute h-[1.5px] w-3.5 bg-current" />
                <span className="absolute h-3.5 w-[1.5px] bg-current" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="max-w-md pb-5 text-sm leading-relaxed text-arela-ink/70">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
