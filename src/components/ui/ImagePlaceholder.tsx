import { cn } from "@/lib/cn";

/**
 * Marcador visual para banners editoriales que aun no tienen fotografia real.
 * `hint` describe el tipo de foto a conseguir para reemplazar este bloque.
 */
export function ImagePlaceholder({
  hint,
  className,
  tone = "sand",
}: {
  hint: string;
  className?: string;
  tone?: "sand" | "rust" | "honey" | "ink";
}) {
  const TONE_STYLES: Record<typeof tone, string> = {
    sand: "from-arela-sand/60 via-arela-honey/20 to-arela-terracotta/20",
    rust: "from-arela-rust/25 via-arela-terracotta/15 to-arela-sand/30",
    honey: "from-arela-honey/30 via-arela-sand/25 to-arela-white",
    ink: "from-arela-ink/80 via-arela-ink/60 to-arela-rust/30",
  };
  const textTone = tone === "ink" ? "text-arela-cream/60" : "text-arela-ink/40";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl border border-dashed",
        tone === "ink" ? "border-arela-cream/20" : "border-arela-ink/15",
        "bg-linear-to-br",
        TONE_STYLES[tone],
        className
      )}
    >
      <p className={cn("max-w-[220px] px-6 text-center text-[11px] uppercase tracking-widest", textTone)}>
        {hint}
      </p>
    </div>
  );
}
