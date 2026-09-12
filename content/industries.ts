import type { Industry } from "@/types/content";

/**
 * Industries served — from the client brief. Framing follows the audience
 * positioning: these buyers purchase reliability, documentation, and
 * liability reduction.
 */
export const industries: Industry[] = [
  {
    id: "hotels-hospitality",
    name: "Hotels & Hospitality",
    problem: "Guests judge the property before they reach the front desk.",
    answer:
      "Grounds kept to a documented standard in every season, with photo records your team can pull up when ownership asks.",
    relevantServiceSlugs: ["commercial-landscaping", "snow-ice-management", "asphalt-pavement"],
  },
  {
    id: "property-management",
    name: "Property Management Companies",
    problem: "One vendor conversation should not require five follow-ups.",
    answer:
      "A single year-round partner with a direct line, scheduled reporting, and documentation delivered without being chased.",
    relevantServiceSlugs: ["commercial-landscaping", "snow-ice-management", "asphalt-pavement"],
  },
  {
    id: "hoa-condominium",
    name: "HOAs & Condominium Boards",
    problem: "Boards answer to residents, and residents notice everything.",
    answer:
      "Scheduled maintenance, visible crew discipline, and reporting that gives boards something concrete to present.",
    relevantServiceSlugs: ["commercial-landscaping", "snow-ice-management", "asphalt-pavement"],
  },
  {
    id: "retail-commercial",
    name: "Retail & Commercial Buildings",
    problem: "Curb appeal is leased space's first showing.",
    answer:
      "Grounds and hardscape maintained to keep the property show-ready, with seasonal programs planned around your calendar.",
    relevantServiceSlugs: ["commercial-landscaping", "hardscape-design", "snow-ice-management", "asphalt-pavement"],
  },
  {
    id: "industrial-mixed-use",
    name: "Industrial & Mixed-Use Properties",
    problem: "Large sites need coverage that doesn't skip the far corners.",
    answer:
      "Route-based maintenance and winter operations with defined scope per zone, so every acre is accounted for.",
    relevantServiceSlugs: ["commercial-landscaping", "snow-ice-management", "hardscape-design", "asphalt-pavement"],
  },
];
