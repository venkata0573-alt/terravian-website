import Image from "next/image";
import type { ProjectImage } from "@/types/project";

/**
 * Service-page photo gallery (mandated section 5).
 * Static figures — no lightbox and no click behavior (client direction):
 * these images already live on their relevant destination page, so there
 * is nowhere more useful to navigate to, and non-navigating images must
 * not appear clickable.
 * Every image is a labeled placeholder until real Terravian photography
 * is supplied and approved (see content/serviceDetails.ts).
 */
export function ServiceGallery({
  images,
}: {
  images: ProjectImage[];
  serviceName: string;
}) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
      {images.map((image, i) => (
        <li key={`${image.src}-${i}`}>
          {/* Mobile: clean, unobstructed photography — the scrim and
              explanatory caption sentence are removed from the image and
              only a short status label sits below it (client direction,
              Step 3). Desktop keeps the overlaid captions unchanged. */}
          <figure>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 440px"
                className="h-full w-full object-cover"
              />
              {image.caption ? (
                <span className="absolute inset-x-0 bottom-0 block bg-gradient-to-t from-black/60 via-black/25 to-transparent p-4 pt-10 max-md:hidden">
                  <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#E4B263]">
                    {image.kind}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-cream/95 [text-shadow:0_1px_3px_rgba(0,0,0,0.7)]">
                    {image.caption}
                  </span>
                </span>
              ) : null}
            </div>
            {image.kind ? (
              <figcaption className="mt-2 text-sm font-semibold capitalize text-charcoal/80 md:hidden">
                {image.kind}
              </figcaption>
            ) : null}
          </figure>
        </li>
      ))}
    </ul>
  );
}
