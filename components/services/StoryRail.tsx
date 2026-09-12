/**
 * Photographic story rail — shared by the personality service pages.
 * A numbered sequence told in LARGE photographs (Problem → Preparation →
 * Transformation, or Measure → Design → Build → Finish) with captions
 * carried on the photography itself (localized scrim, gold stage label)
 * so the imagery is the hero. Near-full-width placement; swipeable rail
 * on mobile, even grid on desktop. Real Terravian photography where
 * available; every other slot is a clearly labeled placeholder until
 * client photography arrives.
 */
export type StoryPanel = {
  n: string;
  name: string;
  line: string;
  img: string;
  srcSet?: string;
  alt: string;
};

export function StoryRail({ panels }: { panels: StoryPanel[] }) {
  return (
    <ol
      className={`flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:overflow-visible md:pb-0 ${
        panels.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"
      }`}
    >
      {panels.map((p) => (
        <li key={p.n} className="min-w-[280px] snap-start md:min-w-0">
          {/* Mobile: clean, unobstructed photography — number chip, scrim,
              and caption sentence are all removed from the image and the
              short status label moves below it (client direction, Step 3).
              Desktop keeps the overlaid editorial captions unchanged. */}
          <figure className="group">
            <div className="relative aspect-[4/3] overflow-hidden bg-charcoal md:aspect-[3/4] lg:aspect-[4/5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.img}
                srcSet={p.srcSet}
                sizes="(max-width: 767px) 280px, 440px"
                alt={p.alt}
                width={900}
                height={1125}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-slow ease-brand group-hover:scale-[1.03]"
              />
              <span
                aria-hidden="true"
                className="absolute left-4 top-4 bg-charcoal/55 px-2 py-1 text-[0.6875rem] font-semibold tracking-[0.15em] text-cream max-md:hidden"
              >
                {p.n}
              </span>
              {/* Localized text scrim only — photography stays bright */}
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent p-4 pt-12 max-md:hidden md:p-5 md:pt-16">
                <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#E4B263]">
                  {p.name}
                </span>
                <span className="mt-1.5 block text-sm leading-snug text-cream/95 [text-shadow:0_1px_3px_rgba(0,0,0,0.7)]">
                  {p.line}
                </span>
              </span>
            </div>
            <figcaption className="mt-2 text-sm font-semibold text-charcoal/80 md:hidden">
              {p.name}
            </figcaption>
          </figure>
        </li>
      ))}
    </ol>
  );
}
