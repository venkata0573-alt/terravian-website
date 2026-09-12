import { MaintenanceCalendar } from "@/components/home/MaintenanceCalendar";

/**
 * Year-round coverage — the predictability anchor. Heading and intro sit
 * beside a real winter-operations photograph (asymmetric editorial pair);
 * the 12-month × 5-division calendar table below is the actual proof.
 * MaintenanceCalendar is unchanged: real table semantics, sticky first
 * column, mobile swipe cue.
 */
export function YearRound() {
  return (
    <section aria-labelledby="calendar-heading" className="py-16 md:py-24">
      <div className="container-site">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {/* Heading removed per client direction — the eyebrow now
                carries the section label (referenced by aria-labelledby). */}
            <p id="calendar-heading" className="eyebrow">Year-round coverage</p>
            <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.6] text-charcoal/80">
              We add color in the spring, implement property improvements
              throughout the summer, complete fall cleanups, and manage snow
              and ice throughout the winter.
            </p>
          </div>
          <div className="lg:col-span-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/how-we-work/snow-loader-pusher.webp"
              alt="A wheel loader with a snow pusher stacking snow in a cleared commercial lot"
              width={1448}
              height={1086}
              loading="lazy"
              decoding="async"
              className="aspect-[3/2] w-full object-cover"
            />
            <p className="mt-2 text-sm text-charcoal/60">
              Winter operations, staged before the storm — not during it.
            </p>
          </div>
        </div>
        <div className="mt-10 md:mt-12">
          <MaintenanceCalendar />
        </div>
      </div>
    </section>
  );
}
