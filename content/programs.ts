import type { Program } from "@/types/content";

/**
 * Terravian proprietary programs.
 * RULE: use `nameTrademarked` (with ™) on first use within a page, then the
 * plain `name`. Explainer copy below is a STRUCTURAL DRAFT — each block
 * requires Terravian approval before launch (see completion report).
 */
export const programs: Program[] = [
  {
    id: "property-intelligence-report",
    nameTrademarked: "Property Intelligence Report™",
    name: "Property Intelligence Report",
    summary: "A documented record of your property's condition and the work performed on it.",
    detail:
      "After service visits, conditions and completed work are recorded with photos and notes, so you always have a current, factual picture of your grounds — not a verbal summary.",
  },
  {
    id: "pre-storm-protocol",
    nameTrademarked: "Pre-Storm Protocol™",
    name: "Pre-Storm Protocol",
    summary: "Winter storms are planned before the first flake, not improvised during them.",
    detail:
      "Before forecasted events, routes are confirmed, equipment is staged, and your property's priority zones are reviewed. You receive communication before, during, and after the storm.",
  },
  {
    id: "proactive-property-scan",
    nameTrademarked: "Proactive Property Scan™",
    name: "Proactive Property Scan",
    summary: "Issues are flagged before they become work orders you didn't budget for.",
    detail:
      "Crews are trained to spot and report developing problems — drainage, turf decline, damaged edging, trip hazards — while on site for regular service.",
  },
  {
    id: "direct-line",
    nameTrademarked: "24/7 Direct Line™",
    name: "24/7 Direct Line",
    summary: "You reach the people responsible for your property, not a voicemail tree.",
    detail:
      "Active clients get a direct contact path for urgent property issues, including storm events. What this line covers and how it is staffed is confirmed in your service agreement.",
  },
  {
    id: "portfolio-command-dashboard",
    nameTrademarked: "Portfolio Command Dashboard™",
    name: "Portfolio Command Dashboard",
    summary: "Multi-property managers see every site, every visit, one place.",
    detail:
      "For clients with several properties under management, service records and documentation are organized per site so portfolio-level oversight doesn't require chasing emails.",
  },
  {
    id: "accountability-guarantee",
    nameTrademarked: "Accountability Guarantee™",
    name: "Accountability Guarantee",
    summary: "If something we own isn't right, we come back and make it right.",
    detail:
      "Work that falls short of the agreed scope is corrected. The specific terms of this commitment are defined in each client's service agreement.",
  },
];
