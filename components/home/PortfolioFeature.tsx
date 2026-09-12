import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import { PROPERTY_TYPE_LABELS } from "@/types/project";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * Homepage portfolio — the trust act, rebuilt around how a commercial
 * decision-maker actually scans:
 *
 * 1 · THE INTRIGUE — the hotel feature photo. One strong real result,
 *     full-bleed, opening straight into the case study. Proof first,
 *     claims later.
 * 2 · THE PROOF OF SYSTEM — a three-tile seasonal strip (spring → summer
 *     → fall) with a quiet continuity line. It answers the buyer's real
 *     fear — "will you still be good in October?" — in one glance.
 * 3 · THE HANDOFF — one sentence and a link. Commitment comes after the
 *     visitor has already nodded twice.
 *
 * Type sits on localized bottom scrims only; sharp corners, no gradients
 * beyond the text ramps, restrained motion.
 */
const CASE_SLUG = "hotel-entry-landscape-renovation";
const STRIP_SLUGS = [
  "demo-office-grounds-program",
  "demo-hoa-seasonal-color",
  "demo-industrial-snow-operations",
];

const SPRING_IMG = {
  src: "/images/portfolio/hotel/hotel-spring-mulch-crew-800.avif",
  srcSet:
    "/images/portfolio/hotel/hotel-spring-mulch-crew-800.avif 800w, /images/portfolio/hotel/hotel-spring-mulch-crew-1200.avif 1200w",
  alt: "Spring — fresh mulch going down at the hotel entry in April",
};
const SUMMER_IMG = {
  src: "/images/portfolio/condo/condo-summer-marigold-salvia-800.avif",
  srcSet:
    "/images/portfolio/condo/condo-summer-marigold-salvia-800.avif 800w, /images/portfolio/condo/condo-summer-marigold-salvia-1200.avif 1200w",
  alt: "Summer — marigolds, red salvia, and lobelia in a condominium bed",
};
const FALL_IMG = {
  src: "/images/portfolio/condo/condo-fall-mum-garden-800.avif",
  srcSet:
    "/images/portfolio/condo/condo-fall-mum-garden-800.avif 800w, /images/portfolio/condo/condo-fall-mum-garden-1200.avif 1200w",
  alt: "Fall — chrysanthemums banked along a stone rill",
};

export function PortfolioFeature() {
  const cs = projects.find((p) => p.slug === CASE_SLUG)!;
  const strip = STRIP_SLUGS.map((slug) => projects.find((p) => p.slug === slug)!);
  const afterImg = cs.finalImages[1] ?? cs.finalImages[0];

  return (
    <div>
      {/* 1 — The intrigue: the hotel feature photo (left) + three case studies (right) */}
      <div className="grid gap-2 lg:grid-cols-2">
        <Link
          href={`/portfolio/${cs.slug}`}
          className="group relative block aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-full"
          aria-label={`${cs.title} — open the case study`}
        >
          <Image
            src={afterImg.src}
            alt={afterImg.alt}
            width={afterImg.width}
            height={afterImg.height}
            sizes="(max-width: 1024px) 100vw, 700px"
            className="absolute inset-0 h-full w-full object-cover object-[50%_38%] transition-transform duration-slow group-hover:scale-[1.02]"
          />
          {/* Caption — localized scrim only */}
          <span className="absolute inset-x-0 bottom-0 block bg-gradient-to-t from-black/60 via-black/30 to-transparent p-5 pt-16 [text-shadow:0_1px_3px_rgba(0,0,0,0.8),0_0_8px_rgba(0,0,0,0.4)] md:p-6 md:pt-20">
            <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#E4B263]">
              {PROPERTY_TYPE_LABELS[cs.propertyType]}
            </span>
            <span className="mt-1 block text-xl leading-snug text-white md:text-2xl">
              {cs.title}
            </span>
            <span className="mt-1 block text-sm leading-snug text-white/85">
              The front lawn — August 2026.
            </span>
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white">
              Open case study
              <ArrowRightIcon
                size={16}
                className="transition-transform duration-fast ease-brand group-hover:translate-x-1"
              />
            </span>
          </span>
        </Link>

        {/* Three case-study tiles */}
        <div className="grid gap-2 sm:grid-cols-2">
          {strip.map((project) => {
            const cover = project.finalImages[0];
            return (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden"
              >
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  width={cover.width}
                  height={cover.height}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-slow group-hover:scale-[1.03]"
                />
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/80 text-white transition-colors duration-fast ease-brand group-hover:border-forest group-hover:bg-forest">
                  <ArrowRightIcon size={16} />
                </span>
                <span className="absolute inset-x-0 bottom-0 block bg-gradient-to-t from-black/65 via-black/35 to-transparent p-4 pt-14 [text-shadow:0_1px_3px_rgba(0,0,0,0.8),0_0_8px_rgba(0,0,0,0.4)]">
                  <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-[#E4B263]">
                    {PROPERTY_TYPE_LABELS[project.propertyType]}
                  </span>
                  <span className="mt-1 block text-base leading-snug text-white">
                    {project.title}
                  </span>
                  <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    Open case study
                    <ArrowRightIcon
                      size={14}
                      className="transition-transform duration-fast ease-brand group-hover:translate-x-1"
                    />
                  </span>
                </span>
              </Link>
            );
          })}

          {/* Fourth cell — the quiet proof strip: three seasons, one standard */}
          <div className="relative aspect-[16/9] overflow-hidden bg-forest sm:col-span-2 sm:aspect-auto lg:col-span-1">
            <div className="grid h-full grid-cols-3">
              {[
                { img: SPRING_IMG, label: "Spring" },
                { img: SUMMER_IMG, label: "Summer" },
                { img: FALL_IMG, label: "Fall" },
              ].map(({ img, label }) => (
                <div key={label} className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    srcSet={img.srcSet}
                    sizes="(max-width: 640px) 33vw, (max-width: 1024px) 50vw, 227px"
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 block bg-gradient-to-t from-black/60 to-transparent p-2 pt-8">
                    <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-[#E4B263] [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
                      {label}
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <span className="pointer-events-none absolute inset-x-0 top-0 bg-forest/85 px-3 py-2 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-cream">
              One partner, every season
            </span>
          </div>
        </div>
      </div>

      {/* 2 — The handoff: a single quiet line after the proof */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 px-1">
        <p className="font-display text-[clamp(1.0625rem,1.6vw,1.3125rem)] italic leading-snug text-charcoal">
          Every property we serve follows the same system: we walk it,
          document it, plan it, and then complete the work.
        </p>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 border-b-2 border-earth pb-0.5 text-sm font-semibold text-earth transition-colors duration-fast ease-brand hover:border-earth-dark hover:text-earth-dark"
        >
          Browse the full portfolio
          <ArrowRightIcon size={15} />
        </Link>
      </div>
    </div>
  );
}
