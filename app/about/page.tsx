import type { Metadata } from "next";
import { business, audiences } from "@/content/business";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About",
  description:
    "Terravian Landscaping is a Cheshire, CT commercial property care company: landscaping, grounds maintenance, seasonal enhancements, snow & ice, hardscape, and asphalt & pavement. The Company That Shows Up.",
});

export default function AboutPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="container-site">
          <p className="eyebrow">About</p>
          <h1 className="mt-2 text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.1] text-forest">
            {business.tagline}
          </h1>
          <p className="mt-6 max-w-3xl text-[1.0625rem] leading-[1.65] text-charcoal/90">
            {business.name} is a commercial property care company based in
            Cheshire, Connecticut, serving commercial properties across the
            whole state. We work with the people responsible for how a
            property looks, functions, and holds up — in every season.
          </p>
          <p className="mt-4 max-w-3xl text-[1.0625rem] leading-[1.65] text-charcoal/90">
            The tagline is a commitment, not a slogan: scheduled crews that
            arrive when planned, service that is documented with photos, and
            communication that reaches you before you have to ask. That is what
            an enterprise-grade property operations partner owes its clients —
            and it is the standard we hold ourselves to on every visit.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="border border-charcoal/10 bg-white p-7">
              <h2 className="text-xl">What we do</h2>
              <ul className="mt-4 space-y-2">
                {services.map((s) => (
                  <li key={s.slug} className="flex items-center gap-2.5 text-charcoal/90">
                    <span className="h-2 w-2 shrink-0 bg-forest" aria-hidden="true" />
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-charcoal/10 bg-white p-7">
              <h2 className="text-xl">Who we work for</h2>
              <ul className="mt-4 space-y-2">
                {audiences.map((a) => (
                  <li key={a} className="flex items-center gap-2.5 text-charcoal/90">
                    <span className="h-2 w-2 shrink-0 bg-earth" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Team section intentionally omitted until real staff information
              and photos are supplied and approved by Terravian. Founding
              date, team size, and ownership details are likewise withheld
              per the verified-facts rules. */}
          <p className="mt-8 border-l-4 border-forest bg-white p-4 text-sm leading-relaxed text-charcoal/85">
            Company history, team profiles, and credentials publish here once
            verified and approved by Terravian — we don&apos;t fill pages with
            claims we can&apos;t stand behind.
          </p>
        </div>
      </section>
    </>
  );
}
