import type { Project, ProjectImage } from "@/types/project";

/**
 * PORTFOLIO DATA — structured project objects, CMS-migratable.
 *
 * ⚠ DEMONSTRATION CONTENT ONLY. Every project below is a layout
 * demonstration with `isDemonstration: true`. These are NOT completed
 * Terravian projects. They exist to prove the gallery, filters, lightbox,
 * and detail template. Replace with real, client-approved Terravian case
 * studies (photos + written permission) before launch — see completion
 * report for the full asset list.
 *
 * Placeholder images: /public/images/placeholders/
 *   REPLACE WITH: real Terravian project photography (before / progress /
 *   after) supplied by the client.
 */

const img = (
  kind: ProjectImage["kind"],
  alt: string,
  caption: string,
): ProjectImage => ({
  // REPLACE: placeholder asset — swap for approved Terravian project photo
  src: `/images/placeholders/portfolio-${kind}-placeholder.webp`,
  alt,
  caption,
  kind,
  width: 800,
  height: 600,
});

const DEMO_NOTE = "Demonstration project — not a completed Terravian project.";

export const projects: Project[] = [
  {
    slug: "hotel-entry-landscape-renovation",
    title: "Hotel Entry Landscape Renovation",
    location: "Connecticut (demonstration location)",
    propertyType: "hotel-hospitality",
    services: ["commercial-landscaping"],
    clientObjective: `[Demo copy] A hotel arrival area renovated for a first impression that matches the property inside. ${DEMO_NOTE}`,
    initialCondition: `[Demo copy] An outdated entry planting bed and a front lawn thin with weeds at the arrival approach. ${DEMO_NOTE}`,
    recommendedSolution: `[Demo copy] Entry renovation: clearing, new plantings, fresh edging and mulch, and a seasonal color rotation. ${DEMO_NOTE}`,
    designProcess: ["[Demo] Site walkthrough", "[Demo] Concept plan", "[Demo] Planting plan approval", "[Demo] Installation"],
    servicesProvided: ["Landscape design", "Installation", "Plantings", "Mulching", "Seasonal color"],
    materialsUsed: ["[Demo] Plant material per approved plan", "[Demo] Mulch", "[Demo] Steel edging"],
    timeline: "[Demo] Timeline publishes with approved project details",
    beforeImages: [
      {
        // Real client-supplied field photo — front lawn, May 2026 (color-graded only)
        src: "/images/portfolio/hotel/hotel-before-front-lawn.avif",
        alt: "Hotel front lawn in May before renovation — turf overgrown with dandelions and clover",
        caption: "Front lawn before renovation — May 2026",
        kind: "before",
        width: 2400,
        height: 1800,
      },
    ],
    progressImages: [
      {
        // Real client-supplied field photo — parking-lot islands at spring cleanup, April 2026
        src: "/images/portfolio/hotel/hotel-spring-island-beds.avif",
        alt: "Hotel parking-lot islands in April with beds cleared, shrubs cut back, and spring bulbs emerging ahead of mulching",
        caption: "Parking-lot islands cleared for the season — April 2026",
        kind: "progress",
        width: 2400,
        height: 1800,
      },
      {
        // Real client-supplied field photo — crew installing fresh mulch at the entry, April 2026
        src: "/images/portfolio/hotel/hotel-spring-mulch-crew.avif",
        alt: "Crew member walking past a freshly mulched tree ring at the hotel entry in April",
        caption: "Fresh mulch going down at the entry — April 2026",
        kind: "progress",
        width: 2400,
        height: 1800,
      },
      {
        // Real client-supplied field photo — entry beds fully mulched, April 2026
        src: "/images/portfolio/hotel/hotel-spring-mulch-beds.avif",
        alt: "Hotel entry beds edged and freshly mulched along the arrival drive in April",
        caption: "Entry beds edged and mulched — April 2026",
        kind: "progress",
        width: 2400,
        height: 1800,
      },
    ],
    finalImages: [
      {
        // Real client-supplied field photo — arrival drive, August 2026
        src: "/images/portfolio/hotel/hotel-after-arrival-drive.avif",
        alt: "Hotel arrival drive after landscape renovation — pruned ornamental grasses, fresh turf, and edged entry beds",
        caption: "Arrival drive and entry beds after renovation — August 2026",
        kind: "after",
        width: 2400,
        height: 1800,
      },
      {
        // Real client-supplied field photo — same front-lawn viewpoint as the before shot, August 2026
        src: "/images/portfolio/hotel/hotel-after-front-lawn.avif",
        alt: "The same hotel front lawn in August after restoration — clean, evenly mowed turf",
        caption: "The same lawn after restoration — August 2026",
        kind: "after",
        width: 2400,
        height: 3200,
      },
      {
        // Real client-supplied field photo — monument sign hedge, August 2026
        src: "/images/portfolio/hotel/hotel-after-monument-sign.avif",
        alt: "Hotel monument sign with a tightly shaped hedge and clean turf edge after pruning",
        caption: "Monument sign hedge, shaped and maintained — August 2026",
        kind: "after",
        width: 1448,
        height: 1086,
      },
    ],
    ongoingMaintenancePlan: `[Demo copy] Illustrative seasonal maintenance plan. ${DEMO_NOTE}`,
    relatedProjectSlugs: ["demo-office-grounds-program", "demo-retail-hardscape-walkway"],
    isDemonstration: true,
  },
  {
    slug: "demo-office-grounds-program",
    title: "Office Park Grounds Maintenance Program",
    location: "Connecticut (demonstration location)",
    propertyType: "property-management",
    services: ["commercial-landscaping"],
    clientObjective: `[Demo copy] A recurring grounds program that keeps an office park consistent visit after visit. ${DEMO_NOTE}`,
    initialCondition: `[Demo copy] Illustrative — inconsistent prior maintenance across turf and beds. ${DEMO_NOTE}`,
    recommendedSolution: `[Demo copy] Illustrative — scheduled mowing, trimming, and edging with photo documentation each visit. ${DEMO_NOTE}`,
    designProcess: ["[Demo] Property walkthrough", "[Demo] Scope definition", "[Demo] Route scheduling", "[Demo] Documented weekly service"],
    servicesProvided: ["Mowing", "Trimming", "Edging", "Weed control", "Pruning", "Property monitoring"],
    materialsUsed: ["[Demo] Not material-based — recurring service program"],
    timeline: "[Demo] Illustrative — recurring weekly service, April through November",
    beforeImages: [],
    progressImages: [],
    finalImages: [
      {
        // Client-supplied concept photography (not a real property photo) — labeled as concept on the page
        src: "/images/portfolio/office/office-lakeside-campus.avif",
        alt: "Concept photography of an office campus with a lake, winding walkway, and manicured lawns under mature trees",
        caption: "Campus lawns and lakeside banks under the weekly program — concept photography",
        kind: "after",
        width: 1448,
        height: 1086,
      },
      {
        // Client-supplied concept photography — gallery
        src: "/images/portfolio/office/office-walkway-flowerbeds.avif",
        alt: "Concept photography of a curved office park walkway with mulched beds of red flowering shrubs and ornamental grasses",
        caption: "Seasonal color in mulched beds along the main walk — concept photography",
        stage: "Planting beds",
        kind: "after",
        width: 1448,
        height: 1086,
      },
      {
        // Client-supplied concept photography — detail row
        src: "/images/portfolio/office/office-facade-hedge-row.avif",
        alt: "Concept photography of a sheared hedge row and layered planting beds along a glass office facade",
        caption: "Facade hedge sheared tight, beds mulched and edged — concept photography",
        stage: "The detail standard",
        kind: "after",
        width: 1448,
        height: 1086,
      },
      {
        // Client-supplied concept photography — gallery
        src: "/images/portfolio/office/office-tower-lawn-path.avif",
        alt: "Concept photography of a striped lawn and curved walkway below an office tower with mature shade trees",
        caption: "Open lawns held to a weekly cut — concept photography",
        stage: "Open lawns",
        kind: "after",
        width: 1448,
        height: 1086,
      },
      {
        // Client-supplied concept photography — gallery
        src: "/images/portfolio/office/office-striped-lawn-walk.avif",
        alt: "Concept photography of mowing stripes across a rolling lawn beside a curved walkway at an office building",
        caption: "Striped turf and edged walkways, week after week — concept photography",
        stage: "Turf & walkways",
        kind: "after",
        width: 1448,
        height: 1086,
      },
    ],
    ongoingMaintenancePlan: `[Demo copy] Illustrative weekly maintenance plan. ${DEMO_NOTE}`,
    relatedProjectSlugs: ["demo-hoa-seasonal-color", "demo-industrial-snow-operations"],
    isDemonstration: true,
  },
  {
    slug: "demo-hoa-seasonal-color",
    title: "Condominium Seasonal Color Program",
    location: "Connecticut (demonstration location)",
    propertyType: "hoa-condominium",
    services: ["commercial-landscaping"],
    clientObjective: `[Demo copy] Seasonal color that keeps entrances and signage beds fresh from spring through fall. ${DEMO_NOTE}`,
    initialCondition: `[Demo copy] Illustrative — tired entrance beds before spring. ${DEMO_NOTE}`,
    recommendedSolution: `[Demo copy] Illustrative — spring cleanup, fresh mulch, and seasonal color at entries and signage. ${DEMO_NOTE}`,
    designProcess: ["[Demo] Board walkthrough", "[Demo] Budget proposal", "[Demo] Spring installation", "[Demo] Fall changeover"],
    servicesProvided: ["Spring cleanups", "Fall cleanups", "Mulching", "Seasonal color"],
    materialsUsed: ["[Demo] Seasonal annuals placeholder", "[Demo] Hardwood mulch placeholder"],
    timeline: "[Demo] Illustrative — two seasonal installations per year",
    beforeImages: [],
    progressImages: [],
    finalImages: [
      {
        // Client-supplied photo (AdobeStock_296828002) — demonstration program imagery
        src: "/images/portfolio/condo/condo-spring-tulip-walk.avif",
        alt: "Spring entrance beds with pink and orange tulips, blue grape hyacinth, hyacinth, and spurge above fresh mulch along a paver walk",
        caption: "Spring — tulips, grape hyacinth (muscari), hyacinth, and spurge (euphorbia) over fresh mulch along the entrance walk",
        kind: "after",
        width: 4288,
        height: 2848,
      },
      {
        // Client-supplied program imagery — summer rotation
        src: "/images/portfolio/condo/condo-summer-marigold-salvia.avif",
        alt: "Summer annual bed with yellow and orange marigolds, red salvia, and blue lobelia over dark mulch",
        caption: "Summer — marigolds, red salvia, and lobelia carry the beds through the heat",
        stage: "Summer rotation",
        kind: "after",
        width: 1448,
        height: 1086,
      },
      {
        // Client-supplied program imagery — spring peak
        src: "/images/portfolio/condo/condo-spring-tulip-azalea-lawn.avif",
        alt: "Manicured lawn framed by tulip beds, blue forget-me-not borders, and flowering azaleas under mature trees",
        caption: "Tulip and forget-me-not borders under flowering azaleas — the common lawn at peak spring",
        stage: "Spring peak",
        kind: "after",
        width: 1448,
        height: 1086,
      },
      {
        // Client-supplied program imagery — summer foliage texture
        src: "/images/portfolio/hardscape/hardscape-coleus-paver-bed.avif",
        alt: "Bed of burgundy and chartreuse coleus, dusty miller, and sweet potato vine beside a stone-edged walk",
        caption: "Coleus, dusty miller, and sweet potato vine — foliage color that holds when blooms cycle",
        stage: "Summer texture",
        kind: "after",
        width: 1448,
        height: 1086,
      },
      {
        // Client-supplied program imagery — summer shade bed with walk lighting
        src: "/images/portfolio/condo/condo-summer-shade-walk-lights.avif",
        alt: "Shade bed with variegated hosta, magenta impatiens, yellow lantana, and purple salvia lit by walk lights over black mulch",
        caption: "Shade-side color — hosta, impatiens, lantana, and salvia along the lit evening walk",
        stage: "Summer evenings",
        kind: "after",
        width: 1448,
        height: 1086,
      },
      {
        // Client-supplied program imagery — fall rotation
        src: "/images/portfolio/condo/condo-fall-mum-garden.avif",
        alt: "Fall changeover garden with pink, white, orange, and yellow chrysanthemums banked along a stone rill",
        caption: "Fall — the chrysanthemum changeover carries color to first frost",
        stage: "Fall changeover",
        kind: "after",
        width: 1448,
        height: 1086,
      },
      {
        // Client-supplied program imagery — closing detail (structure under the color)
        src: "/images/portfolio/hoa/hoa-begonia-mulch-bed.avif",
        alt: "Foundation bed with pink and white begonias, clipped boxwood, dark barberry, and yucca over fresh black mulch",
        caption: "Summer — begonia borders against boxwood and barberry over fresh black mulch",
        stage: "Between rotations",
        kind: "after",
        width: 1448,
        height: 1086,
      },
    ],
    ongoingMaintenancePlan: `[Demo copy] Illustrative bed-maintenance plan. ${DEMO_NOTE}`,
    relatedProjectSlugs: ["demo-office-grounds-program", "hotel-entry-landscape-renovation"],
    isDemonstration: true,
  },
  {
    slug: "demo-industrial-snow-operations",
    title: "Industrial Site Snow & Ice Operations",
    location: "Connecticut (demonstration location)",
    propertyType: "industrial-mixed-use",
    services: ["snow-ice-management"],
    clientObjective:
      "One contractor accountable for the entire winter event — plowing, deicing, sidewalks, and hauling — with routes and equipment staged before the season and every event documented.",
    initialCondition:
      "Before our contract: an undocumented, reactive snow response — the lot waited for the storm to end before clearing started.",
    recommendedSolution:
      "Pre-storm route planning, plowing and deicing on trigger depths through the event, and time-stamped photo records after every visit.",
    designProcess: ["Pre-season site mapping", "Equipment staging plan", "Storm event execution", "Post-storm documentation"],
    servicesProvided: ["Plowing", "Sidewalk clearing", "Salting and deicing", "Snow hauling", "24/7 storm response"],
    materialsUsed: ["Deicing materials per site plan"],
    timeline: "Seasonal contract — November through March",
    // Real client-supplied field photography (winter 2025–26 season).
    beforeImages: [],
    progressImages: [
      {
        src: "/images/portfolio/snow/snow-plow-truck-storm-headon.webp",
        alt: "Terravian plow truck pushing snow head-on down a commercial drive during an active storm",
        caption: "Mid-storm — clearing starts while it's still snowing, not after",
        kind: "progress",
        width: 1600,
        height: 2133,
      },
    ],
    finalImages: [
      {
        // Drone frame, January 2026 — the serviced lot black and wet,
        // neighboring properties still covered.
        src: "/images/portfolio/snow/snow-aerial-cleared-vs-neighbors.webp",
        alt: "Aerial view of a serviced commercial property with black, wet, fully cleared pavement while every neighboring property remains snow-covered",
        caption: "From above: our client's property — cleared black and wet. Every property around it — still under snow.",
        kind: "after",
        width: 2400,
        height: 1350,
      },
      {
        src: "/images/portfolio/snow/snow-equipment-fleet-staging.webp",
        alt: "Terravian plow truck and skid steer staged on a cleared lot after a winter event",
        caption: "Truck and machine staged on site — equipment assigned to the property before the season starts",
        kind: "after",
        width: 1920,
        height: 1080,
      },
    ],
    ongoingMaintenancePlan:
      "Per-storm documentation: time-stamped photos and a service record attached to the property file after every event.",
    relatedProjectSlugs: ["demo-retail-hardscape-walkway", "demo-office-grounds-program"],
    isDemonstration: true,
  },
  {
    slug: "demo-retail-hardscape-walkway",
    title: "Retail Center Walkway & Drainage Rebuild",
    location: "Connecticut (demonstration location)",
    propertyType: "retail-commercial",
    services: ["hardscape-design"],
    clientObjective: `[Demo copy] A walkway rebuilt level, drained, and safe for retail traffic. ${DEMO_NOTE}`,
    initialCondition: `[Demo copy] Illustrative — a settled walkway with pooling water. ${DEMO_NOTE}`,
    recommendedSolution: `[Demo copy] Illustrative — re-graded walkway, new pavers, and corrected drainage. ${DEMO_NOTE}`,
    designProcess: ["[Demo] Site measurement", "[Demo] Concept and materials", "[Demo] Installation", "[Demo] Final walkthrough"],
    servicesProvided: ["Walkways", "Masonry", "Edging", "Drainage"],
    materialsUsed: ["[Demo] Paver specification placeholder", "[Demo] Drainage components placeholder"],
    timeline: "[Demo] Illustrative — measurement to walkthrough, e.g., 4 weeks",
    beforeImages: [img("before", "Coming soon — before photography for this demonstration project", "Demo before condition")],
    progressImages: [img("progress", "Coming soon — construction photography for this demonstration project", "Demo construction progress")],
    finalImages: [img("after", "Coming soon — completed walkway photography for this demonstration project", "Demo completed walkway")],
    ongoingMaintenancePlan: `[Demo copy] Illustrative hardscape care notes. ${DEMO_NOTE}`,
    relatedProjectSlugs: ["hotel-entry-landscape-renovation", "demo-mixed-use-courtyard"],
    isDemonstration: true,
  },
  {
    slug: "demo-mixed-use-courtyard",
    title: "Mixed-Use Courtyard Landscape & Seating",
    location: "Connecticut (demonstration location)",
    propertyType: "industrial-mixed-use",
    services: ["commercial-landscaping", "hardscape-design"],
    clientObjective: `[Demo copy] An interior courtyard turned into a tenant amenity with seating, plantings, and a fire feature. ${DEMO_NOTE}`,
    initialCondition: `[Demo copy] Illustrative — an underused interior courtyard. ${DEMO_NOTE}`,
    recommendedSolution: `[Demo copy] Illustrative — patio, seat wall, plantings, and a fire pit as a tenant amenity. ${DEMO_NOTE}`,
    designProcess: ["[Demo] Site measurement", "[Demo] Amenity concept", "[Demo] Phased installation", "[Demo] Final walkthrough"],
    servicesProvided: ["Patios", "Retaining walls", "Fire pits", "Plantings", "Installation"],
    materialsUsed: ["[Demo] Masonry specification placeholder", "[Demo] Plant list placeholder"],
    timeline: "[Demo] Illustrative — phased over one season",
    beforeImages: [img("before", "Coming soon — before photography for this demonstration project", "Demo before condition")],
    progressImages: [img("progress", "Coming soon — construction photography for this demonstration project", "Demo construction progress")],
    // Courtyard photography pending — the shade-bed image moved to the
    // condominium seasonal-color program where it belongs (flower story).
    finalImages: [img("after", "Coming soon — completed courtyard photography for this demonstration project", "Demo completed courtyard")],
    ongoingMaintenancePlan: `[Demo copy] Illustrative amenity-area maintenance plan. ${DEMO_NOTE}`,
    relatedProjectSlugs: ["demo-retail-hardscape-walkway", "hotel-entry-landscape-renovation"],
    isDemonstration: true,
  },
];

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

/** Homepage preview shows a subset; the portfolio page shows all. */
export const previewProjects = projects.slice(0, 6);
