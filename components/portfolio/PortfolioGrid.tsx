"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  PROPERTY_TYPE_LABELS,
  allProjectImages,
  type Project,
} from "@/types/project";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * Filterable portfolio gallery (full /portfolio page).
 * - One filter row per client direction: All Projects / Landscaping /
 *   Snow & Ice / Hardscape / Hospitality / Commercial. Service buttons
 *   match project.services; Hospitality and Commercial match property
 *   types (Commercial = retail-commercial + industrial-mixed-use).
 * - The property-type filter row was removed per client direction.
 * - Cards stay clean: image, category, title, service tags, case-study
 *   link — no descriptions, no location text.
 * - Filter buttons expose aria-pressed; result count is announced.
 * - Lazy-loaded thumbnails. No lightbox: the cover image is a semantic
 *   link to the project's case-study page (client direction — clicking
 *   an image navigates somewhere useful instead of opening a viewer).
 */
type PortfolioFilter =
  | "all"
  | "landscaping"
  | "snow-ice"
  | "hardscape"
  | "hospitality"
  | "commercial";

const FILTERS: { value: PortfolioFilter; label: string }[] = [
  { value: "all", label: "All Projects" },
  { value: "landscaping", label: "Landscaping" },
  { value: "snow-ice", label: "Snow & Ice" },
  { value: "hardscape", label: "Hardscape" },
  { value: "hospitality", label: "Hospitality" },
  { value: "commercial", label: "Commercial" },
];

function matchesFilter(project: Project, filter: PortfolioFilter): boolean {
  switch (filter) {
    case "all":
      return true;
    case "landscaping":
      return project.services.includes("commercial-landscaping");
    case "snow-ice":
      return project.services.includes("snow-ice-management");
    case "hardscape":
      return project.services.includes("hardscape-design");
    case "hospitality":
      return project.propertyType === "hotel-hospitality";
    case "commercial":
      return (
        project.propertyType === "retail-commercial" ||
        project.propertyType === "industrial-mixed-use"
      );
  }
}

export function PortfolioGrid({
  projects,
  showFilters = true,
}: {
  projects: Project[];
  showFilters?: boolean;
}) {
  const [filter, setFilter] = useState<PortfolioFilter>("all");

  const filtered = useMemo(
    () => projects.filter((p) => matchesFilter(p, filter)),
    [projects, filter],
  );

  return (
    <div>
      {showFilters ? (
        <fieldset role="group" aria-label="Project filters">
          <legend className="sr-only">Filter projects</legend>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                aria-pressed={filter === f.value}
                onClick={() => setFilter(f.value)}
                className={`border-2 px-4 py-2 text-sm font-semibold transition-colors duration-fast ease-brand ${
                  filter === f.value
                    ? "border-forest bg-forest text-cream"
                    : "border-charcoal/25 bg-white text-charcoal hover:border-forest hover:text-forest"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="mt-4 text-sm font-medium text-charcoal/80">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"} shown
          </p>
        </fieldset>
      ) : null}

      {filtered.length === 0 ? (
        <div className="mt-8 border-2 border-dashed border-charcoal/30 bg-white p-8 text-center">
          <p className="font-semibold text-charcoal">No projects match these filters.</p>
          <p className="mt-1 text-sm text-charcoal/80">
            Try a different filter, or reset to view all projects.
          </p>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className="mt-4 bg-forest px-5 py-2.5 font-semibold text-cream transition-colors duration-fast hover:bg-forest-dark"
          >
            Show all projects
          </button>
        </div>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => {
            const images = allProjectImages(project);
            const cover = project.finalImages[0] ?? images[0];
            return (
              <li key={project.slug}>
                <article className="group flex h-full flex-col border border-charcoal/10 bg-white">
                  <Link
                    href={`/portfolio/${project.slug}`}
                    aria-label={`View the ${project.title} case study`}
                    className="relative block aspect-[4/3] w-full overflow-hidden"
                  >
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      width={cover.width}
                      height={cover.height}
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 440px"
                      className="h-full w-full object-cover transition-transform duration-slow ease-brand group-hover:scale-[1.03]"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-earth">
                      {PROPERTY_TYPE_LABELS[project.propertyType]}
                    </p>
                    <h3 className="mt-1 text-lg leading-snug">
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="transition-colors duration-fast hover:text-forest"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Services provided">
                      {project.servicesProvided.slice(0, 3).map((tag) => (
                        <li
                          key={tag}
                          className="border border-charcoal/15 px-2 py-0.5 text-[0.6875rem] font-medium text-charcoal/75"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-forest transition-colors duration-fast ease-brand hover:text-forest-dark"
                    >
                      View case study
                      <ArrowRightIcon
                        size={16}
                        className="transition-transform duration-fast ease-brand group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
