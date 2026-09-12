import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { ServiceCards } from "@/components/services/ServiceCards";

export const metadata: Metadata = pageMetadata({
  path: "/services",
  title: "Services",
  description:
    "Landscape & maintenance, snow & ice management, patio & hardscape design-build, and asphalt & pavement services — one accountable partner, year-round.",
});

export default function ServicesPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="container-site">
          <h1 className="text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-forest">
            What We Do
          </h1>
          <p className="mt-3 max-w-2xl text-[1.0625rem] leading-[1.6] text-charcoal/80">
            One accountable partner for your property, in every season.
          </p>
          <div className="mt-10 md:mt-14">
            <ServiceCards />
          </div>
        </div>
      </section>
    </>
  );
}
