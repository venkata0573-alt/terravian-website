import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "@/components/ui/icons";
import { HeroDrift } from "@/components/services/HeroDrift";

/**
 * Service page hero — the service sets the environment. Full-width real
 * Terravian photograph (static AVIF srcset, no runtime optimizer), name,
 * one-line message, single CTA. Brand chrome (nav, type, buttons) stays
 * identical across services; only the atmosphere changes.
 */
type Props = {
  name: string;
  line: string;
  ctaLabel: string;
  ctaHref: string;
  imgBase: string; // e.g. "hero-snow" → {imgDir}/hero-snow-{640,1080,1920}.avif
  /** Directory the srcset lives in — defaults to the placeholder library;
      real photography passes a portfolio path. */
  imgDir?: string;
  alt: string;
  /** Optional atmospheric layer rendered between photo and text (e.g. snowfall). */
  overlay?: ReactNode;
  /** "drift" adds a very slow vertical pan to the photo — a gentle living
      feel (Landscaping). Desktop only, off under reduced motion. */
  motion?: "static" | "drift";
};

export function ServiceHero({ name, line, ctaLabel, ctaHref, imgBase, imgDir = "/images/placeholders", alt, overlay, motion = "static" }: Props) {
  const base = `${imgDir}/${imgBase}`;
  return (
    <section
      aria-labelledby="service-heading"
      className="relative flex min-h-[62vh] items-end overflow-hidden bg-charcoal"
    >
      {motion === "drift" ? (
        <HeroDrift src={`${base}-1080.avif`} srcSet={`${base}-640.avif 640w, ${base}-1080.avif 1080w, ${base}-1920.avif 1920w`} alt={alt} />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={`${base}-1080.avif`}
          srcSet={`${base}-640.avif 640w, ${base}-1080.avif 1080w, ${base}-1920.avif 1920w`}
          sizes="100vw"
          alt={alt}
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-charcoal/45 max-md:hidden" />
      {overlay}
      {/* Mobile: clean photography only — eyebrow/headline/paragraph/CTA are
          not overlaid (client direction); the h1 stays in the accessibility
          tree via sr-only so page structure and the section label survive.
          Desktop layout unchanged. */}
      <div className="container-site relative pb-14 pt-40 md:pb-20">
        <p className="eyebrow text-tint max-md:hidden">Services</p>
        <h1
          id="service-heading"
          className="mt-2 max-w-2xl text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.08] text-cream max-md:sr-only"
        >
          {name}
        </h1>
        <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.6] text-cream/85 max-md:hidden">{line}</p>
        <Link
          href={ctaHref}
          className="mt-7 inline-flex items-center gap-2 bg-forest px-6 py-3.5 font-semibold text-cream transition-colors duration-fast hover:bg-forest-dark max-md:hidden"
        >
          {ctaLabel}
          <ArrowRightIcon size={18} />
        </Link>
      </div>
    </section>
  );
}
