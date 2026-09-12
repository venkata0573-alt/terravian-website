import type { ServiceDetail } from "@/types/content";
import type { ProjectImage, ServiceSlug } from "@/types/project";

/**
 * SERVICE DETAIL CONTENT — powers the eight mandated sections on each
 * /services/[service] page. Copy is original per service and stays inside
 * the verified-facts rules:
 *   - capabilities come only from the brief's service definitions
 *   - no pricing, no response-time promises, no invented guarantees
 *   - materials are named generically (hardscape) and confirmed per project
 *   - ™ appears on the first mention of a program name on each page
 *
 * Gallery images: commercial-landscaping uses real client-supplied field
 * photography; snow, hardscape, and asphalt remain labeled placeholders
 * until real photography is supplied and approved.
 */

const galleryImg = (
  kind: ProjectImage["kind"],
  alt: string,
  caption: string,
): ProjectImage => ({
  // REPLACE: placeholder asset — swap for approved Terravian service photo
  src: `/images/placeholders/portfolio-${kind}-placeholder.webp`,
  alt,
  caption,
  kind,
  width: 800,
  height: 600,
});

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "commercial-landscaping",
    industryIds: ["hotels-hospitality", "retail-commercial", "property-management"],
    processIntro:
      "Landscape projects follow the same documented method as every Terravian service — adapted here for design-and-install work:",
    processSteps: [
      {
        title: "Walkthrough & site measurement",
        text: "We walk the property with you, document existing conditions with photos, and take the measurements the design will be built on.",
      },
      {
        title: "Concept & recommendations",
        text: "You receive a concept with clear recommendations — what we propose, where, and why — written for decision-makers, not designers.",
      },
      {
        title: "Proposal with defined scope",
        text: "The proposal defines scope, plantings, and scheduling before any work is priced into a contract. Specific plant and material selections are confirmed per project.",
      },
      {
        title: "Scheduled installation",
        text: "Installation is scheduled around your property's operations, with phasing agreed in advance so tenants, guests, and traffic are accounted for.",
      },
      {
        title: "Photo documentation & inspection",
        text: "Progress and completion are documented with photos, and the finished work is inspected against the agreed scope.",
      },
      {
        title: "Final walkthrough & ongoing care plan",
        text: "We walk the finished site with you and outline the ongoing care plan — most installation clients continue into a grounds-maintenance program.",
      },
    ],
    gallery: [
      {
        // Real Terravian field photography (client-supplied, licensed)
        src: "/images/placeholders/land-field-weeds.avif",
        alt: "Planting bed overgrown with weeds and scattered with stones along a commercial parking lot",
        caption: "Before — weeds and stones taking over the bed",
        kind: "before",
        width: 1200,
        height: 900,
      },
      {
        src: "/images/placeholders/land-field-bed-prep.avif",
        alt: "The same bed cleared of weeds and stones, stripped and graded to bare soil",
        caption: "Cleaned and prepared — weeds and stones cleared, bed stripped and graded",
        kind: "progress",
        width: 1200,
        height: 900,
      },
      {
        src: "/images/placeholders/land-field-sod.avif",
        alt: "Crew installing fresh sod on a sloped lawn at a commercial property",
        caption: "Final — new sod installed and fitted on the entrance lawn",
        kind: "after",
        width: 1200,
        height: 900,
      },
    ],
    galleryNote:
      "Real Terravian field photography from recent commercial landscaping and grounds work.",
    faqs: [
      {
        question: "Do you handle both design and installation?",
        answer:
          "Yes. Design, installation, plantings, and property enhancements are one service line, so the crew that installs your project works from the plan we built with you — nothing is lost between a designer and a contractor.",
      },
      {
        question: "Can installation happen while our property is occupied?",
        answer:
          "Yes. Phasing is planned around your tenants, guests, and traffic patterns before work begins, and the agreed phasing is part of the proposal you approve.",
      },
      {
        question: "How are plants and materials selected?",
        answer:
          "Selections are made for your site's specific conditions — light, soil, drainage, and use — and the specific plant and material list is confirmed in your proposal before installation. We don't specify products sight unseen.",
      },
      {
        question: "What documentation do we receive?",
        answer:
          "Projects are photo-documented from existing conditions through completion, and finished work is inspected against the agreed scope. You receive documentation you can forward to ownership or stakeholders without editing.",
      },
      {
        question: "Do you maintain what you install?",
        answer:
          "Yes — most installation clients continue into a lawn & grounds maintenance program, so the standard the property was built to is the standard it is kept at.",
      },
    ],
  },
  {
    slug: "snow-ice-management",
    industryIds: ["property-management", "industrial-mixed-use", "retail-commercial", "hoa-condominium"],
    processIntro:
      "Winter service is an operations program, not a reaction. Our storm cycle is planned before the season and documented through every event:",
    processSteps: [
      {
        title: "Pre-season site plan",
        text: "Before winter, your property is walked and mapped: plow routes, sidewalk scope, snow storage areas, and priority zones are defined in your storm plan.",
      },
      {
        title: "Weather monitoring & staging",
        text: "Incoming events are monitored and equipment is staged according to your plan, so the response starts from preparation rather than improvisation.",
      },
      {
        title: "Plowing & sidewalk clearing",
        text: "During the event, lots and sidewalks are serviced per the scope and sequence defined in your agreement.",
      },
      {
        title: "Salting & deicing",
        text: "Deicing follows the treatment plan for your surfaces and traffic patterns, with applications documented.",
      },
      {
        title: "Conditions documentation",
        text: "Site conditions and completed service are documented — a record of what was done and when, which is what matters when a slip-and-fall claim arrives months later.",
      },
      {
        title: "Post-storm inspection & client updates",
        text: "After the event, the property is inspected and you receive an update on what was done and any conditions that need attention.",
      },
    ],
    gallery: [
      galleryImg(
        "before",
        "Coming soon — Terravian winter operations photography",
        "Coming soon: property conditions during a winter event",
      ),
      galleryImg(
        "progress",
        "Coming soon — Terravian snow operations photography",
        "Coming soon: snow & ice operations in progress",
      ),
      galleryImg(
        "after",
        "Coming soon — cleared property after Terravian service",
        "Coming soon: cleared and treated property after service",
      ),
    ],
    galleryNote:
      "Real Terravian winter operations photography is on the way — these slots are marked coming soon until it publishes.",
    faqs: [
      {
        question: "How is our property handled during a storm?",
        answer:
          "According to your storm plan: plow routes, sidewalk scope, priority zones, and treatment plans are defined before winter, and each event is executed against that plan rather than figured out at 3 a.m.",
      },
      {
        question: "Do you guarantee response times?",
        answer:
          "We do not advertise response-time guarantees. What we commit to is a defined storm plan, staged equipment, documented service, and communication through every event — the terms of your service are defined in your agreement.",
      },
      {
        question: "What documentation do we receive after an event?",
        answer:
          "Conditions and completed service are documented per event. The purpose is a record of conditions and work performed — documentation of conditions, not promises of outcomes — which is exactly what a liability defense file needs.",
      },
      {
        question: "Are sidewalks included in snow service?",
        answer:
          "Sidewalk clearing is part of the scope you define in your agreement. Which walks, which priority, and which treatment are all specified per property before the season.",
      },
      {
        question: "How do we reach you during a storm?",
        answer:
          "Through the 24/7 Direct Line program — a defined channel for storm events, so you are never leaving a voicemail into the void while it is snowing.",
      },
    ],
  },
  {
    slug: "hardscape-design",
    industryIds: ["retail-commercial", "hotels-hospitality", "industrial-mixed-use"],
    processIntro:
      "Hardscape is project work: measured, designed, built, and walked through. Our process adapts the ten-step method for construction:",
    processSteps: [
      {
        title: "Site measurement",
        text: "The project area is measured and documented — grades, drainage, existing structures, and the conditions the build has to respect.",
      },
      {
        title: "Concept & materials consultation",
        text: "You review a concept with materials guidance. We work in pavers, natural stone, and block; the specific materials for your project are confirmed per project before anything is ordered.",
      },
      {
        title: "Proposal with defined scope",
        text: "The proposal defines the full scope — surfaces, walls, drainage work, and edging — so the number you approve matches the work that gets built.",
      },
      {
        title: "Installation",
        text: "The build is executed to the agreed plan, with base preparation and drainage handled as part of the scope, not as surprises.",
      },
      {
        title: "Quality inspection",
        text: "Finished work is inspected against the scope — lines, levels, drainage, and finish — before we call it complete.",
      },
      {
        title: "Final walkthrough & care plan",
        text: "We walk the finished project with you and outline the care plan, so the work holds up the way it was built to.",
      },
    ],
    gallery: [
      galleryImg(
        "before",
        "Coming soon — site conditions before a Terravian hardscape project",
        "Coming soon: site conditions before hardscape construction",
      ),
      galleryImg(
        "progress",
        "Coming soon — Terravian hardscape construction photography",
        "Coming soon: hardscape installation in progress",
      ),
      galleryImg(
        "after",
        "Coming soon — completed Terravian hardscape project photography",
        "Coming soon: completed hardscape project",
      ),
    ],
    galleryNote:
      "Real Terravian hardscape project photography is on the way — these slots are marked coming soon until it publishes.",
    faqs: [
      {
        question: "What materials do you work with?",
        answer:
          "Pavers, natural stone, and block are our standard material families. The specific materials, colors, and finishes for your project are confirmed per project during the concept phase — we don't substitute materials after approval.",
      },
      {
        question: "Do you handle drainage as part of hardscape work?",
        answer:
          "Yes. Drainage is assessed during site measurement and planned before installation. Water management is part of the scope, because hardscape that ignores drainage fails early.",
      },
      {
        question: "Do you design and install fire pits and fire features?",
        answer:
          "Yes — fire pits, fire circles, and outdoor fireplaces are designed as part of the patio plan, not dropped in afterward. Fuel choice (gas or wood), clearances, seating radius, and lighting are settled during the concept phase, so the fire fits the space and the way you'll use it.",
      },
      {
        question: "How long does a hardscape project take?",
        answer:
          "The timeline is defined per project in your proposal, based on scope, site conditions, and phasing. You approve the schedule along with the scope — we don't quote durations before measuring the site.",
      },
      {
        question: "Can a project be phased?",
        answer:
          "Yes. Larger projects can be phased across seasons or budget cycles, with each phase scoped and documented separately.",
      },
      {
        question: "Is a final walkthrough included?",
        answer:
          "Always. Every project closes with a final walkthrough and a care plan, so you know exactly what was built and how to keep it that way.",
      },
    ],
  },
  {
    slug: "asphalt-pavement",
    industryIds: [
      "hotels-hospitality",
      "property-management",
      "hoa-condominium",
      "retail-commercial",
      "industrial-mixed-use",
    ],
    processIntro:
      "Pavement projects follow the same documented method as every Terravian service — adapted here for asphalt work:",
    processSteps: [
      {
        title: "Walkthrough & condition survey",
        text: "We walk the lot or roadway with you, photograph cracking, settlement, and drainage problems, and measure the areas the scope will be built on.",
      },
      {
        title: "Recommendations & options",
        text: "You receive clear recommendations — repair, resurface, or reconstruct, and why — written for decision-makers, with options where more than one approach fits.",
      },
      {
        title: "Proposal with defined scope",
        text: "The proposal defines scope, phasing, and traffic handling before any work is scheduled, so tenants, guests, and deliveries are accounted for in advance.",
      },
      {
        title: "Scheduled work around your traffic",
        text: "Work is phased to keep entrances and access open, with the agreed phasing communicated before the crew arrives.",
      },
      {
        title: "Photo documentation & inspection",
        text: "Progress and completion are documented with photos, and the finished pavement is inspected against the agreed scope.",
      },
      {
        title: "Final walkthrough & maintenance plan",
        text: "We walk the finished surface with you and outline the care plan — crack sealing and sealcoating intervals that protect the investment.",
      },
    ],
    gallery: [
      {
        // Client asset Image 5 — real Terravian field documentation
        src: "/images/services/asphalt-saw-cutting.avif",
        alt: "Terravian crew member saw-cutting a damaged pavement area for removal at a commercial property",
        caption: "Repair — failed pavement saw-cut for removal and patching",
        kind: "before",
        width: 1000,
        height: 1333,
      },
      {
        // Client asset Image 4 — sealcoating marketing image
        src: "/images/services/asphalt-sealcoating-crew.avif",
        alt: "Crew squeegeeing fresh sealcoat across a commercial parking lot",
        caption: "Maintenance — sealcoating a commercial lot",
        kind: "progress",
        width: 1400,
        height: 1050,
      },
      {
        // Client asset Image 6 — real crew/equipment at an occupied property
        src: "/images/services/asphalt-crew-equipment.avif",
        alt: "Terravian crew with truck and pavement equipment working in front of an occupied commercial building",
        caption: "Execution — crew and equipment at an occupied property",
        kind: "after",
        width: 1600,
        height: 900,
      },
    ],
    galleryNote:
      "Terravian asphalt and pavement photography from real field work and commercial projects.",
    faqs: [
      {
        question: "Do you handle both repairs and full repaving?",
        answer:
          "Yes. Patching, crack sealing, and sealcoating are scoped with the same documentation as larger paving work, and the recommendation you receive explains which approach fits the condition of your pavement — and why.",
      },
      {
        question: "Can work happen while our property stays open?",
        answer:
          "Yes. Phasing and traffic handling are planned before work begins, so entrances, parking, and deliveries stay accounted for. The agreed phasing is part of the proposal you approve.",
      },
      {
        question: "Do you re-stripe lots after paving or sealcoating?",
        answer:
          "Yes — line striping is part of the scope where the surface work calls for it, and the layout is confirmed with you before painting.",
      },
      {
        question: "What about drainage problems like pooling water?",
        answer:
          "Drainage is assessed during the condition survey. Catch-basin and drainage repair are part of this division, and water problems are addressed in the scope rather than paved over.",
      },
      {
        question: "What documentation do we receive?",
        answer:
          "Work is photo-documented from existing conditions through completion, and finished pavement is inspected against the agreed scope. You receive documentation you can forward to ownership or stakeholders without editing.",
      },
    ],
  },
];

export const serviceDetailBySlug = (slug: ServiceSlug): ServiceDetail | undefined =>
  serviceDetails.find((d) => d.slug === slug);
