import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { IndustryCards } from "@/components/industries/IndustryCards";

export const metadata: Metadata = pageMetadata({
  path: "/industries",
  title: "Industries We Serve",
  description:
    "Commercial grounds care for hotels, property managers, HOAs, retail centers, office properties, and industrial sites across Connecticut.",
});

export default function IndustriesPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="container-site">
          <h1 className="text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-forest">
            Industries We Serve
          </h1>
          <p className="mt-3 max-w-2xl text-[1.0625rem] leading-[1.6] text-charcoal/80">
            One accountable partner for commercial properties of every kind.
          </p>
          <div className="mt-10 md:mt-14">
            <IndustryCards />
          </div>
        </div>
      </section>
    </>
  );
}
