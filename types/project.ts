/**
 * Portfolio data schema — projects are stored as structured objects in
 * /content/projects.ts so they can be migrated to a CMS later without
 * changing components.
 */

// Four service divisions — landscaping, grounds maintenance, and seasonal
// enhancements were merged into the single "commercial-landscaping"
// service (Landscape & Maintenance) per client direction; asphalt &
// pavement services added as the fourth division (v22).
export type ServiceSlug =
  | "commercial-landscaping"
  | "snow-ice-management"
  | "hardscape-design"
  | "asphalt-pavement";

export type PropertyType =
  | "hotel-hospitality"
  | "property-management"
  | "hoa-condominium"
  | "retail-commercial"
  | "industrial-mixed-use";

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  "hotel-hospitality": "Hotel & Hospitality",
  "property-management": "Property Management",
  "hoa-condominium": "HOA & Condominium",
  "retail-commercial": "Retail & Commercial",
  "industrial-mixed-use": "Industrial & Mixed-Use",
};

export type ProjectImageKind = "before" | "progress" | "after";

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  /** Optional on-photo label (gold scrim text) for gallery-style layouts. */
  stage?: string;
  kind: ProjectImageKind;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  title: string;
  /** Demo projects may use only generic locations such as "Hartford County". */
  location: string;
  propertyType: PropertyType;
  services: ServiceSlug[];
  clientObjective: string;
  initialCondition: string;
  recommendedSolution: string;
  designProcess: string[];
  servicesProvided: string[];
  materialsUsed: string[];
  timeline: string;
  beforeImages: ProjectImage[];
  progressImages: ProjectImage[];
  finalImages: ProjectImage[];
  ongoingMaintenancePlan: string;
  relatedProjectSlugs: string[];
  /**
   * Hard-coded true for every project until real, client-approved Terravian
   * case studies exist. Demonstration projects are visibly badged, rendered
   * noindex/nofollow, and excluded from the production sitemap.
   */
  isDemonstration: true;
}

export function allProjectImages(p: Project): ProjectImage[] {
  return [...p.beforeImages, ...p.progressImages, ...p.finalImages];
}
