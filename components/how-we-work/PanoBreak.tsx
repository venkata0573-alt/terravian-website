/**
 * Full-bleed photographic break — the page's visual rest and its
 * positioning statement in one: a premium commercial campus, one line of
 * type carried on per-glyph shadows (brand-approved localized legibility,
 * no panels, no gradients). Type is a styled paragraph, not a heading, so
 * the document outline stays clean.
 */
export function PanoBreak() {
  return (
    <section aria-label="Who Terravian is built for" className="relative h-[46vh] min-h-[320px] overflow-hidden md:h-[56vh]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/portfolio/office/office-lakeside-campus.avif"
        alt="A manicured lawn and curved walkway leading to a modern glass office campus beside a lake"
        width={1448}
        height={1086}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 pb-10 md:pb-14">
        <div className="container-site">
          <p className="card-text-shadow-sm text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-[#E4B263] md:text-xs">
            Hotels · Property managers · HOAs · Retail · Office parks
          </p>
          <p className="card-text-shadow mt-2 max-w-2xl font-display text-[clamp(1.5rem,3.2vw,2.5rem)] italic leading-[1.15] text-cream">
            Built for the people who answer for the whole property.
          </p>
        </div>
      </div>
    </section>
  );
}
