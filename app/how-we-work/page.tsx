import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { WorkHero } from "@/components/how-we-work/WorkHero";
import { ShortVersion } from "@/components/how-we-work/ShortVersion";
import { ServiceLoop } from "@/components/how-we-work/ServiceLoop";
import { ProofOfWork } from "@/components/how-we-work/ProofOfWork";
import { YearRound } from "@/components/how-we-work/YearRound";
import { PanoBreak } from "@/components/how-we-work/PanoBreak";
import { ProgramsIndex } from "@/components/how-we-work/ProgramsIndex";

export const metadata: Metadata = pageMetadata({
  path: "/how-we-work",
  title: "How We Work",
  description:
    "One accountable partner, a five-stage service loop, photo documentation after every visit, and year-round coverage — how Terravian runs commercial grounds across Connecticut.",
});

/**
 * How We Work — rebuilt (v10) as a visual narrative, not a procedure doc:
 * promise → the three things a manager is actually buying → the five-stage
 * loop with its deliverables → documented proof → the year-round calendar →
 * a photographic pause → the named programs → the ask. Rhythm comes from
 * alternating paper / charcoal / stone2 / full-bleed photo / white bands.
 */
export default function HowWeWorkPage() {
  return (
    <>
      <WorkHero />
      <ShortVersion />
      <ServiceLoop />
      <ProofOfWork />
      <YearRound />
      <PanoBreak />
      <ProgramsIndex />
    </>
  );
}
