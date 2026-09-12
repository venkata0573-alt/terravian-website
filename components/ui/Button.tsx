import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Button system — three approved variants, sharp corners, documented states.
 * Hover shades are derived brand derivatives (see Part 1 report §7.3.6).
 */

type Variant = "primary" | "secondary" | "onDark" | "outlineOnDark";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-forest text-cream hover:bg-forest-dark active:bg-forest-dark",
  secondary:
    "border-2 border-forest bg-transparent text-forest hover:bg-tint active:bg-tint",
  onDark:
    "bg-cream text-charcoal hover:bg-tint active:bg-tint focus-on-dark",
  outlineOnDark:
    "border-2 border-cream bg-transparent text-cream hover:bg-white/10 active:bg-white/10 focus-on-dark",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold " +
  "transition-colors duration-fast ease-brand disabled:cursor-not-allowed disabled:opacity-40";

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link href={href} className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  children,
  ...props
}: {
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
