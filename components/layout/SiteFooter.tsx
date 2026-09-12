import Image from "next/image";
import Link from "next/link";
import { business } from "@/content/business";
import { services } from "@/content/services";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";

/**
 * Site footer. Logo instance 2 of 2: the full lockup (real brand asset).
 * Contact information shown here comes from the verified-facts object.
 * Business hours are intentionally omitted until Terravian provides them.
 *
 * Brand-system pass: pure white ground (site-wide white-background rule) —
 * the footer reads as quiet architecture. Copyright line removed entirely
 * (client direction); the public brand name (no LLC) carries the address
 * block. Headings green, links charcoal with green hover, icons green.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-charcoal/10 bg-white text-charcoal">
      <div className="container-chrome grid justify-items-center gap-12 py-14 text-center md:grid-cols-2 md:justify-items-stretch md:py-16 md:text-left lg:grid-cols-4">
        <div className="flex w-36 flex-col items-center md:block">
          {/* Logo instance 2 of 2: full lockup — real approved asset.
              Transparent-background version sits directly on the warm
              footer ground — no plate. The brand block is one unit: the
              tagline wraps to two lines inside a container only slightly
              wider than the logo, so its lines center tightly under the
              logo at every screen size — one composed lockup. */}
          <Image
            src="/images/brand/terravian-logo-full-transparent.png"
            alt="Terravian Landscaping"
            width={180}
            height={180}
            className="h-32 w-32 object-contain"
          />
          <p className="brand-serif mt-4 text-center font-display text-lg italic leading-snug text-charcoal/85">
            &ldquo;{business.tagline}&rdquo;
          </p>
        </div>

        <nav aria-label="Footer services">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest">
            Services
          </h2>
          <ul className="mt-4 space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-charcoal/80 transition-colors duration-fast hover:text-forest"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer company">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest">
            Company
          </h2>
          <ul className="mt-4 space-y-2.5">
            {[
              ["How We Work", "/how-we-work"],
              ["Industries", "/industries"],
              ["Portfolio", "/portfolio"],
              ["About", "/about"],
              ["Request a Proposal", "/request-a-proposal"],
              ["Privacy", "/privacy"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-charcoal/80 transition-colors duration-fast hover:text-forest"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-forest">
            Contact
          </h2>
          <address className="mt-4 space-y-3 not-italic">
            <p className="flex flex-col items-center gap-1.5 text-charcoal/80 md:flex-row md:items-start md:gap-2.5">
              <PinIcon size={18} className="shrink-0 text-forest md:mt-1" />
              <span>
                {business.name}
                <br />
                {business.streetAddress}
                <br />
                {business.addressLocality}, {business.addressRegion} {business.postalCode}
              </span>
            </p>
            <p>
              <a
                href={business.phoneHref}
                className="flex items-center justify-center gap-2.5 font-semibold text-forest transition-colors duration-fast hover:text-forest-dark md:justify-start"
              >
                <PhoneIcon size={18} className="shrink-0" />
                {business.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${business.email}`}
                className="flex items-center justify-center gap-2.5 break-all text-charcoal/80 transition-colors duration-fast hover:text-forest md:justify-start"
              >
                <MailIcon size={18} className="shrink-0 text-forest" />
                {business.email}
              </a>
            </p>
          </address>
          <p className="mt-4 text-sm leading-relaxed text-charcoal/60">
            {business.coverageStatement}
          </p>
        </div>
      </div>
    </footer>
  );
}
