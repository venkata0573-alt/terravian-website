/**
 * Proof of documentation — the "evidence" act.
 * Left: the claim, then the service record itself — the visit-complete
 * phone screen and the printed report, a clearly illustrative sample
 * format. Right: a real maintained commercial property, stretched to
 * meet the document column's height so the pair reads as one composition.
 */
export function ProofOfWork() {
  return (
    <section aria-labelledby="proof-heading" className="py-16 md:py-24">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          <div className="lg:col-span-5">
            <p className="eyebrow">Documentation</p>
            <h2
              id="proof-heading"
              className="mt-2 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15]"
            >
              Every visit ends with{" "}
              <em className="font-display italic text-forest">evidence.</em>
            </h2>
            <p className="mt-4 max-w-md text-[1.0625rem] leading-[1.6] text-charcoal/80">
              We show you the current conditions, completed work, and any
              areas of concern. Each visit is photographed and documented,
              giving you a clear record and plan of action.
            </p>
            {/* The record, right where the claim is made — no gap between
                promise and proof. */}
            <figure className="mt-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/how-we-work/service-report-devices.webp"
                alt="A sample Terravian service report: a phone showing a completed visit with photos, beside a printed report on a clipboard"
                width={968}
                height={1024}
                loading="lazy"
                decoding="async"
                className="w-full object-cover"
              />
              <figcaption className="mt-2 text-sm text-charcoal/60">
                Sample format — filled in and attached to your property file
                after every visit.
              </figcaption>
            </figure>
            <p className="mt-6 border-l-2 border-earth pl-4 text-sm leading-relaxed text-charcoal/70 lg:max-w-sm">
              When a board member, owner, or regional manager asks about the
              grounds, you&apos;ll have the answer in writing — already in
              your inbox.
            </p>
          </div>

          <div className="lg:col-span-7">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/portfolio/office/office-striped-lawn-walk-800.avif"
              srcSet="/images/portfolio/office/office-striped-lawn-walk-800.avif 800w, /images/portfolio/office/office-striped-lawn-walk-1200.avif 1200w"
              sizes="(max-width: 1024px) 100vw, 790px"
              alt="A freshly mowed, striped lawn and clean walkway at a maintained office property"
              width={1448}
              height={1086}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover lg:aspect-auto lg:h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
