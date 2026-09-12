import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * Homepage — the four service divisions, photography-led cards (client
 * redesign brief): the photograph is the dominant element — no icons.
 * Name + one-line promise sit over the lower portion of the image; the
 * whole card is the link. Desktop hover: ~3% zoom, deeper scrim, slight
 * rise, CTA pill appears. Touch devices and keyboard focus: CTA always
 * visible. Grid (client direction): stacked on mobile, then a spacious
 * 2×2 from tablet up — four major divisions, not four narrow columns.
 * Asphalt carries the client-supplied paving photo (Image 1) in a wide
 * 3:2 crop that keeps the roller, fresh mat, rakes, and workers.
 */
const divisions = [
  {
    title: "Landscaping & Grounds",
    text: "Beds, lawns, and entrances that look cared for — because they are.",
    cta: "See Landscaping",
    href: "/services/commercial-landscaping",
    // Locked division photo (client-locked, AdobeStock_22197603) — do NOT
    // swap when other imagery changes; this file set is frozen.
    img: "/images/placeholders/landscaping-card-lock-800.avif",
    srcSet:
      "/images/placeholders/landscaping-card-lock-800.avif 800w, /images/placeholders/landscaping-card-lock.avif 1200w",
    alt: "Commercial office entrance with red tulip beds, manicured lawn, and a flowering tree",
  },
  {
    title: "Snow & Ice Management",
    text: "Plows, salt, and sidewalk crews — planned before the first flake falls.",
    cta: "See Snow & Ice",
    href: "/services/snow-ice-management",
    // The loader in action (client-requested revert). The card variant of
    // this file carries a soft, feathered darkening baked into the lower
    // foreground — part of the photograph, not an overlay — so the
    // shadow-only white text stays crisp over the bright snow.
    img: "/images/portfolio/snow/snow-loader-card-800.avif",
    srcSet:
      "/images/portfolio/snow/snow-loader-card-800.avif 800w, /images/portfolio/snow/snow-loader-card-1200.avif 1200w",
    alt: "Terravian wheel loader with a containment pusher clearing snow from a distribution-center lot",
  },
  {
    title: "Patio & Hardscape",
    text: "Patios, fire pits, and outdoor rooms people actually gather in.",
    cta: "See Hardscape",
    href: "/services/hardscape-design",
    img: "/images/portfolio/hardscape/hardscape-card-patio-kitchen-800.avif",
    srcSet:
      "/images/portfolio/hardscape/hardscape-card-patio-kitchen-800.avif 800w, /images/portfolio/hardscape/hardscape-card-patio-kitchen-1200.avif 1200w",
    alt: "Paver patio with a square stone fire pit, lounge seating, and a pergola-covered outdoor kitchen at dusk",
  },
  {
    title: "Asphalt & Pavement",
    text: "Paving, repair, sealcoating, and striping — lots that stay safe and presentable.",
    cta: "See Asphalt & Pavement",
    href: "/services/asphalt-pavement",
    // Client asset (paving photo with the yellow tandem roller in the left
    // foreground, fresh mat, and equipment working down the road) — source
    // is exactly 3:2, so the wide 2×2 tile renders it essentially uncropped;
    // the mobile 16:10 band trims only sky/foreground vertically with the
    // roller and fresh asphalt fully in frame.
    img: "/images/placeholders/service-asphalt-card-wide-800.avif",
    srcSet:
      "/images/placeholders/service-asphalt-card-wide-800.avif 800w, /images/placeholders/service-asphalt-card-wide-1200.avif 1200w",
    alt: "Yellow asphalt roller compacting fresh black pavement in the foreground, with a loader and paving crew working down the road",
  },
];

export function DivisionCards() {
  return (
    // Full-bleed, gapless: the four photographs run edge-to-edge across the
    // page and touch each other — one continuous photographic band (client
    // direction: no white space between the images). Spacious 2×2 from
    // tablet up (client direction: four major divisions, each with real
    // breathing room and image presence), stacked on phones.
    <ul className="grid gap-0 md:grid-cols-2" role="list">
      {divisions.map((d) => (
        <li key={d.title}>
          <Link
            href={d.href}
            aria-label={`${d.title} — ${d.text} ${d.cta}`}
            className="group relative block aspect-[16/10] overflow-hidden bg-charcoal focus-on-dark md:aspect-[3/2]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={d.img}
              srcSet={"srcSet" in d ? d.srcSet : undefined}
              sizes="(max-width: 768px) 100vw, 440px"
              alt={d.alt}
              width={1600}
              height={1067}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-slow ease-brand group-hover:scale-[1.03]"
            />
            {/* Photography stays fully dominant — no panels, chips, or
                rectangular overlays. Readability comes from layered,
                tightly-localized text shadows (see .card-text-shadow in
                globals.css) that darken only the pixels immediately behind
                each glyph: crisp at any crop, invisible as an element.
                The content block is a fixed-height bottom column on desktop
                so every card's CTA shares the same baseline — a two-line
                title (Snow & Ice Management) grows upward, never pushes
                down. On mobile the photograph stands alone: the one-line
                description drops (client brand pass, Image 6) and the block
                shrinks to fit name + short link label only. */}
            <div className="absolute inset-x-0 bottom-0 flex h-[11.5rem] flex-col justify-end p-6 max-md:h-auto md:h-[12.5rem] md:p-8">
              <h3 className="card-text-shadow font-display text-2xl text-cream md:text-[1.875rem] md:leading-[1.15]">
                {d.title}
              </h3>
              <p className="card-text-shadow-sm mt-2 max-w-[34ch] text-[0.9375rem] leading-snug text-cream/95 max-md:hidden md:min-h-[2.6em] md:text-base">
                {d.text}
              </p>
              <span className="card-text-shadow-sm mt-4 inline-flex items-center gap-2 border-b-2 border-[#E4B263] pb-1 text-sm font-semibold uppercase tracking-[0.08em] text-cream transition-colors duration-base ease-brand group-hover:text-[#E4B263]">
                {d.cta}
                <ArrowRightIcon size={15} />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
