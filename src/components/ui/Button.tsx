import Link from "next/link";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: "bg-arela-ink text-arela-sand hover:bg-arela-rust",
  outline: "border border-arela-ink text-arela-ink hover:bg-arela-ink hover:text-arela-sand",
  ghost: "text-arela-ink hover:bg-arela-ink/10",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const BASE_STYLES =
  "inline-flex items-center justify-center gap-2 rounded-full uppercase tracking-wide cursor-pointer shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.97] active:shadow-sm disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0 disabled:hover:shadow-sm";

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(BASE_STYLES, VARIANT_STYLES[variant], SIZE_STYLES[size], className);

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
