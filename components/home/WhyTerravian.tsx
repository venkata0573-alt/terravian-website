import { programs } from "@/content/programs";
import { CheckIcon } from "@/components/ui/icons";

/**
 * Why Terravian — the six proprietary programs as differentiators.
 * ™ appears on first use here for programs not already introduced earlier
 * on the page (Snow Command introduces Pre-Storm Protocol™ and
 * 24/7 Direct Line™). No statistics, awards, or certifications — per
 * verified-facts rules.
 */
const firstUseOnHomepage = new Set([
  "property-intelligence-report",
  "proactive-property-scan",
  "portfolio-command-dashboard",
  "accountability-guarantee",
]);

export function WhyTerravian() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {programs.map((p) => (
        <li key={p.id} className="border border-charcoal/10 p-6">
          <h3 className="flex items-start gap-3 text-lg leading-snug">
            <span className="mt-0.5 shrink-0 text-forest">
              <CheckIcon size={20} />
            </span>
            {firstUseOnHomepage.has(p.id) ? p.nameTrademarked : p.name}
          </h3>
          <p className="mt-3 leading-relaxed text-charcoal/90">{p.summary}</p>
        </li>
      ))}
    </ul>
  );
}
