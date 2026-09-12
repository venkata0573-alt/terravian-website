import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { demoMetadata } from "@/lib/metadata";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";

/**
 * Portfolio index. DEMONSTRATION CONTENT: every project is a placeholder
 * layout, so this page is noindex/nofollow and excluded from the production
 * sitemap until real, approved Terravian case studies replace the demos.
 */
export const metadata: Metadata = demoMetadata({
  path: "/portfolio",
  title: "Portfolio",
  description:
    "Terravian project portfolio (currently demonstration layouts). Real commercial landscaping, snow, and hardscape case studies publish after client approval.",
});

export default function PortfolioPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="container-site">
          <p className="eyebrow">Portfolio</p>
          <h1 className="mt-2 max-w-3xl text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.1] text-forest">
            Project work, documented
          </h1>
          <p className="mt-4 max-w-3xl text-[1.0625rem] leading-[1.65] text-charcoal/90">
            <strong className="font-semibold text-charcoal">
              Demonstration content:
            </strong>{" "}
            the projects below are layout demonstrations, not completed
            Terravian projects. Real case studies — with before, progress, and
            final photography — publish here after client approval and written
            permission.
          </p>
          <div className="mt-10">
            <PortfolioGrid projects={projects} />
          </div>
        </div>
      </section>
    </>
  );
}
