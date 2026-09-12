import type { Service } from "@/types/content";
import type { ServiceSlug } from "@/types/project";

/**
 * The four Terravian service divisions (client direction: commercial
 * landscaping, lawn & grounds maintenance, and seasonal property
 * enhancements are ONE service — presented together so the offering
 * stays clean). Scope wording comes from the client brief — do not add
 * capabilities beyond this list without approval.
 */
export const services: Service[] = [
  {
    slug: "commercial-landscaping",
    name: "Landscape & Maintenance",
    shortName: "Landscaping",
    tagline:
      "Design, installation, plantings, scheduled grounds maintenance, and seasonal enhancements — under one company.",
    intro:
      "One accountable program for everything green on your property: landscape design and installation, scheduled mowing and bed care, and seasonal cleanups, mulch, and color — planned together, delivered by the same dedicated team.",
    capabilities: [
      "Landscape design",
      "Installation",
      "Plantings",
      "Mowing, trimming & edging",
      "Weed control & pruning",
      "Spring & fall cleanups",
      "Mulching",
      "Seasonal color",
    ],
    whoItsFor:
      "HOAs, office and retail property managers, hotels, and any commercial site that wants design, installation, and documented upkeep from one partner instead of three vendors.",
  },
  {
    slug: "snow-ice-management",
    name: "Snow & Ice Management",
    shortName: "Snow & Ice",
    tagline: "Plowing, sidewalk clearing, salting and deicing, snow hauling, and 24/7 storm response.",
    intro:
      "Winter operations run like an operations program: planned before the storm, documented during it, and inspected after it.",
    capabilities: [
      "Plowing",
      "Sidewalk clearing",
      "Salting and deicing",
      "Snow hauling",
      "24/7 storm response",
    ],
    whoItsFor:
      "Commercial properties where a slippery lot or an undocumented sidewalk is a liability, not an inconvenience.",
  },
  {
    slug: "hardscape-design",
    name: "Patio & Hardscape Design-Build",
    shortName: "Hardscape",
    tagline: "Patios, fire pits, walkways, retaining walls, masonry, edging, and drainage.",
    intro:
      "Hardscape projects managed from site measurement through final walkthrough, with materials and drainage planned before the first stone is set.",
    capabilities: [
      "Walkways",
      "Patios",
      "Retaining walls",
      "Fire pits",
      "Masonry",
      "Edging",
      "Drainage",
    ],
    whoItsFor:
      "Properties adding usable outdoor space, correcting grade and drainage problems, or replacing failing walkways and walls.",
  },
  {
    slug: "asphalt-pavement",
    name: "Asphalt & Pavement Services",
    shortName: "Asphalt & Pavement",
    tagline:
      "Asphalt paving, patching and repair, crack sealing, sealcoating, line striping, and catch-basin and drainage repair.",
    intro:
      "Pavement work planned and documented like every other Terravian division: walked and photographed first, scoped in writing, scheduled around your traffic, and inspected against the agreed scope.",
    capabilities: [
      "Asphalt paving",
      "Patching & repair",
      "Crack sealing",
      "Sealcoating",
      "Line striping",
      "Catch-basin & drainage repair",
    ],
    whoItsFor:
      "Commercial properties where cracked, faded, or pooling pavement is a liability and a first impression — HOAs, retail and office sites, industrial lots, and property managers who want one accountable partner for the whole property.",
  },
];

export const serviceBySlug = (slug: ServiceSlug): Service =>
  services.find((s) => s.slug === slug) ?? services[0];
