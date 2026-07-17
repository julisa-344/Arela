"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
}

export function Select({ value, onChange, options, className }: SelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-widest transition-colors duration-200",
          open
            ? "border-arela-ink/40 bg-arela-white"
            : "border-arela-ink/15 bg-arela-white/60 hover:border-arela-ink/30"
        )}
      >
        <span className="truncate text-arela-ink">{selected?.label ?? "Seleccionar"}</span>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-arela-ink/50 transition-transform duration-200",
            open && "rotate-180"
          )}
        >
          <path
            d="M5 7.5l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 z-30 mt-2 max-h-72 w-56 origin-top-right overflow-auto rounded-2xl border border-arela-ink/10 bg-arela-white p-1.5 shadow-xl"
          >
            {options.map((option) => (
              <li key={option.value} role="option" aria-selected={option.value === value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between rounded-xl border-l-2 px-3 py-2 text-left text-xs uppercase tracking-wide transition-colors duration-150",
                    option.value === value
                      ? "border-arela-rust bg-arela-ink/3 text-arela-rust"
                      : "border-transparent text-arela-ink/60 hover:bg-arela-ink/3 hover:text-arela-ink"
                  )}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
