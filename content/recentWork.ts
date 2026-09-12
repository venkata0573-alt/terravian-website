/**
 * Recent Terravian work — Landscape & Maintenance service page.
 *
 * Client-supplied photographs the client asserts are Terravian-completed
 * projects (licensed; see IMAGES.md). Names describe what each photograph
 * shows — no client names, locations, dates, or scope claims until the
 * client supplies approved project details.
 *
 * Source sets (three properties, per client):
 *  - Terraced gardens: naoki-suzuki-zgEtrg_Uz7I / YCZuhUUHQho / XDTx5RwjBYk
 *  - Entrance beds:    qy-liu-184tM0HpxPA (companion shot mowcow-lawn is the
 *                      Senior Living & Healthcare industry card)
 *  - Formal gardens:   roger-starnes-sr-8Kk5C2FLCV0 / YZpcu1bVzuk
 */

export type WorkHighlight = {
  n: string;
  name: string;
  line: string;
  img: string;
  srcSet?: string;
  alt: string;
  width: number;
  height: number;
  orientation: "landscape" | "portrait";
};

export const recentWork: WorkHighlight[] = [
  {
    n: "01",
    name: "Terraced Gardens & Seasonal Color",
    line: "Natural-stone terrace beds replanted with seasonal color",
    // Client-supplied project photo (naoki-suzuki-zgEtrg_Uz7I)
    img: "/images/placeholders/work-terraced-gardens-800.avif",
    srcSet:
      "/images/placeholders/work-terraced-gardens-800.avif 800w, /images/placeholders/work-terraced-gardens-1200.avif 1200w, /images/placeholders/work-terraced-gardens.avif 1600w",
    alt: "Natural stone terraced garden beds filled with pink seasonal flowers and canna lilies along a stone walkway",
    width: 1600,
    height: 1067,
    orientation: "landscape",
  },
  {
    n: "02",
    name: "Formal Gardens & Seasonal Planters",
    line: "Parterre beds, clipped boxwood, and urn planters along a paver walk",
    // Client-supplied project photo (roger-starnes-sr-8Kk5C2FLCV0)
    img: "/images/placeholders/work-formal-gardens-800.avif",
    srcSet:
      "/images/placeholders/work-formal-gardens-800.avif 800w, /images/placeholders/work-formal-gardens.avif 1200w",
    alt: "Formal garden with a paver walkway, clipped boxwood spheres, and stone urn planters",
    width: 1200,
    height: 1600,
    orientation: "portrait",
  },
  {
    n: "03",
    name: "Entrance Beds & Foundation Plantings",
    line: "Entry beds, fresh mulch, and pruning around a community entrance",
    // Client-supplied project photo (qy-liu-184tM0HpxPA)
    img: "/images/placeholders/work-entrance-gardens-800.avif",
    srcSet:
      "/images/placeholders/work-entrance-gardens-800.avif 800w, /images/placeholders/work-entrance-gardens-1200.avif 1200w, /images/placeholders/work-entrance-gardens.avif 1600w",
    alt: "Community entrance garden with red azaleas, fresh mulch beds, a brick pillar, and a manicured lawn",
    width: 1600,
    height: 1067,
    orientation: "landscape",
  },
];

export type FieldPhoto = {
  name: string;
  img: string;
  srcSet?: string;
  alt: string;
};

/** Remaining project photos — moving field rail (small names, no details). */
export const fieldRail: FieldPhoto[] = [
  {
    name: "Garden steps & color beds",
    // Client-supplied project photo (naoki-suzuki-YCZuhUUHQho)
    img: "/images/placeholders/field-garden-steps-480.avif",
    srcSet:
      "/images/placeholders/field-garden-steps-480.avif 480w, /images/placeholders/field-garden-steps-800.avif 800w",
    alt: "Stone garden steps bordered by seasonal flower beds",
  },
  {
    name: "Water feature borders",
    // Client-supplied project photo (naoki-suzuki-XDTx5RwjBYk)
    img: "/images/placeholders/field-water-feature-480.avif",
    srcSet:
      "/images/placeholders/field-water-feature-480.avif 480w, /images/placeholders/field-water-feature-800.avif 800w",
    alt: "Flower border along stone steps in front of a waterfall feature",
  },
  {
    name: "Circular parterre bed",
    // Client-supplied project photo (roger-starnes-sr-YZpcu1bVzuk)
    img: "/images/placeholders/field-parterre-bed-480.avif",
    srcSet:
      "/images/placeholders/field-parterre-bed-480.avif 480w, /images/placeholders/field-parterre-bed-800.avif 800w",
    alt: "Circular parterre flower bed with a stone urn centerpiece",
  },
];

/**
 * Homepage field rail — all six project photos (the three highlights plus
 * the three field shots), since the homepage does not carry the mosaic.
 * Small names only; same images as above.
 */
export const homeFieldRail: FieldPhoto[] = [
  {
    name: "Terraced gardens & seasonal color",
    img: "/images/placeholders/work-terraced-gardens-480.avif",
    srcSet:
      "/images/placeholders/work-terraced-gardens-480.avif 480w, /images/placeholders/work-terraced-gardens-800.avif 800w",
    alt: "Natural stone terraced garden beds filled with pink seasonal flowers and canna lilies along a stone walkway",
  },
  {
    name: "Garden steps & color beds",
    img: "/images/placeholders/field-garden-steps-480.avif",
    srcSet:
      "/images/placeholders/field-garden-steps-480.avif 480w, /images/placeholders/field-garden-steps-800.avif 800w",
    alt: "Stone garden steps bordered by seasonal flower beds",
  },
  {
    name: "Formal gardens & planters",
    img: "/images/placeholders/work-formal-gardens-480.avif",
    srcSet:
      "/images/placeholders/work-formal-gardens-480.avif 480w, /images/placeholders/work-formal-gardens-800.avif 800w",
    alt: "Formal garden with a paver walkway, clipped boxwood spheres, and stone urn planters",
  },
  {
    name: "Water feature borders",
    img: "/images/placeholders/field-water-feature-480.avif",
    srcSet:
      "/images/placeholders/field-water-feature-480.avif 480w, /images/placeholders/field-water-feature-800.avif 800w",
    alt: "Flower border along stone steps in front of a waterfall feature",
  },
  {
    name: "Entrance beds & foundation plantings",
    img: "/images/placeholders/work-entrance-gardens-480.avif",
    srcSet:
      "/images/placeholders/work-entrance-gardens-480.avif 480w, /images/placeholders/work-entrance-gardens-800.avif 800w",
    alt: "Community entrance garden with red azaleas, fresh mulch beds, a brick pillar, and a manicured lawn",
  },
  {
    name: "Circular parterre bed",
    img: "/images/placeholders/field-parterre-bed-480.avif",
    srcSet:
      "/images/placeholders/field-parterre-bed-480.avif 480w, /images/placeholders/field-parterre-bed-800.avif 800w",
    alt: "Circular parterre flower bed with a stone urn centerpiece",
  },
];
