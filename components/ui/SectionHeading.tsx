import type { ReactNode } from "react";

/**
 * Section heading block: eyebrow + heading + optional intro.
 * The `as` prop enforces an explicit heading level so hierarchy never skips.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  as: Tag = "h2",
  onDark = false,
  align = "left",
  id,
  eyebrowClassName = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  as?: "h1" | "h2" | "h3";
  onDark?: boolean;
  align?: "left" | "center";
  id?: string;
  /** Optional eyebrow color override (brand-color hierarchy pass). */
  eyebrowClassName?: string;
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-3xl ${alignCls}`}>
      {eyebrow ? (
        <p className={`eyebrow ${onDark ? "text-tint" : ""} ${eyebrowClassName}`}>{eyebrow}</p>
      ) : null}
      <Tag
        id={id}
        className={`mt-2 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] ${
          onDark ? "text-cream" : "text-forest"
        }`}
      >
        {title}
      </Tag>
      {intro ? (
        <div
          className={`mt-4 text-[1.0625rem] leading-[1.65] ${
            onDark ? "text-cream/90" : "text-charcoal/90"
          }`}
        >
          {intro}
        </div>
      ) : null}
    </div>
  );
}
