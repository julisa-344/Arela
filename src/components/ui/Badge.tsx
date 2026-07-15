import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-arela-honey/30 px-3 py-1 text-[11px] uppercase tracking-wide text-arela-ink",
        className
      )}
    >
      {children}
    </span>
  );
}
