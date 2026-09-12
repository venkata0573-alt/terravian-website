import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/content/services";
import { serviceDetailBySlug } from "@/content/serviceDetails";
import { industries } from "@/content/industries";
import { pageMetadata } from "@/lib/metadata";
import { serviceJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { ServiceGallery } from "@/components/services/ServiceGallery";
import { RelatedProjects } from "@/components/services/RelatedProjects";
import { FeaturedWork } from "@/components/services/FeaturedWork";
import { FieldMarquee } from "@/components/ui/FieldMarquee";
import { recentWork, fieldRail } from "@/content/recentWork";
import { ServiceHero } from "@/components/services/ServiceHero";
import { Snowfall } from "@/components/services/Snowfall";
import { MasonryLines } from "@/components/services/MasonryLines";
import { StoryRail, type StoryPanel } from "@/components/services/StoryRail";
import { WhatWeHandle, type HandleItem } from "@/components/services/WhatWeHandle";
import { CapabilityExplorer, type CapabilityItem } from "@/components/services/CapabilityExplorer";
import { HardscapeShowcase } from "@/components/services/HardscapeShowcase";
import { AsphaltLevels } from "@/components/services/AsphaltLevels";
import { ArrowRightIcon } from "@/components/ui/icons";
import type { ServiceSlug } from "@/types/project";

/**
 * Service detail pages (client redesign brief: each division gets its own
 * environment while brand chrome — nav, typography, buttons, spacing —
 * stays identical):
 *
 *   LANDSCAPING — living, natural: photo hero with a very slow drift,
 *     then a drifting field photo rail, then "What landscaping projects
 *     look like" (named recent-work mosaic + demonstration layouts);
 *     Neglected → Managed → Maintained follows What We Handle.
 *   SNOW & ICE — winter operations: photo hero with subtle snowfall,
 *     Storm → Response → Clear Access → Proof, dark Snow Command band
 *     (Pre-Storm Protocol™ / 24/7 Direct Line™, ™ on first use).
 *   HARDSCAPE — aspiration then certainty: dusk photo hero, "Rooms without
 *     walls" photographic act (labeled design-direction imagery with per-room
 *     "how it's built" detail), then Measure → Design → Build → Finish and
 *     the standard handle chips.
 *
 * All three replace the old capabilities text wall with "What We Handle"
 * chips (tap one → one sentence). Gallery, FAQ, related projects, and the
 * proposal CTA remain below on every service. The remaining two services
 * keep the standard template.
 */

type Personality = {
  hero: { imgBase: string; imgDir?: string; alt: string; line: string; ctaLabel: string; motion?: "static" | "drift"; overlay?: "snowfall" };
  story?: { heading: string; eyebrow: string; panels: StoryPanel[] };
  handleHeading: string;
  handle: HandleItem[];
  masonry?: boolean;
  /** Overrides the default "{shortName} in the field" gallery heading. */
  galleryHeading?: string;
};

const PERSONALITIES: Partial<Record<ServiceSlug, Personality>> = {
  "commercial-landscaping": {
    hero: {
      // Locked hero photo (client-locked, AdobeStock_22197603) — do NOT
      // swap when other imagery changes; this file set is frozen.
      imgBase: "landscaping-hero-lock",
      alt: "Commercial office entrance with red tulip beds, manicured lawn, and a flowering tree",
      line: "Grounds that look managed — because they are, on every visit.",
      ctaLabel: "Request Landscaping Service",
      motion: "drift",
    },
    story: {
      eyebrow: "The work, visibly",
      heading: "Neglected to maintained",
      panels: [
        {
          n: "01",
          name: "Neglected",
          line: "Worn turf, tired beds, and edges that have lost their line.",
          img: "/images/placeholders/land-story-neglected-640.avif",
          srcSet:
            "/images/placeholders/land-story-neglected-640.avif 640w, /images/placeholders/land-story-neglected.avif 900w",
          alt: "Overgrown, leaf-covered planting bed in front of a commercial building",
        },
        {
          n: "02",
          name: "Cleaned",
          line: "Beds cleared, edged, and prepped back to bare soil.",
          img: "/images/placeholders/land-story-cleaned-640.avif",
          srcSet:
            "/images/placeholders/land-story-cleaned-640.avif 640w, /images/placeholders/land-story-cleaned.avif 900w",
          alt: "The same bed cleared and edged to bare soil, ready for planting",
        },
        {
          n: "03",
          name: "Maintained",
          line: "New plantings installed and kept that way, visit after documented visit.",
          img: "/images/placeholders/land-story-installed-640.avif",
          srcSet:
            "/images/placeholders/land-story-installed-640.avif 640w, /images/placeholders/land-story-installed.avif 900w",
          alt: "The same bed fully planted with seasonal color and fresh mulch",
        },
      ],
    },
    galleryHeading: "Sod installation & bed work",
    handleHeading: "Design, planting, and upkeep",
    handle: [
      { label: "Turf", detail: "Renovation, overseeding, and sod for areas that have thinned, worn out, or never established." },
      { label: "Beds", detail: "Bed design, soil preparation, mulch, and planting programs sized to the property." },
      { label: "Pruning", detail: "Structural and seasonal pruning of shrubs and ornamental trees — timed to the plant, not the calendar gap." },
      { label: "Seasonal", detail: "Rotations of seasonal color at entrances and sign beds where first impressions happen." },
      { label: "Maintenance", detail: "Ongoing care of everything we install, on the same documented schedule as the rest of your grounds." },
    ],
  },
  "snow-ice-management": {
    hero: {
      imgBase: "hero-snow",
      alt: "Snow removal fleet with plows clearing a commercial lot",
      line: "Planned before the storm. Active throughout it. Documented after it.",
      ctaLabel: "Request Snow Service",
      overlay: "snowfall",
    },
    // No story rail — real winter-operations photography (client-supplied
    // plow-truck photos) carries the page instead of a numbered sequence.
    handleHeading: "One crew for the whole storm",
    handle: [
      { label: "Plowing", detail: "Lots and drives cleared on your trigger depths, with routes and equipment assigned before the season starts." },
      { label: "Deicing", detail: "Salting and deicing timed to pavement temperatures and refreeze risk — not guesswork after the fact." },
      { label: "Sidewalks", detail: "Walks, entrances, and ramps shoveled and treated — the areas where liability actually lives." },
      { label: "Hauling", detail: "Snow stacked, relocated, or hauled off-site when piles start eating your parking and sightlines." },
      { label: "Storm Response", detail: "24/7 dispatch during active events. You reach a person on a direct line, not a voicemail box." },
    ],
  },
  "asphalt-pavement": {
    hero: {
      // Client asset Image 1 (primary asphalt photo). The 1672px master is
      // pre-rendered into the ServiceHero srcset convention (640/1080/1920
      // slots; the 1920 slot carries the 1600px master).
      imgBase: "asphalt-hero",
      imgDir: "/images/services",
      alt: "Steamroller compacting fresh asphalt while crew members rake the new mat at a commercial property",
      line: "Pavement planned like an operations program — surveyed, scoped in writing, phased around your traffic.",
      ctaLabel: "Request Asphalt Service",
    },
    // No story rail — the intervention-level section (maintenance →
    // repair → restoration → reconstruction) carries the narrative with
    // real field photography between levels.
    handleHeading: "Every level of pavement work",
    handle: [
      { label: "Maintenance", detail: "Crack sealing, sealcoating, and striping that extend the service life of sound pavement." },
      { label: "Repair", detail: "Saw-cut patching, pothole and failed-area repair, base correction, and catch-basin interfaces." },
      { label: "Restoration", detail: "Milling, overlays, and drive-lane restoration for lots that are tired but structurally sound." },
      { label: "Reconstruction", detail: "Reclaiming, base reconstruction, new paving, and full lot rehabilitation when the base has failed." },
      { label: "Finishing", detail: "Striping, markings, curb and interface work, and final cleanup — the lot handed back ready for traffic." },
    ],
    galleryHeading: "Pavement work, documented",
  },
  "hardscape-design": {
    hero: {
      // Real client-supplied design photography (dusk poolside pavilion) —
      // lives in the portfolio library, not the placeholder set.
      imgBase: "hero-hardscape-pavilion",
      imgDir: "/images/portfolio/hardscape",
      alt: "Poolside pavilion with an outdoor kitchen and stone fireplace at dusk, stepping stones crossing the lawn",
      line: "Patios, fire features, and outdoor rooms — designed on paper, built to outlast the seasons.",
      ctaLabel: "Request Hardscape Service",
    },
    // No story rail — the "Rooms without walls" showcase carries the page.
    handleHeading: "Patios and fire features, handled in-house",
    handle: [
      { label: "Patios", detail: "Paver and stone patios on properly compacted bases — the difference between five years and twenty." },
      { label: "Fire features", detail: "Fire pits, fire circles, and outdoor fireplaces — fuel, clearances, and seating radius settled in the design." },
      { label: "Walkways", detail: "Routes your tenants actually use, rebuilt level, drained, and trip-hazard free." },
      { label: "Walls & masonry", detail: "Retaining and seating walls, steps, and veneer work engineered for the load and drainage behind them." },
      { label: "Drainage", detail: "Grading and drainage corrections that protect both the hardscape and the structure near it." },
    ],
    masonry: true,
  },
};

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return pageMetadata({
    path: `/services/${service.slug}`,
    title: service.name,
    description: `${service.tagline} Serving commercial properties across Connecticut.`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  const detail = serviceDetailBySlug(service.slug as ServiceSlug);
  if (!detail) notFound();

  const jsonLd = serviceJsonLd(service.slug);
  const crossIndustries = industries.filter((i) => detail.industryIds.includes(i.id));
  const p = PERSONALITIES[service.slug as ServiceSlug];
  const isSnow = service.slug === "snow-ice-management";
  // Landscaping leads with its project photography (client direction:
  // "What landscaping projects look like" sits directly under the hero,
  // followed by the moving field rail); the Neglected → Maintained story
  // rail moves below What We Handle on this page only.
  const isLandscaping = service.slug === "commercial-landscaping";
  // Hardscape leads with the "Rooms without walls" photographic act
  // (design-direction imagery, labeled as such) before the process rail.
  const isHardscape = service.slug === "hardscape-design";
  // Asphalt: intervention-level act (maintenance → repair → restoration →
  // reconstruction) with the client-supplied field photography and the
  // crack-sealing video; the standard handle grid and gallery are replaced.
  const isAsphalt = service.slug === "asphalt-pavement";

  // Landscaping capability explorer — the five existing capabilities paired
  // with relevant real photography (client direction: selection combined
  // with large imagery; only existing approved/licensed photos are mapped).
  const landscapingCapabilities: CapabilityItem[] = isLandscaping && p
    ? p.handle.map((item) => {
        const images: Record<string, { img: string; srcSet?: string; alt: string }> = {
          Turf: {
            img: "/images/placeholders/land-field-sod-800.avif",
            srcSet:
              "/images/placeholders/land-field-sod-800.avif 800w, /images/placeholders/land-field-sod.avif 1200w",
            alt: "Crew installing fresh sod on a sloped lawn at a commercial property",
          },
          Beds: {
            img: "/images/placeholders/work-entrance-gardens-800.avif",
            srcSet:
              "/images/placeholders/work-entrance-gardens-800.avif 800w, /images/placeholders/work-entrance-gardens-1200.avif 1200w, /images/placeholders/work-entrance-gardens.avif 1600w",
            alt: "Community entrance garden with red azaleas, fresh mulch beds, a brick pillar, and a manicured lawn",
          },
          Pruning: {
            img: "/images/placeholders/work-formal-gardens-800.avif",
            srcSet:
              "/images/placeholders/work-formal-gardens-800.avif 800w, /images/placeholders/work-formal-gardens.avif 1200w",
            alt: "Formal garden with clipped boxwood spheres and stone urn planters along a paver walkway",
          },
          Seasonal: {
            img: "/images/placeholders/work-terraced-gardens-800.avif",
            srcSet:
              "/images/placeholders/work-terraced-gardens-800.avif 800w, /images/placeholders/work-terraced-gardens-1200.avif 1200w, /images/placeholders/work-terraced-gardens.avif 1600w",
            alt: "Natural stone terraced garden beds filled with pink seasonal flowers and canna lilies along a stone walkway",
          },
          Maintenance: {
            img: "/images/placeholders/land-story-installed-640.avif",
            srcSet:
              "/images/placeholders/land-story-installed-640.avif 640w, /images/placeholders/land-story-installed.avif 900w",
            alt: "Planting bed fully planted with seasonal color and fresh mulch, maintained visit after visit",
          },
        };
        return { ...item, ...images[item.label] };
      })
    : [];

  const storySection = p?.story ? (
    <section aria-labelledby="story-heading" className="py-16 md:py-24">
      <div className="container-site">
        <p className="eyebrow">{p.story.eyebrow}</p>
        <h2
          id="story-heading"
          className="mt-2 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest"
        >
          {p.story.heading}
        </h2>
        {p.masonry ? <MasonryLines /> : null}
        <div className="mt-8">
          <StoryRail panels={p.story.panels} />
        </div>
      </div>
    </section>
  ) : null;

  // What We Handle (progressive disclosure, no text walls) — hardscape uses
  // the standard treatment; landscaping has its own capability explorer
  // further up; snow omits the block entirely (client direction).
  // Client direction (hardscape cleanup): the hardscape page omits the
  // audience paragraph, industry chips, and See How We Work link below the
  // handle grid — the page stays visual and ends on the handle grid.
  const handleSection = p ? (
    <section aria-labelledby="handle-heading" className="bg-white py-16 md:py-20">
      <div className="container-site">
        <p className="eyebrow">What we handle</p>
        <h2
          id="handle-heading"
          className="mt-2 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest"
        >
          {p.handleHeading}
        </h2>
        <div className="mt-6">
          <WhatWeHandle items={p.handle} />
        </div>
        {isHardscape ? null : (
          <>
            <p className="mt-10 max-w-2xl leading-relaxed text-charcoal/90">
              {service.whoItsFor}
            </p>
            {crossIndustries.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {crossIndustries.map((ind) => (
                  <li key={ind.id}>
                    <Link
                      href={`/industries#${ind.id}`}
                      className="inline-block bg-tint px-3 py-1.5 text-sm font-semibold text-forest transition-colors duration-fast hover:bg-forest hover:text-cream"
                    >
                      {ind.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
            <Link
              href="/how-we-work"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-forest transition-colors duration-fast hover:text-forest-dark"
            >
              See How We Work
              <ArrowRightIcon size={18} />
            </Link>
          </>
        )}
      </div>
    </section>
  ) : null;

  return (
    <>
      {p ? (
        <>
          {/* 1 — Personality hero (real Terravian photograph sets the environment) */}
          <ServiceHero
            name={service.name}
            line={p.hero.line}
            ctaLabel={p.hero.ctaLabel}
            ctaHref={`/request-a-proposal?service=${service.slug}`}
            imgBase={p.hero.imgBase}
            imgDir={p.hero.imgDir}
            alt={p.hero.alt}
            motion={p.hero.motion ?? "static"}
            overlay={p.hero.overlay === "snowfall" ? <Snowfall /> : undefined}
          />

          {isLandscaping ? (
            <>
              {/* 2 — Field photo rail (continuous drift, small names),
                  directly under the hero per client direction */}
              <FieldMarquee items={fieldRail} />

              {/* 3 — What we handle: interactive capability explorer —
                  selector ledger + large relevant photography (client
                  direction: Turf/Beds/Pruning/Seasonal/Maintenance combined
                  with imagery; audiences + How We Work woven in beneath) */}
              <section aria-labelledby="handle-heading" className="py-16 md:py-24">
                <div className="container-site">
                  <div className="max-w-2xl">
                    <p className="eyebrow">What we handle</p>
                    <h2
                      id="handle-heading"
                      className="mt-2 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest"
                    >
                      {p.handleHeading}
                    </h2>
                  </div>
                  <div className="mt-10 md:mt-14">
                    <CapabilityExplorer items={landscapingCapabilities} />
                  </div>
                </div>
              </section>

              {/* 4+5 — The photographic act: transformation story and project
                  photography treated as ONE continuous editorial sequence
                  (client direction: Problem → Preparation → Transformation →
                  real project proof; real photography is the hero) */}
              <section
                aria-label="The work, visibly — from neglected beds to documented results"
                className="bg-white py-16 md:py-24"
              >
                <div className="container-site">
                  {/* Landscaping always defines a story rail */}
                  <p className="eyebrow">{p.story!.eyebrow}</p>
                  <h2 className="mt-2 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest">
                    {p.story!.heading}
                  </h2>
                  <div className="mt-10 md:mt-14">
                    <StoryRail panels={p.story!.panels} />
                  </div>
                </div>

                {/* Proof from real properties — named recent-work mosaic;
                    duplicate demonstration block removed (the Portfolio
                    page carries project layouts) */}
                <div className="container-site mt-16 md:mt-24">
                  <p className="eyebrow">Recent Terravian work</p>
                  <h2 className="mt-2 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest">
                    What {service.shortName.toLowerCase()} projects look like
                  </h2>
                  <FeaturedWork items={recentWork} />
                </div>

                {/* Sod installation & bed work — larger, immersive frames
                    continuing the same photographic story */}
                <div className="mt-16 px-3 md:mt-24 md:px-6">
                  <div className="container-site !px-0">
                    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 px-0 md:px-0">
                      <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest">
                        {p.galleryHeading}
                      </h2>
                      <p className="max-w-md border-l-[3px] border-earth pl-4 text-sm leading-relaxed text-charcoal/75">
                        {detail.galleryNote}
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 md:mt-10">
                    <ServiceGallery images={detail.gallery} serviceName={service.name} />
                  </div>
                </div>
              </section>
            </>
          ) : isHardscape ? (
            <>
              {/* Hardscape: the photographic act (aspiration), then scope
                  chips. The labeled concept imagery act replaces the
                  placeholder gallery below. */}
              <HardscapeShowcase />
              {handleSection}
            </>
          ) : isAsphalt ? (
            <>
              {/* Asphalt: levels of intervention with field photography and
                  the field videos between concepts (client asset brief).
                  The "Every level of pavement work" tab grid and the
                  Related Projects block are omitted (client direction) —
                  the levels narrative carries the page. */}
              <AsphaltLevels />
            </>
          ) : (
            <>
              {isSnow ? (
                /* Snow & ice: the winter-operations sequence as three visual
                   steps — client-supplied imagery with the client's own
                   captions (storm watch → clear access → documented).
                   Bottom padding is intentionally tight so the gap above
                   "In the field" matches the site's rhythm rather than
                   reading as missing content (client direction). */
                <section aria-label="How winter service runs" className="pt-16 pb-8 md:pt-24 md:pb-12">
                  <div className="container-site">
                    <div className="grid gap-8 md:grid-cols-3 md:gap-6">
                      <figure>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/images/services/snow-storm-watch-radar-800.avif"
                          srcSet="/images/services/snow-storm-watch-radar-800.avif 800w, /images/services/snow-storm-watch-radar.webp 1200w"
                          sizes="(max-width: 768px) 100vw, 440px"
                          alt="Weather radar map tracking a winter storm system approaching the Northeast"
                          width={1200}
                          height={960}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[4/3] w-full object-cover"
                        />
                        <figcaption className="mt-3">
                          <span className="block font-semibold text-forest">
                            Storm watch
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-charcoal/70">
                            Tracked before the first flake — crews and routes
                            staged in advance.
                          </span>
                        </figcaption>
                      </figure>
                      <figure>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/images/services/snow-clear-access-walk-800.avif"
                          srcSet="/images/services/snow-clear-access-walk-800.avif 800w, /images/services/snow-clear-access-walk.webp 986w"
                          sizes="(max-width: 768px) 100vw, 440px"
                          alt="A cleared, treated walkway alongside a commercial building at dusk after snowfall"
                          width={986}
                          height={1484}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[4/3] w-full object-cover"
                        />
                        <figcaption className="mt-3">
                          <span className="block font-semibold text-forest">
                            Clear access
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-charcoal/70">
                            Lots, walks, and entrances open before your tenants
                            arrive.
                          </span>
                        </figcaption>
                      </figure>
                      <figure>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/images/services/snow-service-record.webp"
                          alt="A snow removal service record on a clipboard and a phone showing time-stamped visit photos"
                          width={1200}
                          height={800}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[4/3] w-full object-cover"
                        />
                        <figcaption className="mt-3">
                          <span className="block font-semibold text-forest">
                            Documented
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-charcoal/70">
                            Time-stamped photos and service records after every
                            event.
                          </span>
                          <span className="mt-1 block text-xs text-charcoal/50">
                            Sample format shown.
                          </span>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                </section>
              ) : (
                storySection
              )}
              {/* Snow omits the "What we handle" block entirely (client
                  direction) — the three-step strip and field footage carry
                  the page. */}
              {isSnow ? null : handleSection}
            </>
          )}
        </>
      ) : (
        <>
          {/* Standard template — introduction, capabilities, who it's for */}
          <section className="py-16 md:py-24" aria-labelledby="service-heading">
            <div className="container-site">
              <p className="eyebrow">Services</p>
              <h1
                id="service-heading"
                className="mt-2 text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.1] text-forest"
              >
                {service.name}
              </h1>
              <p className="mt-4 max-w-3xl text-[1.0625rem] leading-[1.65] text-charcoal/90">
                {service.intro}
              </p>

              <div className="mt-10 border border-charcoal/10 bg-white p-7">
                <h2 className="text-xl">Capabilities</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {service.capabilities.map((c) => (
                    <li key={c} className="flex items-center gap-2.5 text-charcoal/90">
                      <span className="h-2 w-2 shrink-0 bg-forest" aria-hidden="true" />
                      {c}
                    </li>
                  ))}
                </ul>

                <h2 className="mt-8 text-xl">Who it&apos;s for</h2>
                <p className="mt-3 leading-relaxed text-charcoal/90">{service.whoItsFor}</p>
                {crossIndustries.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {crossIndustries.map((ind) => (
                      <li key={ind.id}>
                        <Link
                          href={`/industries#${ind.id}`}
                          className="inline-block bg-tint px-3 py-1.5 text-sm font-semibold text-forest transition-colors duration-fast hover:bg-forest hover:text-cream"
                        >
                          {ind.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </section>

          {/* Process lives in ONE place: the How We Work page. Service
              pages carry only this pointer (no duplicated step lists). */}
          <section aria-label="Our process" className="py-10">
            <div className="container-site">
              <Link
                href="/how-we-work"
                className="inline-flex items-center gap-2 font-semibold text-forest transition-colors duration-fast hover:text-forest-dark"
              >
                See How We Work
                <ArrowRightIcon size={18} />
              </Link>
            </div>
          </section>
        </>
      )}

      {/* Photo gallery (placeholders, lightbox-enabled). On the landscaping
          page the gallery lives inside the continuous photographic act
          above, and on the hardscape page the "Rooms without walls" act
          carries the imagery — so it is not repeated on either. */}
      {isSnow ? (
        /* Snow & ice: the placeholder gallery is replaced by real field
           video — the crew working through an active storm (client-supplied,
           muted autoplay loop, reduced-motion users get the poster). */
        <section aria-labelledby="snow-video-heading" className="pt-8 pb-16 md:pt-12 md:pb-20">
          <div className="container-site">
            <p className="eyebrow">In the field</p>
            <h2 id="snow-video-heading" className="mt-2 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest">
              Working while it&apos;s still snowing
            </h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-[1.65] text-charcoal/80">
              Our crews work continuously through the storm.
              <span className="max-md:hidden">
                {" "}No waiting for the last flake, no interruption between
                passes — this is what that looks like.
              </span>
            </p>
            {/* Two raw field clips, side by side — evidence, not decoration.
                Both are portrait phone footage; the grid keeps them at equal
                size on tablet/desktop and stacks them naturally on mobile.
                Posters paint instantly; preload="metadata" defers the video
                payload until playback starts. */}
            <div className="mx-auto mt-8 grid max-w-3xl gap-5 sm:grid-cols-2">
              <figure>
                <video
                  src="/videos/snow-crew-active-storm.mp4"
                  poster="/images/services/snow-crew-active-storm-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  className="aspect-[9/16] w-full object-cover"
                  aria-label="Terravian sidewalk crew shoveling and clearing snow during an active nighttime storm"
                />
                <figcaption className="mt-2 text-sm text-charcoal/60">
                  Sidewalk crew mid-storm — real winter operations footage.
                </figcaption>
              </figure>
              <figure>
                <video
                  src="/videos/snow-crew-night-lot.mp4"
                  poster="/images/services/snow-crew-night-lot-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  className="aspect-[9/16] w-full object-cover"
                  aria-label="Terravian crew member shoveling the entrance walk of a commercial building during an active nighttime snowstorm"
                />
                <figcaption className="mt-2 text-sm text-charcoal/60">
                  Night shift on the walks — cleared while the storm is still
                  on.
                </figcaption>
              </figure>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/services/snow-plow-truck-lot-800.avif"
                  srcSet="/images/services/snow-plow-truck-lot-800.avif 800w, /images/services/snow-plow-truck-lot-1200.avif 1200w"
                  sizes="(max-width: 768px) 100vw, 668px"
                  alt="Terravian plow truck clearing a commercial lot during an active snowstorm"
                  width={1600}
                  height={2133}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
                <figcaption className="mt-2 text-sm text-charcoal/60">
                  Plowing through the storm — not after it.
                </figcaption>
              </figure>
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/services/snow-plow-truck-entrance-800.avif"
                  srcSet="/images/services/snow-plow-truck-entrance-800.avif 800w, /images/services/snow-plow-truck-entrance-1200.avif 1200w"
                  sizes="(max-width: 768px) 100vw, 668px"
                  alt="Terravian plow truck clearing the entrance walk of a commercial building after a snowfall"
                  width={1600}
                  height={2133}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
                <figcaption className="mt-2 text-sm text-charcoal/60">
                  Lots, walks, and entrances open before your tenants arrive.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>
      ) : !isLandscaping && !isHardscape && !isAsphalt ? (
        <section aria-labelledby="gallery-heading" className="py-16 md:py-20">
          <div className="container-site">
            <p className="eyebrow">Project photography</p>
            <h2 id="gallery-heading" className="mt-2 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest">
              {p?.galleryHeading ?? `${service.shortName} in the field`}
            </h2>
            <p className="mt-4 max-w-3xl border-l-4 border-earth bg-white p-4 text-sm leading-relaxed text-charcoal/85">
              {detail.galleryNote}
            </p>
            <ServiceGallery images={detail.gallery} serviceName={service.name} />
          </div>
        </section>
      ) : null}

      {/* FAQ — editorial split: sticky context column (with real project
          photography on the landscaping page) beside a numbered question
          ledger; native details/summary stays keyboard-accessible */}
      <section aria-labelledby="faq-heading" className="bg-white py-16 md:py-24">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow">Questions</p>
                <h2
                  id="faq-heading"
                  className="mt-2 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest"
                >
                  Answered before you ask
                </h2>
                {isLandscaping ? (
                  <>
                    <p className="mt-5 max-w-md leading-[1.7] text-charcoal/85">
                      The questions every property manager, hotel, and HOA asks
                      before the first walkthrough — answered the same way we
                      answer them on site.
                    </p>
                    <figure className="mt-8 hidden lg:block">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/placeholders/field-garden-steps-800.avif"
                        srcSet="/images/placeholders/field-garden-steps-800.avif 800w, /images/placeholders/field-garden-steps.avif 1000w"
                        sizes="440px"
                        alt="Stone garden steps bordered by seasonal flower beds"
                        width={900}
                        height={675}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <figcaption className="mt-3 border-l-[3px] border-earth pl-3 text-sm leading-snug text-charcoal/70">
                        Garden steps &amp; color beds — recent Terravian work
                      </figcaption>
                    </figure>
                  </>
                ) : (
                  <p className="mt-5 max-w-md leading-[1.7] text-charcoal/85">
                    Straight answers on scope, process, and documentation —
                    the same terms that go into your service agreement.
                  </p>
                )}
              </div>
            </div>
            <div className="lg:col-span-7">
              <ol>
                {detail.faqs.map((faq, i) => (
                  <li key={faq.question} className="border-t border-charcoal/12 first:border-t-2 first:border-forest">
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-baseline gap-4 py-5 transition-colors duration-fast ease-brand hover:text-forest focus-visible:text-forest md:gap-6 [&::-webkit-details-marker]:hidden">
                        <span
                          aria-hidden="true"
                          className="shrink-0 text-[0.6875rem] font-semibold tracking-[0.15em] text-earth"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-lg font-semibold leading-snug text-charcoal transition-colors duration-fast ease-brand group-hover:text-forest md:text-xl">
                          {faq.question}
                        </span>
                        <span
                          aria-hidden="true"
                          className="shrink-0 text-xl leading-none text-forest transition-transform duration-base ease-brand group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="pb-6 pl-8 pr-6 leading-[1.7] text-charcoal/85 md:pl-12">
                        {faq.answer}
                      </p>
                    </details>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Related projects (demonstration-badged). On the landscaping page
          this block lives at the top inside "What landscaping projects
          look like", so it is not repeated here; the asphalt page omits it
          entirely until real approved projects exist (client direction). */}
      {!isLandscaping && !isAsphalt ? (
        <section aria-labelledby="related-heading" className="py-16 md:py-20">
          <div className="container-site">
            <p className="eyebrow">Related projects</p>
            <h2 id="related-heading" className="mt-2 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest">
              What {service.shortName.toLowerCase()} projects look like
            </h2>
            <RelatedProjects serviceSlug={service.slug as ServiceSlug} />
          </div>
        </section>
      ) : null}

      {jsonLd ? <JsonLd data={jsonLd} /> : null}
    </>
  );
}
