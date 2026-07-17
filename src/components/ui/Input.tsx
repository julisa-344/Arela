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
          <label htmlFor={inputId} className="text-xs text-arela-ink/45">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "border-b border-arela-ink/15 bg-transparent px-0 py-2 text-sm text-arela-ink placeholder:text-arela-ink/30 outline-none transition-colors focus:border-arela-rust disabled:text-arela-ink/40",
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
