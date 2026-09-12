import type { Metadata } from "next";
import { business } from "@/content/business";
import { demoMetadata } from "@/lib/metadata";

/**
 * Privacy policy — PLACEHOLDER STRUCTURE.
 * Body copy is pending legal-approved text from Terravian. noindex until
 * the real policy is reviewed and approved (per SEO acceptance criteria).
 */
export const metadata: Metadata = demoMetadata({
  path: "/privacy",
  title: "Privacy Policy",
  description: "Terravian Landscaping LLC privacy policy — placeholder pending approved legal text.",
});

export default function PrivacyPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-site max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-2 text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.1] text-forest">Privacy Policy</h1>

        <div className="mt-8 border-l-4 border-earth bg-white p-5">
          <p className="font-semibold text-charcoal">
            PLACEHOLDER — approved privacy policy text required.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-charcoal/85">
            The sections below define the structure only. Final wording must be
            supplied by Terravian and reviewed before this page is indexed.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          <section aria-labelledby="pp-collect">
            <h2 id="pp-collect" className="text-2xl">Information we collect</h2>
            <p className="mt-3 leading-relaxed text-charcoal/90">
              [PLACEHOLDER] When you submit the contact or proposal form, we
              receive the information you provide: name, company, contact
              details, and property information. Final legal text pending.
            </p>
          </section>
          <section aria-labelledby="pp-use">
            <h2 id="pp-use" className="text-2xl">How we use it</h2>
            <p className="mt-3 leading-relaxed text-charcoal/90">
              [PLACEHOLDER] Submitted information is used to respond to your
              inquiry and prepare a proposal. Final legal text pending.
            </p>
          </section>
          <section aria-labelledby="pp-sharing">
            <h2 id="pp-sharing" className="text-2xl">Sharing</h2>
            <p className="mt-3 leading-relaxed text-charcoal/90">
              [PLACEHOLDER] Final legal text pending review.
            </p>
          </section>
          <section aria-labelledby="pp-contact">
            <h2 id="pp-contact" className="text-2xl">Contact</h2>
            <p className="mt-3 leading-relaxed text-charcoal/90">
              Questions about this policy: {business.legalName},{" "}
              {business.streetAddress}, {business.addressLocality},{" "}
              {business.addressRegion} {business.postalCode} ·{" "}
              <a href={business.phoneHref} className="font-semibold text-forest hover:underline">
                {business.phone}
              </a>{" "}
              ·{" "}
              <a href={`mailto:${business.email}`} className="font-semibold text-forest hover:underline">
                {business.email}
              </a>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
