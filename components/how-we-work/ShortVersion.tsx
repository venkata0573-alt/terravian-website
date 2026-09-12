import { Reveal } from "@/components/ui/Reveal";

/**
 * What a commercial client is actually buying, stated in three plain
 * outcomes. Serif italic display type carries the emotional weight; ruled
 * separators keep it editorial rather than carded. Brand-system pass:
 * white ground like every other band (site-wide white-background rule).
 * This is the "benefits before the copy" layer — readable in one glance.
 */
const outcomes = [
  {
    statement: "Fewer complaints.",
    line: "Grounds that look handled — so tenants, guests, and boards stop calling you about them.",
  },
  {
    statement: "No surprises.",
    line: "A written plan and a service calendar. You always know what's next, and what it costs.",
  },
  {
    statement: "Proof, not promises.",
    line: "Photos and notes after every visit, sent without you having to ask.",
  },
];

export function ShortVersion() {
  return (
    <section aria-labelledby="short-version-heading" className="py-16 md:py-24">
      <div className="container-site">
        <p className="eyebrow">The short version</p>
        <h2
          id="short-version-heading"
          className="mt-2 max-w-2xl text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest"
        >
          What you&apos;re actually buying
        </h2>
        <ul className="mt-10 grid gap-8 md:mt-14 md:grid-cols-3 md:gap-0">
          {outcomes.map((o, i) => (
            <li
              key={o.statement}
              className={`md:px-8 ${i > 0 ? "border-t border-charcoal/15 pt-8 md:border-l md:border-t-0 md:pt-0" : "md:pl-0"}`}
            >
              <Reveal delay={i * 0.08}>
                <p className="font-display text-[clamp(1.5rem,2.4vw,2rem)] italic leading-[1.2] text-charcoal">
                  {o.statement}
                </p>
                <p className="mt-3 max-w-xs text-[0.9375rem] leading-[1.55] text-charcoal/70">
                  {o.line}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
