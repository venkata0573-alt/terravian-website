import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { HeroRotator } from "@/components/home/HeroRotator";
import { DivisionCards } from "@/components/home/DivisionCards";
import { PortfolioFeature } from "@/components/home/PortfolioFeature";
import { FieldMarquee } from "@/components/ui/FieldMarquee";
import { homeFieldRail } from "@/content/recentWork";
import { LogoPlaceholderGrid } from "@/components/home/TrustPlaceholders";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * Homepage — show, don't tell (v8, client review).
 *
 * Visitors come to see the work, not to read about it: the page is a
 * photography-led walk — hero → divisions → field photos → portfolio →
 * the names behind the gates → one short human promise → talk to us.
 * All process/capability detail lives on the intent-matched pages
 * (/how-we-work, /services/*, /industries) where visitors who WANT to
 * read find it, instead of being force-fed on the front door.
 *
 * Voice rule: plain and warm, second person, short sentences. No
 * capability-statement language. Integrity rules unchanged — no invented
 * stats, quotes, or claims anywhere.
 */
export const metadata: Metadata = pageMetadata({
  path: "/",
  title: "Year-Round Commercial Property Care",
  description:
    "Commercial landscaping, grounds maintenance, snow & ice management, hardscape design-build, and asphalt & pavement services across Connecticut. One company, every season. The Company That Shows Up.",
});

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero (rotating visuals; headline + CTAs on mobile, CTA strip
          on desktop) */}
      <HeroRotator />

      {/* 2 — The four divisions, photo-led. The heading keeps container
          gutters; the card band runs full-bleed, edge to edge (client
          direction). */}
      <section aria-labelledby="divisions-heading" className="py-16 md:py-24">
        <div className="container-site">
          <Reveal>
            {/*
              Heading typography is deliberate: no em dash between the two
              phrases (client direction) — one sentence with a period. The
              container is unconstrained on lg+ so the headline stays on ONE
              line when width allows; below lg it wraps naturally.
            */}
            <div className="max-w-3xl lg:max-w-none">
              <p className="eyebrow">One company. Every season.</p>
              <h2
                id="divisions-heading"
                className="mt-2 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest"
              >
                Complete property care. One accountable partner.
              </h2>
              <p className="mt-4 max-w-3xl font-display text-[1.125rem] italic leading-[1.6] text-charcoal md:text-[1.1875rem]">
                Landscaping, snow, hardscape, and pavement — coordinated
                through one company.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-10 md:mt-12">
          <DivisionCards />
        </Reveal>
      </section>

      {/* 3 — Field photo rail: pure photography, no copy to read */}
      <FieldMarquee
        items={homeFieldRail}
        eyebrow="From the field"
        title="Color, stone, and structure — out on real properties"
      />

      {/* 4 — Our Work preview: full-width editorial photography layout.
          This is the section visitors came for — the work itself. */}
      <section aria-labelledby="our-work-heading" className="pb-8 pt-12 md:pb-10 md:pt-16">
        <div className="container-site">
          <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-12">
            <div>
              <p className="eyebrow">Our work</p>
              <h2
                id="our-work-heading"
                className="mt-2 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest"
              >
                The work speaks first
              </h2>
            </div>
            {/* Supporting copy: 3px brown brand bar + italic Newsreader serif,
                one editorial lockup with the heading */}
            <div className="max-w-xl lg:border-l-[3px] lg:border-earth/70 lg:pl-6">
              <p className="font-display text-[1.125rem] italic leading-[1.55] text-charcoal md:text-[1.1875rem]">
                Hotels, offices, condo communities, retail — walk the grounds
                the way their guests do.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 px-3 md:mt-10 md:px-6">
          <PortfolioFeature />
        </div>
      </section>

      {/* 5 — The names behind the gates. Client brand rail: marks supplied
          by the client for the properties Terravian crews serve. */}
      <section aria-labelledby="properties-heading" className="py-16 md:py-24">
        <div className="container-site">
          <SectionHeading
            id="properties-heading"
            eyebrow="In good company"
            title={
              <>
                Properties we proudly serve
              </>
            }
            intro="Hotels, retail, and distribution across Connecticut — the grounds behind the names you know, kept right in every season."
          />
        </div>
        <div className="mt-10 md:mt-12">
          <LogoPlaceholderGrid />
        </div>
      </section>

      {/* 6 — The promise, in one breath. The only paragraph-length copy on
          the page; everything above it was photography. */}
      <section aria-labelledby="promise-heading" className="py-16 md:py-24">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow">Why Terravian</p>
            <h2
              id="promise-heading"
              className="mt-3 max-w-3xl font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.15] text-forest"
            >
              The Company That Shows Up.
            </h2>
            <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.65] text-charcoal/85">
              We walk your property, tell you straight what it needs, do the
              work, and send you the photos — before, during, and after. You
              hear it from us first, every time.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
              <Link
                href="/how-we-work"
                className="inline-flex items-center gap-2 border-b-2 border-earth pb-1 text-sm font-semibold uppercase tracking-[0.08em] text-earth transition-colors duration-fast ease-brand hover:border-earth-dark hover:text-earth-dark"
              >
                See how we work
                <ArrowRightIcon size={15} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border-b-2 border-earth pb-1 text-sm font-semibold uppercase tracking-[0.08em] text-earth transition-colors duration-fast ease-brand hover:border-earth-dark hover:text-earth-dark"
              >
                Meet the company
                <ArrowRightIcon size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

          </>
  );
}
