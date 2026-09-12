import { AsphaltFieldVideo } from "@/components/services/AsphaltFieldVideo";

/**
 * Asphalt & Pavement — the intervention-level act (client asset brief):
 * services organized as levels of intervention, with photography between
 * concepts instead of a service-card wall.
 *
 *   MAINTENANCE    — sealcoating photo + crack-sealing field video
 *   REPAIR         — ledger beside hot-mix field footage, then a matched
 *                    3:4 documentation triptych (saw cutting / curb /
 *                    crack repair)
 *   RESTORATION / RECONSTRUCTION — paver machine (portrait editorial)
 *   EXECUTION      — real crew/equipment photo at a commercial property
 *
 * Layout discipline (v28): every row is composed by column-bottom
 * accounting — media scale matches narrative rank, tops align, and
 * bottoms land within one caption of each other so no grid-leftover
 * voids pool inside a section. Field photographs are resized only —
 * never re-graded into stock polish.
 */
export function AsphaltLevels() {
  return (
    <>
      {/* MAINTENANCE — text ledger, sealcoating hero image, and the
          crack-sealing field video as one aligned trio. The video shows
          at a moderated 4:5 frame (file untouched) so evidence supports
          the level instead of outweighing it. */}
      <section
        aria-labelledby="asphalt-maintenance-heading"
        className="bg-white pt-16 pb-14 md:pt-24 md:pb-20"
      >
        <div className="container-site">
          <div className="grid items-start gap-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-12 lg:gap-x-14">
            <div className="sm:col-span-2 lg:col-span-5">
              <p className="eyebrow">Level one — maintenance</p>
              <h2
                id="asphalt-maintenance-heading"
                className="mt-2 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest"
              >
                Keep good pavement good
              </h2>
              <p className="mt-4 leading-[1.7] text-charcoal/90">
                Sound pavement fails from the surface down — water finds a
                crack, freezes, and widens it. Sealed cracks and a sealed
                surface stop that cycle and push reconstruction years out.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "Crack sealing & filling",
                  "Sealcoating",
                  "Preventive pavement maintenance programs",
                  "Striping & pavement markings",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-charcoal/90">
                    <span className="h-2 w-2 shrink-0 bg-forest" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <figure className="lg:col-span-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/services/asphalt-sealcoating-crew.avif"
                alt="Crew squeegeeing fresh sealcoat across a commercial parking lot, landscaping beds and storefronts behind them"
                width={1400}
                height={1050}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="mt-3">
                <span className="block font-display text-lg text-forest">Sealcoating</span>
                <span className="mt-1 block text-sm leading-relaxed text-charcoal/70">
                  A sealed surface resists water, salt, and sun — the
                  cheapest years a lot ever gets.
                </span>
              </figcaption>
            </figure>
            <div className="lg:col-span-3">
              <AsphaltFieldVideo aspectClass="aspect-[4/5]" />
            </div>
          </div>
        </div>
      </section>

      {/* REPAIR — the ledger beside the hot-mix field footage (the
          material this level uses — semantic pair), then a matched 3:4
          documentation triptych: original saw-cutting photograph, the
          client-supplied asphalt curb, and hot-pour crack repair. The
          three frames share one height so the row reads as a deliberate
          set, not grid leftovers. */}
      <section
        aria-labelledby="asphalt-repair-heading"
        className="pt-14 pb-16 md:pt-20 md:pb-24"
      >
        <div className="container-site">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="eyebrow">Level two — repair</p>
              <h2
                id="asphalt-repair-heading"
                className="mt-2 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest"
              >
                Fix the failures before they spread
              </h2>
              <p className="mt-4 max-w-2xl leading-[1.7] text-charcoal/90">
                <span className="max-md:hidden">
                  Potholes, cracked seams, and settled catch basins are
                  liability first and appearance second.{" "}
                </span>
                We cut failed areas out square, correct the base where it has
                failed, and patch to the surrounding grade — photographed
                before and after.
              </p>
              <ul className="mt-6 grid max-w-2xl gap-2.5 sm:grid-cols-2">
                {[
                  "Pothole & failed-area repair",
                  "Saw-cut asphalt patching",
                  "Base repair",
                  "Crack repair",
                  "Drainage-related corrections",
                  "Catch-basin interface work",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-charcoal/90">
                    <span className="h-2 w-2 shrink-0 bg-forest" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <AsphaltFieldVideo
                src="/videos/asphalt-hot-mix-preparation.mp4"
                poster="/videos/asphalt-hot-mix-preparation-poster.jpg"
                caption="Hot-mix preparation in the field."
                ariaLabel="Terravian field video: crew preparing a fresh load of hot-mix asphalt in a material bin"
                aspectClass="aspect-[540/304]"
                label="hot-mix preparation field video"
              />
            </div>
          </div>
          <div className="mt-12 grid gap-10 md:mt-14 md:grid-cols-3 md:gap-6 lg:gap-14">
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/services/asphalt-saw-cutting.avif"
                alt="Terravian crew member saw-cutting a damaged pavement area for removal at a commercial property"
                width={1000}
                height={1333}
                loading="lazy"
                decoding="async"
                className="aspect-[3/4] w-full object-cover"
              />
              <figcaption className="mt-3">
                <span className="block font-display text-lg text-forest">Saw cutting & removal</span>
                <span className="mt-1 block text-sm leading-relaxed text-charcoal/70">
                  Real field documentation — failed pavement cut out clean
                  before the patch.
                </span>
              </figcaption>
            </figure>
            {/* Client-supplied curb photograph — portrait 3:4 crop keeps
                the long black curb the obvious subject */}
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/services/asphalt-curb-installation-640.avif"
                srcSet="/images/services/asphalt-curb-installation-640.avif 640w, /images/services/asphalt-curb-installation-960.avif 960w"
                sizes="(max-width: 768px) 100vw, 440px"
                alt="Freshly installed black asphalt curb running along the edge of a pavement, with turf alongside"
                width={1000}
                height={1333}
                loading="lazy"
                decoding="async"
                className="aspect-[3/4] w-full object-cover"
              />
              <figcaption className="mt-3">
                <span className="block font-display text-lg text-forest">Asphalt curbing</span>
                <span className="mt-1 block text-sm leading-relaxed text-charcoal/70">
                  A newly installed black asphalt curb along the pavement
                  edge — real field documentation.
                </span>
              </figcaption>
            </figure>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/services/asphalt-crack-repair-800.avif"
                srcSet="/images/services/asphalt-crack-repair-800.avif 800w, /images/services/asphalt-crack-repair-1200.avif 1200w"
                sizes="(max-width: 768px) 100vw, 440px"
                alt="Hot-pour crack sealing being applied to a cracked commercial parking lot"
                width={1400}
                height={1050}
                loading="lazy"
                decoding="async"
                className="aspect-[3/4] w-full object-cover"
              />
              <figcaption className="mt-3">
                <span className="block font-display text-lg text-forest">Crack repair</span>
                <span className="mt-1 block text-sm leading-relaxed text-charcoal/70">
                  Hot-pour sealant keeps water out of the base — the repair
                  that prevents the next pothole.
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* RESTORATION / RECONSTRUCTION — the portrait paver photograph in a
          vertical editorial position (client direction: never force it
          into a wide crop) */}
      <section aria-labelledby="asphalt-restoration-heading" className="py-16 md:py-24">
        <div className="container-site">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <figure className="lg:col-span-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/services/asphalt-paver-machine.avif"
                alt="Asphalt paver machine on a freshly prepared roadbed during a repaving project"
                width={1100}
                height={1375}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="mt-3 text-sm leading-relaxed text-charcoal/70">
                Paving equipment staged for a repaving project.
              </figcaption>
            </figure>
            <div className="lg:col-span-7">
              <p className="eyebrow">Levels three & four — restoration & reconstruction</p>
              <h2
                id="asphalt-restoration-heading"
                className="mt-2 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest"
              >
                When the surface — or the base — has to go
              </h2>
              <p className="mt-4 max-w-2xl leading-[1.7] text-charcoal/90">
                Tired pavement with a sound base gets milled and overlaid.
                <span className="max-md:hidden">
                  {" "}Pavement that has failed through gets reclaimed and
                  rebuilt from the base up.{" "}
                </span>
                You get the recommendation — and the reason — in writing
                before anything is scheduled.
              </p>
              <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-display text-lg text-forest">Restoration</h3>
                  <ul className="mt-3 space-y-2 text-charcoal/90">
                    {[
                      "Milling",
                      "Overlays",
                      "Parking-lot restoration",
                      "Drive-lane restoration",
                      "Access-road restoration",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <span className="h-2 w-2 shrink-0 bg-forest" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-lg text-forest">Reconstruction</h3>
                  <ul className="mt-3 space-y-2 text-charcoal/90">
                    {[
                      "Reclaiming / full-depth reclamation",
                      "Base reconstruction",
                      "New asphalt paving",
                      "Full parking-lot rehabilitation",
                      "Curb replacement where applicable",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <span className="h-2 w-2 shrink-0 bg-forest" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMERCIAL EXECUTION — the real crew/equipment field photograph
          carries the operational positioning: authenticity over polish */}
      <section aria-labelledby="asphalt-execution-heading" className="bg-white py-16 md:py-24">
        <div className="container-site">
          <div className="max-w-2xl">
            <p className="eyebrow">How the work runs</p>
            <h2
              id="asphalt-execution-heading"
              className="mt-2 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] text-forest"
            >
              Occupied properties stay open
            </h2>
            <p className="mt-4 leading-[1.7] text-charcoal/90">
              <span className="max-md:hidden">
                Pavement work touches safety, drainage, and how vehicles and
                people move through your property — and it happens while your
                tenants are still there.{" "}
              </span>
              Scope, phasing, and traffic handling are defined before the
              crew arrives, progress is photographed, and the finished
              surface is inspected against the agreed scope.
            </p>
          </div>
          <figure className="mt-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/services/asphalt-crew-equipment.avif"
              alt="Terravian crew with truck and pavement equipment working in front of an occupied commercial building"
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
              className="aspect-[16/9] w-full object-cover"
            />
            <figcaption className="mt-3">
              <span className="block font-display text-lg text-forest">Real field execution</span>
              <span className="mt-1 block max-w-2xl text-sm leading-relaxed text-charcoal/70">
                Crew and equipment at an occupied commercial property —
                defined scope, scheduled phases, documented progress.
              </span>
            </figcaption>
          </figure>
          <ul className="mt-8 grid gap-2.5 border-t-2 border-forest pt-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Striping & pavement markings",
              "ADA-related pavement improvements where applicable",
              "Curb & interface work",
              "Final site cleanup",
              "Walkthrough & care plan",
              "Photo documentation at every phase",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-charcoal/90">
                <span className="h-2 w-2 shrink-0 bg-forest" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
