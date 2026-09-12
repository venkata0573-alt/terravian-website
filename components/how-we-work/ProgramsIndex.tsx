import { programs } from "@/content/programs";

/**
 * The six Terravian programs as a ruled index — a table of contents for
 * the service agreement, not a card grid and not accordions. Name on the
 * left, one plain-English line on the right. ™ appears on first use on
 * this page (here), per the content rule in content/programs.ts.
 */
export function ProgramsIndex() {
  return (
    <section aria-labelledby="programs-heading" className="bg-white py-16 md:py-24">
      <div className="container-site">
        <p className="eyebrow">The systems behind it</p>
        <h2
          id="programs-heading"
          className="mt-2 max-w-2xl text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest"
        >
          Named, written, and in your agreement
        </h2>
        <p className="mt-3 max-w-2xl text-[1.0625rem] leading-[1.6] text-charcoal/80">
          Six Terravian programs turn these promises into procedure — defined
          in writing, not left to habit.
        </p>
        <ul className="mt-10 border-b border-charcoal/10 md:mt-12">
          {programs.map((p) => (
            <li
              key={p.id}
              className="grid gap-1 border-t border-charcoal/10 py-5 md:grid-cols-[minmax(0,22rem),1fr] md:items-baseline md:gap-10"
            >
              <p className="text-lg font-bold text-charcoal">{p.nameTrademarked}</p>
              <p className="leading-[1.55] text-charcoal/75">{p.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
