/**
 * Hardscape service — "Rooms without walls" photographic act.
 *
 * Psychology arc: name the spaces (named places feel ownable) → show the
 * evening (aspiration lives at dusk) → resolve doubt (decisions made on
 * paper, not on site).
 *
 * Client direction (cleanup pass): the concept-imagery disclaimer, the
 * "Design concept" captions, and the numbered construction-explanation
 * blocks were removed to keep this act visual and scannable. The chapters
 * remain image + headline + one strong paragraph each.
 */

const DIR = "/images/portfolio/hardscape";

type Chapter = {
  id: string;
  num: string;
  index: string; // chapter-index label
  eyebrow: string;
  title: string;
  body: string;
  img: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

const CHAPTERS: Chapter[] = [
  {
    id: "spaces-centerpiece",
    num: "01",
    index: "The centerpiece",
    eyebrow: "01 — The centerpiece",
    title: "The seat everyone drifts toward",
    body: "Ask people what they remember about a great property and it is never the square footage — it is where the evening happened. A fire circle gives a courtyard, pool deck, or common green that place: one warm point that pulls people out of their routines and into conversation.",
    img: `${DIR}/hardscape-night-firepit-pool.avif`,
    width: 1448,
    height: 1086,
    alt: "Round stone fire pit with wicker lounge chairs in a circle beside a lit pool at night",
    caption: "A fire circle at poolside — one warm point the whole property orbits.",
  },
  {
    id: "spaces-pavilion",
    num: "02",
    index: "The pavilion",
    eyebrow: "02 — The pavilion",
    title: "Cooking moves outdoors",
    body: "The strongest outdoor spaces are planned like rooms — a kitchen with a roof over it, a hearth to face, a floor that sheds water. A timber pavilion turns a patio from fair-weather space into the address of every gathering from April to November.",
    img: `${DIR}/hardscape-timber-pavilion-kitchen.avif`,
    width: 1448,
    height: 1086,
    alt: "Timber-frame pavilion with an outdoor kitchen, bar seating, and a stone fireplace beside a pool at dusk",
    caption: "A timber-frame pavilion — kitchen, hearth, and roof as one outdoor room.",
  },
  {
    id: "spaces-modern",
    num: "03",
    index: "The modern line",
    eyebrow: "03 — The modern line",
    title: "Shade that moves with the day",
    body: "For contemporary buildings, the same idea in a different language: a powder-coated steel pergola with louvers that angle with the sun, large-format pavers with tight joints, and a single stone hearth anchoring the room. Clean lines — and nothing that rattles in the wind.",
    img: `${DIR}/hardscape-modern-pergola-fireplace.avif`,
    width: 1448,
    height: 1086,
    alt: "Modern black steel louvered pergola over an outdoor lounge with a stone fireplace on large-format pavers",
    caption: "A louvered steel pergola — shade by day, a hearth by night.",
  },
  {
    id: "spaces-firepad",
    num: "04",
    index: "The fire pad",
    eyebrow: "04 — The fire pad",
    title: "Not every space needs a roof",
    body: "Sometimes the right answer is the quiet one: a level gravel pad, a stone fire ring, and chairs in an arc. Done properly it is not a compromise — it is a deliberate, low-maintenance room at the edge of the lawn that people actually use.",
    img: `${DIR}/hardscape-firepit-lounge-aerial.avif`,
    width: 1920,
    height: 1293,
    alt: "Aerial view of a gravel fire pit pad with timber edging, a stone fire ring, and chairs connected by a paver walkway",
    caption: "The quiet fire pad — gravel, stone, timber, and a clean line back to the patio.",
  },
];

export function HardscapeShowcase() {
  const [centerpiece, ...rooms] = CHAPTERS;
  return (
    <section aria-labelledby="spaces-heading">
      {/* Header — name the act, set the honesty note, index the rooms */}
      <div className="container-site pt-16 md:pt-24">
        <p className="eyebrow">Patio &amp; fire feature design</p>
        <h2
          id="spaces-heading"
          className="mt-2 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest"
        >
          Rooms without walls
        </h2>
        <p className="mt-5 max-w-2xl leading-[1.7] text-charcoal/90">
          A patio people actually use is never a slab with furniture on it.
          <span className="max-md:hidden">
            {" "}It is a sequence of decisions — where the fire sits, where
            water goes, where the light falls — made before the first stone.
            Four spaces below show how those decisions come together.
          </span>
        </p>
        <ol className="mt-10 grid gap-px border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2 lg:grid-cols-4">
          {CHAPTERS.map((c) => (
            <li key={c.id} className="bg-paper">
              <a
                href={`#${c.id}`}
                className="group flex h-full items-baseline gap-3 px-4 py-3.5 transition-colors duration-fast ease-brand hover:bg-tint"
              >
                <span className="text-[0.6875rem] font-semibold tracking-[0.15em] text-earth">
                  {c.num}
                </span>
                <span className="font-display text-[1.0625rem] text-charcoal transition-colors duration-fast group-hover:text-forest">
                  {c.index}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>

      {/* 01 — The centerpiece: the evening room (brand-system pass:
          white ground like every other band — site-wide white rule) */}
      <article
        id={centerpiece.id}
        className="mt-14 scroll-mt-24 py-14 md:mt-20 md:py-20"
      >
        <div className="container-site">
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={centerpiece.img}
              alt={centerpiece.alt}
              width={centerpiece.width}
              height={centerpiece.height}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/9] lg:aspect-[21/10]"
            />
            <figcaption className="mt-3 border-l-[3px] border-earth pl-3 text-sm leading-snug text-charcoal/70">
              {centerpiece.caption}
            </figcaption>
          </figure>
          <div className="mx-auto mt-10 max-w-2xl text-center">
            <p className="eyebrow">{centerpiece.eyebrow}</p>
            <h3 className="mt-2 font-display text-[clamp(1.5rem,2.6vw,2.125rem)] leading-[1.15] text-forest">
              {centerpiece.title}
            </h3>
            <p className="mt-4 leading-[1.7] text-charcoal/85">
              {centerpiece.body}
            </p>
          </div>
        </div>
      </article>

      {/* 02–04 — alternating rooms */}
      <div className="container-site py-16 md:py-24">
        {rooms.map((c, idx) => (
          <article
            key={c.id}
            id={c.id}
            className="scroll-mt-24 border-t-2 border-forest/15 pt-14 first:border-t-0 first:pt-0 mt-14 first:mt-0 md:mt-20 md:pt-16 md:first:pt-0"
          >
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <figure className={`lg:col-span-7 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.img}
                  alt={c.alt}
                  width={c.width}
                  height={c.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
                <figcaption className="mt-3 border-l-[3px] border-earth pl-3 text-sm leading-snug text-charcoal/70">
                  {c.caption}
                </figcaption>
              </figure>
              <div className={`flex flex-col justify-center lg:col-span-5 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                <p className="eyebrow">{c.eyebrow}</p>
                <h3 className="mt-2 font-display text-[clamp(1.5rem,2.6vw,2.125rem)] leading-[1.15] text-forest">
                  {c.title}
                </h3>
                <p className="mt-4 leading-[1.7] text-charcoal/90">{c.body}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

    </section>
  );
}
