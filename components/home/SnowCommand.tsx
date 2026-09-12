import { ProgramExplainer } from "@/components/ui/ProgramExplainer";

/**
 * Snow Command — dark-themed winter operations section (charcoal band,
 * off-white text at 15.93:1 contrast). Eight operational stages.
 * No response-time promises anywhere — per verified-facts rules.
 */
const stages = [
  { n: 1, title: "Pre-storm planning", text: "Routes, priority zones, and client communication confirmed before forecasted events." },
  { n: 2, title: "Weather monitoring", text: "Forecasts tracked so crews mobilize on the storm's schedule, not after the calls come in." },
  { n: 3, title: "Equipment staging", text: "Plows, spreaders, and sidewalk equipment positioned ahead of the event." },
  { n: 4, title: "Plowing", text: "Lots and drives cleared per the property's zone map." },
  { n: 5, title: "Sidewalk clearing", text: "Walkways and entrances cleared for safe pedestrian access." },
  { n: 6, title: "Deicing", text: "Salting and deicing applied to treated areas per the agreed scope." },
  { n: 7, title: "Post-storm inspection", text: "Conditions checked after the event, with photo documentation of the cleared site." },
  { n: 8, title: "Client updates", text: "Communication before, during, and after the storm — you are never guessing." },
];

export function SnowCommand() {
  return (
    <div>
      <ol className="grid gap-px border border-cream/15 bg-cream/15 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((s) => (
          // Mobile: compact horizontal rows (number rail + copy) so eight
          // stages stay scannable on a phone. sm+: the original card grid.
          <li key={s.n} className="flex items-start gap-4 bg-charcoal/85 p-4 sm:block sm:p-6">
            <p
              className="mt-0.5 w-7 shrink-0 font-display text-xl font-semibold text-tint sm:mt-0 sm:w-auto sm:text-3xl"
              aria-hidden="true"
            >
              {String(s.n).padStart(2, "0")}
            </p>
            <div>
              <h3 className="text-base text-cream sm:mt-3 sm:text-lg">{s.title}</h3>
              <p className="mt-1 text-[0.8125rem] leading-snug text-cream/85 sm:mt-2 sm:text-sm sm:leading-relaxed">
                {s.text}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-6 md:mt-10 lg:grid-cols-2">
        <ProgramExplainer programId="pre-storm-protocol" firstUse onDark />
        <ProgramExplainer programId="direct-line" firstUse onDark />
      </div>
    </div>
  );
}
