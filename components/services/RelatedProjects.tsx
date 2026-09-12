import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import { PROPERTY_TYPE_LABELS, type ServiceSlug } from "@/types/project";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * Related projects for a service page (mandated section 7).
 * Pulls demonstration projects filtered by service. Every card keeps the
 * visible demonstration badge — these never appear to be completed
 * Terravian work. Server component.
 */
export function RelatedProjects({ serviceSlug }: { serviceSlug: ServiceSlug }) {
  const related = projects.filter((p) => p.services.includes(serviceSlug));
  // Client direction (hardscape page cleanup): the hardscape page presents
  // its concept/project imagery without demonstration labeling; other
  // service pages keep the badge and note.
  const showDemoLabels = serviceSlug !== "hardscape-design";

  if (related.length === 0) {
    return (
      <p className="mt-6 border-l-4 border-forest bg-white p-4 text-sm leading-relaxed text-charcoal/85">
        Demonstration projects for this service publish here as they are
        added. Real Terravian case studies publish after client approval.
      </p>
    );
  }

  return (
    <>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {related.map((project) => {
          const cover = project.finalImages[0] ?? project.beforeImages[0];
          return (
            <li key={project.slug} className="flex flex-col border border-charcoal/10 bg-white">
              <Link
                href={`/portfolio/${project.slug}`}
                className="relative block aspect-[4/3] overflow-hidden"
              >
                {cover ? (
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    width={cover.width}
                    height={cover.height}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 668px"
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-earth">
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
                {showDemoLabels ? (
                  <p className="mt-2 inline-block w-fit bg-tint px-2 py-1 text-xs font-semibold text-charcoal">
                    Demonstration project — not a completed Terravian project
                  </p>
                ) : null}
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="mt-4 inline-flex items-center gap-2 font-semibold text-forest transition-colors duration-fast hover:text-earth"
                >
                  View project layout
                  <ArrowRightIcon size={16} />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
      {showDemoLabels ? (
        <p className="mt-6 text-sm leading-relaxed text-charcoal/80">
          Projects shown are demonstration layouts. Terravian project case
          studies publish after client approval.
        </p>
      ) : null}
    </>
  );
}
