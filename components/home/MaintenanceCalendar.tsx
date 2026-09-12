/**
 * Year-round maintenance calendar: 12 months × 5 service-division rows.
 * Real <table> semantics underneath; light-green tint bands per brand.
 * Cell content describes TYPICAL SEASONAL ACTIVITY — generic seasonal
 * facts, not service promises.
 */
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type Activity = "active" | "peak" | "planning" | "off";

const rows: { division: string; cells: Activity[]; legend: Record<Activity, string> }[] = [
  {
    division: "Snow & Ice",
    cells: ["peak", "peak", "active", "off", "off", "off", "off", "off", "off", "planning", "active", "peak"],
    legend: { peak: "Storm operations", active: "Season start / wind-down", planning: "Pre-season planning", off: "—" },
  },
  {
    division: "Grounds Maintenance",
    cells: ["off", "off", "planning", "active", "peak", "peak", "peak", "peak", "peak", "active", "planning", "off"],
    legend: { peak: "Weekly service", active: "Season open / close", planning: "Route scheduling", off: "—" },
  },
  {
    division: "Seasonal Enhancements",
    cells: ["off", "off", "active", "peak", "active", "off", "off", "off", "active", "peak", "active", "off"],
    legend: { peak: "Spring / fall programs", active: "Changeover windows", planning: "—", off: "—" },
  },
  {
    division: "Landscaping & Hardscape",
    cells: ["planning", "planning", "active", "peak", "peak", "peak", "peak", "peak", "peak", "active", "planning", "planning"],
    legend: { peak: "Installations", active: "Project windows", planning: "Design & proposals", off: "—" },
  },
  {
    division: "Asphalt & Pavement",
    cells: ["off", "off", "planning", "active", "peak", "peak", "peak", "peak", "peak", "active", "planning", "off"],
    legend: { peak: "Paving & sealcoating season", active: "Project windows", planning: "Estimates & scheduling", off: "—" },
  },
];

const cellStyle: Record<Activity, string> = {
  peak: "bg-forest text-cream",
  active: "bg-tint text-charcoal",
  planning: "bg-cream text-charcoal/70",
  off: "bg-white text-charcoal/40",
};

export function MaintenanceCalendar() {
  return (
    <div>
      {/* Mobile cue: the year continues past the screen edge. */}
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-charcoal/55 md:hidden">
        Swipe sideways for the full year →
      </p>
    <div className="relative overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse bg-white text-sm">
        <caption className="sr-only">
          Year-round maintenance calendar showing typical seasonal activity for
          snow and ice, grounds maintenance, seasonal enhancements,
          landscaping and hardscape, and asphalt and pavement across the
          twelve months.
        </caption>
        <thead>
          <tr className="bg-forest text-cream">
            <th scope="col" className="sticky left-0 z-10 bg-forest px-3 py-2.5 text-left font-semibold">
              Division
            </th>
            {months.map((m) => (
              <th key={m} scope="col" className="px-2 py-2.5 text-center font-semibold">
                {m}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.division} className="border-t border-charcoal/10">
              <th scope="row" className="sticky left-0 z-10 whitespace-nowrap bg-white px-3 py-2 text-left font-semibold text-charcoal shadow-[1px_0_0_0_rgba(28,28,28,0.1)]">
                {row.division}
              </th>
              {row.cells.map((cell, i) => (
                <td key={months[i]} className={`px-1 py-1 text-center ${cellStyle[cell]}`}>
                  <span className="sr-only">{row.legend[cell]}</span>
                  <span aria-hidden="true" className="block h-8" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <li className="flex items-center gap-2"><span className="h-4 w-8 bg-forest" aria-hidden="true" /> Peak activity</li>
        <li className="flex items-center gap-2"><span className="h-4 w-8 bg-tint" aria-hidden="true" /> Active window</li>
        <li className="flex items-center gap-2"><span className="h-4 w-8 border border-charcoal/20 bg-cream" aria-hidden="true" /> Planning period</li>
      </ul>
      <p className="mt-3 text-sm text-charcoal/75">
        Typical seasonal rhythm for Connecticut commercial properties. Your
        property&apos;s exact schedule is defined in its service agreement.
      </p>
    </div>
    </div>
  );
}
