import Image from "next/image";
import Link from "next/link";
import { PROPERTY_TYPE_LABELS, type Project } from "@/types/project";
import { serviceBySlug } from "@/content/services";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * Premium case-study template — reusable across portfolio projects.
 * Editorial, photography-led project story (client direction: premium
 * commercial architecture / landscape case study, not a data record).
 *
 * Rhythm: full-bleed hero → quiet fact ledger → Objective/Challenge
 * (oversized typographic statement paired with an offset fact column)
 * → full-bleed services ledger on charcoal → horizontal numbered
 * approach rail → Before/After photography act → italic
 * results pull-line → scope chips → forest closing CTA.
 *
 * INTEGRITY: this template renders structure only. All project FACTS come
 * from content/projects.ts and the caseStudyCopy map below. No stats,
 * timelines, client names, or testimonials are rendered. No fake
 * project photography is generated or substituted — every pending slot
 * is a clearly labeled placeholder.
 *
 * PHOTOGRAPHY PLACEMENTS (real hotel project photos now live):
 *   hero        → project.finalImages[0]  (full-bleed 21:9)
 *   spring strip→ project.progressImages  (real photos only, 4:3 filmstrip)
 *   before      → project.beforeImages[0] (matched pair, 4:3)
 *   after pair  → project.finalImages[1] ?? finalImages[0] (same viewpoint)
 *   gallery     → remaining finals when no before shot exists (grid)
 *   after detail→ project.finalImages[2]  (editorial figure + note panel)
 * Any slot still pointing at /images/placeholders/ renders a labeled
 * PLACEHOLDER chip — nothing unverified is presented as real.
 */
const caseStudyCopy: Record<
  string,
  {
    heroTitle: string;
    heroIntro: string;
    scope: string;
    status: string;
    objective: string;
    initialCondition: string;
    servicesDelivered: string[];
    results: string;
    scopeHighlights: string[];
    transformationTitle: string;
    transformationNote: string;
    springEyebrow?: string;
    springHeading?: string;
    /** Small tag over each filmstrip frame (e.g. a date). Defaults to
     *  "Field photography" — previously hardcoded "April 2026". */
    stripTag?: string;
    pairEyebrow?: string;
    detailEyebrow?: string;
    detailText?: string;
    /** Seasonal-color programs: replaces the generic gallery with a
     *  chaptered spring → summer → fall journey (psychology-led). */
    seasonJourney?: {
      acts: {
        num: string;
        season: string;
        months: string;
        hook: string;
        flowers: string[];
        palette: string[];
        srcs: string[];
      }[];
    };
    /** src of the closing "structure under the color" detail image. */
    codaSrc?: string;
    /** Snow operations: with a single progress photo, the strip frame and
     *  the detail figure pair side by side with the detail note instead of
     *  stacking as two lonely one-third rows. */
    pairStripWithDetail?: boolean;
    /** Snow operations: a mid-page act of real storm footage —
     *  continuous clearing before the photography section. */
    stormRail?: {
      eyebrow: string;
      heading: string;
      note: string;
      clips: { src: string; poster: string; caption: string; label: string }[];
    };
  }
> = {
  "hotel-entry-landscape-renovation": {
    heroTitle: "Hotel Grounds & Landscape Transformation",
    heroIntro:
      "A comprehensive landscape improvement program focused on cleaner grounds, healthier plant material, stronger curb appeal, and consistent property presentation.",
    scope: "Grounds Maintenance & Property Enhancements",
    status: "Documented — April to August 2026",
    objective:
      "Improve the appearance and condition of the hotel grounds and create a cleaner, more consistent landscape experience for guests — from the arrival drive to the entry beds.",
    initialCondition:
      "The property required general landscape cleanup, improved lawn presentation, planting-bed maintenance, pruning, and targeted landscape enhancements ahead of the season.",
    servicesDelivered: [
      "Lawn mowing and grounds maintenance",
      "Mulching and bed preparation",
      "Plant / seasonal flower installation",
      "Shrub pruning and shaping",
      "Tree trimming / cutting",
      "Weed removal and property cleanup",
      "Edging and landscape detailing",
      "General landscape improvements",
    ],
    results:
      "The work created a cleaner and more consistent property presentation, improved the appearance of lawn and planting areas, and strengthened the overall arrival experience around the hotel.",
    scopeHighlights: [
      "Lawn Care",
      "Mulching",
      "Plant Installation",
      "Tree Care",
      "Shrub Pruning",
      "Property Cleanup",
    ],
    transformationTitle: "April to August, in order",
    transformationNote:
      "Field photography from the property — the April mulch work, the front lawn in May, and the result in August 2026.",
    springEyebrow: "01 · April — Spring cleanup & mulch",
    springHeading: "Beds cleared, edged, and mulched",
    stripTag: "April 2026",
    pairEyebrow: "02 · May to August — the same lawn, three months later",
    detailEyebrow: "Read from the road",
    detailText:
      "The monument sign hedge is shaped tight and the turf edge kept clean — the property reads maintained before a guest ever reaches the door.",
  },
  "demo-hoa-seasonal-color": {
    heroTitle: "Condominium Seasonal Color Program",
    heroIntro:
      "Three rotations a year — spring bulbs, summer annuals, fall mums — planted over fresh mulch so the entrances and common lawns are never out of bloom.",
    scope: "Seasonal Color Rotations & Mulch",
    status: "Demonstration program — program imagery",
    objective:
      "Give the community color that never lapses — beds that open with spring bulbs, carry through the summer heat, and close with fall mums, all over fresh, dark mulch that reads clean from the road.",
    initialCondition:
      "Entrance beds were planted once and forgotten — tulips faded into bare stems by June, summer weeds moved in, and the mulch grayed out long before fall.",
    servicesDelivered: [
      "Spring bulbs — tulips, grape hyacinth (muscari), hyacinth, and spurge (euphorbia)",
      "Summer annuals — marigolds, red salvia, and lobelia for the heat",
      "Fall changeover — chrysanthemums banked for color to first frost",
      "Azalea and boxwood structure under flowering trees",
      "Fresh hardwood mulch at every rotation, beds re-edged",
      "Bed policing — weeds, spent blooms, and debris pulled on every visit",
    ],
    results:
      "The entrances hold color from April to frost — spring tulips and muscari give way to marigold and salvia through summer, and the mum changeover closes the season. Fresh mulch at every rotation keeps the beds reading new.",
    scopeHighlights: [
      "Tulips",
      "Grape Hyacinth",
      "Marigolds",
      "Salvia",
      "Lobelia",
      "Chrysanthemums",
      "Fresh Mulch",
    ],
    transformationTitle: "One property, three seasons of color",
    transformationNote:
      "Program imagery for a demonstration program — photography from a real community publishes after the first documented rotation.",
    detailEyebrow: "The structure under the color",
    detailText:
      "Bulbs and annuals come and go by design — begonias against clipped boxwood, barberry, and a clean mulched edge keep the beds looking planted between rotations.",
    codaSrc: "/images/portfolio/hoa/hoa-begonia-mulch-bed.avif",
    seasonJourney: {
      acts: [
        {
          num: "01",
          season: "Spring",
          months: "April — May",
          hook: "First impressions form in seconds. The spring bulb display decides how the whole property is judged for the rest of the year.",
          flowers: [
            "Tulips",
            "Grape hyacinth (muscari)",
            "Hyacinth",
            "Forget-me-nots",
            "Flowering azaleas",
            "Spurge (euphorbia)",
          ],
          palette: ["#E59BAD", "#C0272D", "#4B55A8", "#5B8318"],
          srcs: ["/images/portfolio/condo/condo-spring-tulip-azalea-lawn.avif"],
        },
        {
          num: "02",
          season: "Summer",
          months: "June — September",
          hook: "Consistency is invisible — residents stop noticing the grounds because nothing ever looks wrong. That invisibility is the product.",
          flowers: [
            "Marigolds",
            "Red salvia",
            "Lobelia",
            "Coleus",
            "Dusty miller",
            "Hosta",
            "Impatiens",
            "Lantana",
          ],
          palette: ["#E7A91B", "#BE1B24", "#5B5FC7", "#241D12"],
          srcs: [
            "/images/portfolio/condo/condo-summer-marigold-salvia.avif",
            "/images/portfolio/hardscape/hardscape-coleus-paver-bed.avif",
            "/images/portfolio/condo/condo-summer-shade-walk-lights.avif",
          ],
        },
        {
          num: "03",
          season: "Fall",
          months: "October — first frost",
          hook: "People remember the peak and the end. The mum changeover is the last thing the season says about the property — it should say plenty.",
          flowers: ["Chrysanthemums"],
          palette: ["#B8376B", "#D99A2B", "#B4502E", "#4F6916"],
          srcs: ["/images/portfolio/condo/condo-fall-mum-garden.avif"],
        },
      ],
    },
  },
  "demo-office-grounds-program": {
    heroTitle: "Office Park Grounds Maintenance Program",
    heroIntro:
      "A campus-scale grounds program — rolling lawns striped weekly, walkways edged, beds mulched and planted, and a lakeside bank held clean from the drive to the water.",
    scope: "Weekly Grounds Maintenance & Seasonal Detailing",
    status: "Demonstration program — concept imagery",
    objective:
      "Hold a multi-building office campus to one standard across every acre — turf striped and even, walkways edged clean, beds mulched and in color, and the lakeside bank as maintained as the front door.",
    initialCondition:
      "A campus this size shows neglect fast — turf grows out shaggy between visits, walkway edges soften, beds fade, and the ground along the water gets treated as out of scope.",
    servicesDelivered: [
      "Weekly mowing with striping across open lawns and rolling banks",
      "Walkway and curb edging along the full path system",
      "Mulched bed maintenance with seasonal flower rotations",
      "Hedge shearing and shrub shaping along the building facades",
      "Ornamental grass and groundcover care in layered beds",
      "Lakeside bank mowing and property policing to the water's edge",
    ],
    results:
      "The campus reads kept from every approach — striped turf under the towers, clean-lined walkways, beds in bloom against fresh mulch, and a lakeside that looks like part of the property, not the edge of it.",
    scopeHighlights: [
      "Striped Turf",
      "Edged Walkways",
      "Seasonal Color",
      "Hedge Shearing",
      "Lakeside Banks",
      "Property Policing",
    ],
    transformationTitle: "The grounds, every week of the season",
    transformationNote:
      "Concept photography for a demonstration program — real property photography publishes after the first documented service visit.",
    detailEyebrow: "The edge is the tell",
    detailText:
      "A sheared hedge, a crisp bed line, and fresh dark mulch are what a visitor reads first — the program holds them to standard every week, not just the week after a cleanup.",
  },
  "demo-industrial-snow-operations": {
    heroTitle: "Snow & Ice Operations, Documented",
    heroIntro:
      "One property kept black and wet through every storm — plowed, treated, and photographed while the rest of the street was still under snow.",
    scope: "Seasonal Snow & Ice Management",
    status: "Winter operations — field photography, 2025–26 season",
    objective:
      "One contractor accountable for the entire winter event — plowing, deicing, sidewalks, and hauling — so the property opens on time, every time.",
    initialCondition:
      "Before our contract: an undocumented, reactive snow response — the lot waited for the storm to end before clearing started.",
    servicesDelivered: [
      "Plowing on your trigger depths — routes and equipment assigned before the season",
      "Continuous clearing through the storm, not after the last flake",
      "Sidewalk, entrance, and dock clearing — down to the pavement",
      "Salting and deicing with materials matched to your surfaces",
      "Snow stacking and hauling when piles take your parking",
      "Time-stamped photos and a service record after every event",
    ],
    results:
      "While the neighboring properties were still under snow, this one was black, wet, and open for business — that's the difference a documented winter program makes.",
    scopeHighlights: [
      "Plowing",
      "Deicing",
      "Sidewalks",
      "Snow Hauling",
      "Photo Records",
      "24/7 Response",
    ],
    transformationTitle: "The difference, from above",
    transformationNote:
      "Real field photography and footage from the 2025–26 winter season.",
    springEyebrow: "During the storm",
    springHeading: "Cleared while it's still snowing",
    stripTag: "Winter 2025–26",
    pairStripWithDetail: true,
    stormRail: {
      eyebrow: "In the field",
      heading: "Clearing while it's still snowing",
      note: "No waiting for the last flake. Crews and machines work through the event — this is real footage from active storms.",
      clips: [
        {
          src: "/videos/snow-crew-active-storm.mp4",
          poster: "/images/services/snow-crew-active-storm-poster.jpg",
          caption: "Sidewalk crew mid-storm — night shift on the walks",
          label: "Sidewalk crew — night storm",
        },
        {
          src: "/videos/snow-loader-push.mp4",
          poster: "/images/portfolio/snow/snow-loader-push-poster.jpg",
          caption: "Loader stacking and pushing as the accumulation builds",
          label: "Loader — stacking & pushing",
        },
      ],
    },
    detailEyebrow: "Ready before it snows",
    detailText:
      "Trucks and machines are assigned to the property before the season starts — when the forecast turns, the equipment is already staged.",
  },
};

const fallbackCopy = (project: Project) => ({
  heroTitle: project.title,
  heroIntro: project.clientObjective.replace(/\[Demo copy\]\s*/g, "").trim(),
  scope: project.servicesProvided.slice(0, 2).join(" & ") || "Property enhancements",
  status: "Photography pending",
  objective: project.clientObjective.replace(/\[Demo copy\]\s*/g, "").trim(),
  initialCondition: project.initialCondition.replace(/\[Demo copy\]\s*/g, "").trim(),
  servicesDelivered: project.servicesProvided,
  results: project.recommendedSolution.replace(/\[Demo copy\]\s*/g, "").trim(),
  scopeHighlights: project.servicesProvided.slice(0, 6),
  transformationTitle: "Before and after",
  transformationNote:
    "Coming soon — real project photographs publish after the site visit.",
});

const PROCESS_STEPS = [
  { n: "01", label: "Assess" },
  { n: "02", label: "Prepare" },
  { n: "03", label: "Improve" },
  { n: "04", label: "Maintain" },
  { n: "05", label: "Inspect" },
];

export function CaseStudy({
  project,
  related,
}: {
  project: Project;
  related: Project[];
}) {
  const copy = caseStudyCopy[project.slug] ?? fallbackCopy(project);
  const serviceNames = project.services.map((s) => serviceBySlug(s).name);
  const heroImage = project.finalImages[0];
  const isPlaceholder = (src?: string) => !!src && src.includes("/placeholders/");
  // Matched-viewpoint pair: the before shot against the after taken from
  // the same spot (finalImages[1]; single-image projects fall back to [0]).
  const beforeImage = project.beforeImages[0];
  const pairAfterImage = project.finalImages[1] ?? project.finalImages[0];
  // pairStripWithDetail projects (snow) place finalImages[1] in the paired
  // two-up row instead of waiting for a third photo.
  const detailImage = copy.pairStripWithDetail
    ? project.finalImages[1]
    : project.finalImages[2];
  // Spring filmstrip: only real field photos render — placeholder progress
  // slots stay out of the strip so demo projects are unaffected.
  const springStrip = project.progressImages.filter((i) => !isPlaceholder(i.src));
  const hasSpringStrip = springStrip.length > 0;
  // With no before shot there is no pair — the finals beyond the hero and
  // the detail figure become a grounds gallery instead.
  const hasPair = !!beforeImage;
  // A season journey replaces both the generic gallery and the detail row.
  const journey = copy.seasonJourney;
  const codaImage = copy.codaSrc
    ? project.finalImages.find((i) => i.src === copy.codaSrc)
    : undefined;
  const galleryImages =
    hasPair || journey || copy.pairStripWithDetail
      ? []
      : project.finalImages.slice(1).filter((img) => img !== detailImage);
  const journeyImage = (src: string) =>
    project.finalImages.find((i) => i.src === src);

  const facts = [
    { term: "Property Type", value: PROPERTY_TYPE_LABELS[project.propertyType] },
    { term: "Service", value: serviceNames.join(", ") },
    { term: "Scope", value: copy.scope },
    { term: "Status", value: copy.status },
  ];

  return (
    <article>
      {/* ——— 1 · PROJECT HERO ————————————————————————————————
          Category, oversized Newsreader title, supporting copy, then a
          full-bleed photography position (real final photo drops into the
          same src — no layout change when it arrives) */}
      <div className="container-site pt-12 md:pt-16">
        <nav aria-label="Breadcrumb" className="text-sm">
          <Link href="/portfolio" className="font-semibold text-forest hover:text-earth">
            Portfolio
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-charcoal/70">{project.title}</span>
        </nav>
        <p className="eyebrow mt-10 md:mt-14">
          {PROPERTY_TYPE_LABELS[project.propertyType]}
        </p>
        <h1 className="mt-3 max-w-5xl font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] text-forest">
          {copy.heroTitle}
        </h1>
        <p className="mt-6 max-w-2xl text-[1.125rem] leading-[1.65] text-charcoal/90">
          {copy.heroIntro}
        </p>
      </div>

      <div className="mt-10 md:mt-14">
        {heroImage ? (
          <figure className="relative aspect-[16/10] overflow-hidden md:aspect-[21/9]">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              width={heroImage.width}
              height={heroImage.height}
              priority
              quality={90}
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <figcaption className="absolute bottom-4 left-4 bg-charcoal/60 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-cream md:bottom-6 md:left-6">
              {isPlaceholder(heroImage.src)
                ? "Coming soon — real property photography to follow"
                : heroImage.caption}
            </figcaption>
          </figure>
        ) : null}
      </div>

      {/* ——— 2 · PROJECT INFORMATION —————————————————————————
          Quiet editorial ledger: stacked fact rows with hairline rules.
          Tightened spacing; the ledger aligns with the 7-column content
          measure below so the left edge is shared with the objective
          statement — no orphaned floating block */}
      <div className="container-site mt-10 md:mt-14">
        <dl className="lg:w-7/12">
          {facts.map((item, i) => (
            <div
              key={item.term}
              className={`grid gap-1 py-3.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:items-baseline sm:gap-8 md:py-4 ${
                i > 0 ? "border-t border-charcoal/10" : "border-t-2 border-forest"
              }`}
            >
              <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-earth">
                {item.term}
              </dt>
              <dd className="text-[0.9375rem] font-semibold leading-snug text-charcoal">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ——— 3+4 · OBJECTIVE / CHALLENGE ———————————————————————
          Asymmetric story: oversized typographic objective statement on
          the left; initial condition as the offset "challenge" column
          with a gold brand rule — intentionally unequal widths */}
      <div className="container-site mt-14 md:mt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow">Client objective</p>
            <p className="mt-5 font-display text-[clamp(1.5rem,2.6vw,2.125rem)] leading-[1.35] text-charcoal">
              {copy.objective}
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:mt-10">
            <div className="border-l-[3px] border-earth/70 pl-6">
              <p className="eyebrow">Initial condition</p>
              <p className="mt-4 leading-[1.75] text-charcoal/85">
                {copy.initialCondition}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ——— 5 · SERVICES DELIVERED ————————————————————————————
          A two-column ledger of all eight services, each a quiet ruled
          line with a number — important without a single boxed card.
          Brand-system pass: white ground (site-wide white-background
          rule), brown rules/eyebrow, charcoal ledger text. */}
      <section aria-labelledby="services-delivered-heading" className="mt-16 py-14 md:mt-24 md:py-20">
        <div className="container-site">
          <div className="max-w-2xl">
            <p className="eyebrow">Services delivered</p>
            <h2
              id="services-delivered-heading"
              className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest"
            >
              Everything the grounds needed, handled by one company
            </h2>
          </div>
          <ul className="mt-10 grid gap-x-12 sm:grid-cols-2 md:mt-14">
            {copy.servicesDelivered.map((service, i) => (
              <li
                key={service}
                className="group flex items-baseline gap-4 border-t border-earth/30 py-4 transition-colors duration-fast ease-brand hover:border-earth"
              >
                <span
                  aria-hidden="true"
                  className="text-[0.6875rem] font-semibold tracking-[0.15em] text-earth/70 transition-colors duration-fast ease-brand group-hover:text-earth"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.9375rem] font-medium leading-snug text-charcoal md:text-base">
                  {service}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ——— 6 · OUR APPROACH ——————————————————————————————————
          Editorial progression rail: a rule the steps sit on, oversized
          Newsreader numerals, connecting arrows — reads left to right as
          a sequence; elegant vertical stack on mobile */}
      <section aria-labelledby="approach-heading" className="mt-14 md:mt-20">
        <div className="container-site">
          <p className="eyebrow">Our approach</p>
          <h2
            id="approach-heading"
            className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest"
          >
            Five moves, in order
          </h2>          <ol className="mt-8 md:mt-10 md:grid md:grid-cols-5 md:gap-0">
            {PROCESS_STEPS.map((step, i) => (
              <li
                key={step.n}
                className="group relative border-l-2 border-charcoal/15 py-4 pl-6 transition-colors duration-fast ease-brand hover:border-forest md:border-l-0 md:border-t-2 md:py-0 md:pl-0 md:pr-6 md:pt-7"
              >
                <span className="font-display text-4xl leading-none text-earth/75 transition-colors duration-fast ease-brand group-hover:text-earth md:text-5xl">
                  {step.n}
                </span>
                <span className="mt-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] text-charcoal">
                  {step.label}
                  {i < PROCESS_STEPS.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="hidden text-charcoal/30 md:inline"
                    >
                      →
                    </span>
                  ) : null}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ——— 6b · STORM RAIL (snow operations only) —————————————
          Raw field footage, unstyled and unstaged: the crews and machines
          working through active storms. Portrait and landscape clips share
          a uniform 4:3 frame so the row reads as one evidence set. */}
      {copy.stormRail ? (
        <section aria-labelledby="storm-rail-heading" className="mt-14 md:mt-20">
          <div className="container-site">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
              <div>
                <p className="eyebrow">{copy.stormRail.eyebrow}</p>
                <h2
                  id="storm-rail-heading"
                  className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest"
                >
                  {copy.stormRail.heading}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-charcoal/70">
                {copy.stormRail.note}
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-10 md:gap-4">
              {copy.stormRail.clips.map((clip) => (
                <figure key={clip.src}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
                    <video
                      src={clip.src}
                      poster={clip.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      preload="metadata"
                      className="absolute inset-0 h-full w-full object-cover"
                      aria-label={clip.label}
                    />
                  </div>
                  <figcaption className="mt-2.5 text-xs leading-snug text-charcoal/65">
                    {clip.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ——— 7 · TRANSFORMATION ————————————————————————————————
          The photography act. When real spring progress photos exist they
          open the act as a filmstrip (01); a matched before/after pair
          follows when a before shot exists (02) — otherwise the finals
          render as a grounds gallery; an editorial detail with a quiet
          note panel closes it. Any slot still on placeholder art keeps
          its dashed PLACEHOLDER chip — nothing unverified reads as real. */}
      <section aria-labelledby="transformation-heading" className="mt-14 md:mt-20">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <div>
              <p className="eyebrow">Transformation</p>
              <h2
                id="transformation-heading"
                className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest"
              >
                {copy.transformationTitle}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-charcoal/70">
              {copy.transformationNote}
            </p>
          </div>
        </div>

        {/* Snow variant — the single progress frame and the detail figure
            share one row with the detail note; no lonely one-third rows. */}
        {copy.pairStripWithDetail && hasSpringStrip && detailImage && !journey ? (
          <div className="mt-8 px-3 md:mt-10 md:px-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <p className="eyebrow">{copy.springEyebrow}</p>
              <p className="font-display text-[clamp(1.0625rem,1.6vw,1.375rem)] leading-snug text-charcoal">
                {copy.springHeading}
              </p>
            </div>
            <div className="mt-4 grid items-center gap-6 md:mt-5 md:grid-cols-2 md:gap-10">
              {[springStrip[0], detailImage].map((image) => (
                <figure key={image.src} className="group relative">
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone2">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 668px"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-slow group-hover:scale-[1.02]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 block bg-gradient-to-t from-black/60 via-black/25 to-transparent p-4 pt-12 md:p-5 md:pt-14"
                    >
                      <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#E4B263] [text-shadow:0_1px_3px_rgba(0,0,0,0.7)]">
                        {copy.stripTag ?? "Field photography"}
                      </span>
                    </span>
                  </div>
                  <figcaption className="mt-2.5 text-xs leading-snug text-charcoal/65">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
            {copy.detailText ? (
              <div className="container-site mt-10 md:mt-12">
                <div className="max-w-2xl border-l-[3px] border-earth/70 pl-6">
                  <p className="eyebrow">{copy.detailEyebrow}</p>
                  <p className="mt-4 font-display text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.45] text-charcoal">
                    {copy.detailText}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {/* Row 1 — spring filmstrip (renders only with real progress photos) */}
        {hasSpringStrip && !copy.pairStripWithDetail ? (
          <div className="mt-8 px-3 md:mt-10 md:px-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <p className="eyebrow">{copy.springEyebrow}</p>
              <p className="font-display text-[clamp(1.0625rem,1.6vw,1.375rem)] leading-snug text-charcoal">
                {copy.springHeading}
              </p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 md:mt-5 md:gap-4 lg:grid-cols-3">
              {springStrip.map((image) => (
                <figure key={image.src} className="group relative">
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone2">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 440px"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-slow group-hover:scale-[1.02]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 block bg-gradient-to-t from-black/60 via-black/25 to-transparent p-4 pt-12 md:p-5 md:pt-14"
                    >
                      <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#E4B263] [text-shadow:0_1px_3px_rgba(0,0,0,0.7)]">
                        {copy.stripTag ?? "Field photography"}
                      </span>
                    </span>
                  </div>
                  <figcaption className="mt-2.5 text-xs leading-snug text-charcoal/65">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ) : null}

        {/* Row 2 — matched before/after pair with connector arrow
            (renders only when a before photograph exists) */}
        {hasPair ? (
        <div
          className={`relative px-3 md:px-6 ${hasSpringStrip ? "mt-10 md:mt-14" : "mt-8 md:mt-10"}`}
        >
          {hasSpringStrip && copy.pairEyebrow ? (
            <p className="eyebrow mb-4 md:mb-5">{copy.pairEyebrow}</p>
          ) : null}
          <div className="grid gap-3 md:grid-cols-2 md:gap-4">
            {[
              { stage: "Before", image: beforeImage, pos: "object-center", order: "order-1" },
              { stage: "After", image: pairAfterImage, pos: "object-[50%_38%]", order: "order-3" },
            ].map(({ stage, image, pos, order }) =>
              image ? (
                <figure key={stage} className={`group relative ${order}`}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone2">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 668px"
                      className={`absolute inset-0 h-full w-full object-cover ${pos} transition-transform duration-slow group-hover:scale-[1.02]`}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 block bg-gradient-to-t from-black/60 via-black/25 to-transparent p-4 pt-12 md:p-5 md:pt-14"
                    >
                      <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#E4B263] [text-shadow:0_1px_3px_rgba(0,0,0,0.7)]">
                        {stage}
                      </span>
                    </span>
                    {isPlaceholder(image.src) ? (
                      <span className="absolute left-4 top-4 border border-dashed border-cream/70 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-cream/90">
                        Coming soon
                      </span>
                    ) : null}
                  </div>
                  <figcaption className="mt-2.5 text-xs leading-snug text-charcoal/65">
                    {image.caption}
                  </figcaption>
                </figure>
              ) : null,
            )}
            {/* connector: down-arrow between the stacked frames on mobile
                (grid child so it sits between before and after) */}
            <div aria-hidden="true" className="order-2 -my-1 flex justify-center md:hidden">
              <span className="flex h-9 w-9 items-center justify-center bg-forest text-lg text-cream">↓</span>
            </div>
          </div>
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-paper bg-forest text-xl text-cream md:flex"
          >
            →
          </span>
        </div>
        ) : null}

        {/* Row 2 alt — grounds gallery (renders when there is no before
            shot: every final beyond the hero and the detail figure) */}
        {galleryImages.length > 0 ? (
          <div
            className={`px-3 md:px-6 ${hasSpringStrip ? "mt-10 md:mt-14" : "mt-8 md:mt-10"}`}
          >
            <div className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
              {galleryImages.map((image) => (
                <figure key={image.src} className="group relative">
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone2">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 440px"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-slow group-hover:scale-[1.02]"
                    />
                    {image.stage ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 block bg-gradient-to-t from-black/60 via-black/25 to-transparent p-4 pt-12 md:p-5 md:pt-14"
                      >
                        <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#E4B263] [text-shadow:0_1px_3px_rgba(0,0,0,0.7)]">
                          {image.stage}
                        </span>
                      </span>
                    ) : null}
                    {isPlaceholder(image.src) ? (
                      <span className="absolute left-4 top-4 border border-dashed border-cream/70 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-cream/90">
                        Coming soon
                      </span>
                    ) : null}
                  </div>
                  <figcaption className="mt-2.5 text-xs leading-snug text-charcoal/65">
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ) : null}

        {/* Row 2 alt 2 — THE SEASON JOURNEY (seasonal-color programs):
            a chaptered spring → summer → fall story. Each chapter pairs an
            oversized season title, a psychology-led hook, the real flower
            palette, and the plant list with that season's photography.
            Replaces the generic gallery — the season arc IS the pitch. */}
        {journey ? (
          <div className="mt-10 md:mt-14">
            {/* chapter index — three quiet anchor links on a hairline */}
            <div className="container-site">
              <ol className="flex flex-wrap gap-x-8 gap-y-2 border-y border-charcoal/10 py-3.5">
                {journey.acts.map((act) => (
                  <li key={act.num}>
                    <a
                      href={`#season-${act.season.toLowerCase()}`}
                      className="group inline-flex items-baseline gap-2.5 text-sm font-semibold text-charcoal/70 transition-colors duration-fast ease-brand hover:text-forest"
                    >
                      <span className="text-[0.6875rem] tracking-[0.15em] text-earth">
                        {act.num}
                      </span>
                      {act.season}
                      <span className="text-charcoal/40 transition-colors duration-fast ease-brand group-hover:text-earth">
                        · {act.months}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            {journey.acts.map((act, actIndex) => {
              const images = act.srcs
                .map(journeyImage)
                .filter((i): i is NonNullable<typeof i> => !!i);
              const flip = actIndex % 2 === 1;
              return (
                <div
                  key={act.num}
                  id={`season-${act.season.toLowerCase()}`}
                  className="container-site mt-14 scroll-mt-24 md:mt-20"
                >
                  <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                    {/* chapter text — season title, hook, palette, plant list */}
                    <div
                      className={`lg:col-span-4 ${flip ? "lg:order-2" : ""}`}
                    >
                      <p className="eyebrow text-earth">
                        {act.num} · {act.months}
                      </p>
                      <h3 className="mt-2 font-display text-[clamp(2.25rem,3.6vw,3.25rem)] leading-none text-forest">
                        {act.season}
                      </h3>
                      <p className="mt-5 font-display text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.55] text-charcoal">
                        {act.hook}
                      </p>
                      {/* the season's palette, pulled from the flowers */}
                      <div
                        aria-label={`${act.season} color palette`}
                        className="mt-7 flex h-9"
                      >
                        {act.palette.map((color) => (
                          <span
                            key={color}
                            className="flex-1"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-charcoal/50">
                        The {act.season.toLowerCase()} palette
                      </p>
                      <p className="mt-5 border-t border-charcoal/10 pt-4 text-sm leading-[1.8] text-charcoal/75">
                        {act.flowers.join("  ·  ")}
                      </p>
                    </div>

                    {/* chapter photography — one hero frame, or a mosaic
                        when the season has more to show */}
                    <div
                      className={`lg:col-span-8 ${flip ? "lg:order-1" : ""}`}
                    >
                      {images.length === 1 ? (
                        <figure className="group relative">
                          <div className="relative aspect-[4/3] overflow-hidden bg-stone2">
                            <Image
                              src={images[0].src}
                              alt={images[0].alt}
                              width={images[0].width}
                              height={images[0].height}
                              loading="lazy"
                              quality={90}
                              sizes="(max-width: 1024px) 100vw, 890px"
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-slow group-hover:scale-[1.02]"
                            />
                          </div>
                          <figcaption className="mt-2.5 text-xs leading-snug text-charcoal/65">
                            {images[0].caption}
                          </figcaption>
                        </figure>
                      ) : (
                        <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
                          {images.map((image, i) => (
                            <figure
                              key={image.src}
                              className={`group relative ${
                                i === 0 ? "sm:row-span-2" : ""
                              }`}
                            >
                              <div
                                className={`relative overflow-hidden bg-stone2 ${
                                  i === 0
                                    ? "aspect-[4/3] sm:aspect-auto sm:h-full"
                                    : "aspect-[4/3]"
                                }`}
                              >
                                <Image
                                  src={image.src}
                                  alt={image.alt}
                                  width={image.width}
                                  height={image.height}
                                  loading="lazy"
                                  quality={90}
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 440px"
                                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-slow group-hover:scale-[1.02]"
                                />
                                {i > 0 && image.stage ? (
                                  <span
                                    aria-hidden="true"
                                    className="absolute inset-x-0 bottom-0 block bg-gradient-to-t from-black/60 via-black/25 to-transparent p-3 pt-10"
                                  >
                                    <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#E4B263] [text-shadow:0_1px_3px_rgba(0,0,0,0.7)]">
                                      {image.stage}
                                    </span>
                                  </span>
                                ) : null}
                              </div>
                              <figcaption className="mt-2.5 text-xs leading-snug text-charcoal/65">
                                {image.caption}
                              </figcaption>
                            </figure>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        {/* Row 3 — after detail with note panel (renders only when a third
            photograph exists, so single-image projects stay clean) */}
        {detailImage && !journey && !copy.pairStripWithDetail ? (
          <div className="container-site mt-10 md:mt-14">
            <div className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
              <figure className="group relative">
                <div className="relative aspect-[4/3] overflow-hidden bg-stone2">
                  <Image
                    src={detailImage.src}
                    alt={detailImage.alt}
                    width={detailImage.width}
                    height={detailImage.height}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 668px"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-slow group-hover:scale-[1.02]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 block bg-gradient-to-t from-black/60 via-black/25 to-transparent p-4 pt-12 md:p-5 md:pt-14"
                  >
                    <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#E4B263] [text-shadow:0_1px_3px_rgba(0,0,0,0.7)]">
                      {detailImage.stage ?? "After — detail"}
                    </span>
                  </span>
                  {isPlaceholder(detailImage.src) ? (
                    <span className="absolute left-4 top-4 border border-dashed border-cream/70 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-cream/90">
                      Coming soon
                    </span>
                  ) : null}
                </div>
                <figcaption className="mt-2.5 text-xs leading-snug text-charcoal/65">
                  {detailImage.caption}
                </figcaption>
              </figure>
              {copy.detailText ? (
                <div className="md:pl-4">
                  <p className="eyebrow">{copy.detailEyebrow}</p>
                  <p className="mt-4 max-w-md font-display text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.45] text-charcoal">
                    {copy.detailText}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
        {/* Coda — after the seasons, the structure that outlasts them
            (season-journey programs only) */}
        {journey && codaImage ? (
          <div className="container-site mt-14 md:mt-20">
            <div className="grid items-center gap-6 border-t-2 border-forest/15 pt-10 md:grid-cols-2 md:gap-10 md:pt-12">
              <figure className="group relative">
                <div className="relative aspect-[4/3] overflow-hidden bg-stone2">
                  <Image
                    src={codaImage.src}
                    alt={codaImage.alt}
                    width={codaImage.width}
                    height={codaImage.height}
                    loading="lazy"
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 668px"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-slow group-hover:scale-[1.02]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 block bg-gradient-to-t from-black/60 via-black/25 to-transparent p-4 pt-12 md:p-5 md:pt-14"
                  >
                    <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#E4B263] [text-shadow:0_1px_3px_rgba(0,0,0,0.7)]">
                      {codaImage.stage ?? "After — detail"}
                    </span>
                  </span>
                </div>
                <figcaption className="mt-2.5 text-xs leading-snug text-charcoal/65">
                  {codaImage.caption}
                </figcaption>
              </figure>
              {copy.detailText ? (
                <div className="md:pl-4">
                  <p className="eyebrow">{copy.detailEyebrow}</p>
                  <p className="mt-4 max-w-md font-display text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.45] text-charcoal">
                    {copy.detailText}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </section>

      {/* ——— 8 · RESULTS ———————————————————————————————————————
          Qualitative pull-line: large italic Newsreader, forest brand bar,
          generous whitespace — no stats, no invented numbers */}
      <section aria-labelledby="results-heading" className="mt-14 md:mt-20">
        <div className="container-site">
          <h2 id="results-heading" className="sr-only">
            Results
          </h2>
          <blockquote className="max-w-4xl border-l-[3px] border-forest pl-6 md:pl-10">
            <p className="font-display text-[clamp(1.375rem,2.4vw,2rem)] italic leading-[1.5] text-charcoal">
              {copy.results}
            </p>
          </blockquote>
        </div>
      </section>

      {/* ——— 9 · SCOPE HIGHLIGHTS ——————————————————————————————
          Quiet chip line under a small earth eyebrow */}
      <section aria-labelledby="scope-heading" className="mt-12 md:mt-16">
        <div className="container-site">
          <h2 id="scope-heading" className="eyebrow">
            Scope highlights
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {copy.scopeHighlights.map((highlight) => (
              <li
                key={highlight}
                className="border border-charcoal/20 px-4 py-2 text-sm font-semibold text-charcoal transition-colors duration-fast ease-brand hover:border-forest hover:text-forest"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ——— 10 · FINAL CTA ————————————————————————————————————
          Contextual closing act — white ground with a top rule (site-wide
          white-background rule), primary green button + secondary outline
          pair per the brand button system. */}
      <section aria-labelledby="case-cta-heading" className="mt-14 border-t border-charcoal/10 py-14 md:mt-20 md:py-20">
        <div className="container-site">
          <h2
            id="case-cta-heading"
            className="max-w-2xl font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.15] text-forest"
          >
            Need the same level of care across your property?
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-forest px-5 py-3 font-semibold text-cream transition-colors duration-fast ease-brand hover:bg-forest-dark"
            >
              Schedule a Property Walkthrough
              <ArrowRightIcon
                size={18}
                className="transition-transform duration-fast ease-brand group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/request-a-proposal"
              className="group inline-flex items-center gap-2 border-2 border-forest px-5 py-3 font-semibold text-forest transition-colors duration-fast ease-brand hover:bg-forest hover:text-cream"
            >
              Request a Proposal
              <ArrowRightIcon
                size={18}
                className="transition-transform duration-fast ease-brand group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ——— RELATED PROJECTS ————————————————————————————————— */}
      {related.length > 0 ? (
        <section aria-labelledby="related-heading" className="container-site py-12 md:py-16">
          <h2
            id="related-heading"
            className="font-display text-2xl text-forest md:text-3xl"
          >
            Related projects
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/portfolio/${r.slug}`}
                  className="group flex items-center justify-between gap-4 border-t-2 border-charcoal/15 py-5 font-semibold text-charcoal transition-colors duration-fast ease-brand hover:border-forest hover:text-forest"
                >
                  {r.title}
                  <ArrowRightIcon
                    size={18}
                    className="shrink-0 transition-transform duration-fast ease-brand group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
