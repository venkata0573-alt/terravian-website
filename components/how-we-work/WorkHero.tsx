/**
 * How We Work — editorial hero.
 * The promise lands before the process does: a headline a property manager
 * feels, one real photograph of a Terravian walkthrough, and four quiet
 * commitments ruled underneath — the benefits, scannable in five seconds.
 * Composition: asymmetric two-column on desktop (text 7 / image 5), the
 * photo framed by an offset forest plate — the page's first brand-color
 * moment. Sharp corners throughout; no scrims needed (photo is decorative
 * framing, text never sits on it here).
 */
const commitments = [
  { title: "A written scope", line: "Agreed and priced before work begins" },
  { title: "Photo documentation", line: "Sent to you after every visit" },
  { title: "A direct line", line: "To the people on your property" },
  { title: "One contract", line: "Every season, every service, one call" },
];

export function WorkHero() {
  return (
    <section aria-labelledby="hww-hero-heading" className="py-14 md:py-20 lg:py-24">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-6 lg:pt-6">
            <p className="eyebrow">How we work</p>
            <h1
              id="hww-hero-heading"
              className="mt-3 max-w-xl text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.06]"
            >
              You&apos;ll never have to{" "}
              <em className="font-display italic text-forest">chase us.</em>
            </h1>
            <p className="mt-5 max-w-xl text-[1.125rem] leading-[1.6] text-charcoal/80">
              One company for your landscaping, hardscaping, and seasonal
              property-care needs. We schedule each visit, photograph areas of
              concern, and provide a clear plan of action.
            </p>
          </div>

          <div className="lg:col-span-6">
            {/* Offset forest plate: a deliberate brand-color frame, not decoration. */}
            <div className="relative mr-4 md:mr-6">
              <div aria-hidden="true" className="absolute -right-4 -top-4 h-full w-full bg-forest md:-right-6 md:-top-6" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/placeholders/how-we-work-bg-1920.avif"
                alt="Terravian crew members walking a property with its manager, reviewing notes together"
                width={1920}
                height={1280}
                loading="eager"
                decoding="async"
                className="relative aspect-[4/3] w-full object-cover"
              />
            </div>
            {/* Same right offset as the photo wrapper, so the caption centers
                under the photo itself — not the plate, not the column. */}
            <p className="mr-4 mt-3 text-center text-sm text-charcoal/60 md:mr-6">
              Every engagement starts the same way: walking your property together.
            </p>
          </div>
        </div>

        {/* The commitments — ruled, not carded. The five-second read. */}
        <ul className="mt-12 grid gap-x-8 gap-y-6 border-t-2 border-charcoal pt-8 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {commitments.map((c) => (
            <li key={c.title}>
              <p className="text-lg font-bold text-charcoal">{c.title}</p>
              <p className="mt-1 text-sm leading-snug text-charcoal/65">{c.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
