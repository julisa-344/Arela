import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs uppercase tracking-wide text-arela-ink/70">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "rounded-lg border border-arela-ink/20 bg-white/60 px-4 py-3 text-sm text-arela-ink placeholder:text-arela-ink/40 outline-none transition-colors focus:border-arela-rust",
            error && "border-arela-rust",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-arela-rust">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
