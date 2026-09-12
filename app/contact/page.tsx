import type { Metadata } from "next";
import { business } from "@/content/business";
import { pageMetadata } from "@/lib/metadata";
import { ContactForm } from "@/components/forms/ContactForm";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  title: "Contact",
  description:
    "Contact Terravian Landscaping in Cheshire, CT. Call 475-347-4090 or send a message about commercial landscaping, snow & ice, hardscape, or asphalt service for your property.",
});

export default function ContactPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-2 text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.1] text-forest">
            Talk to the crew that shows up
          </h1>
          <p className="mt-4 text-[1.0625rem] leading-[1.65] text-charcoal/90">
            Call, email, or send the form — a real person who knows commercial
            properties will follow up.
          </p>

          <address className="mt-8 space-y-5 not-italic">
            <p className="flex items-start gap-3">
              <PhoneIcon size={20} className="mt-1 shrink-0 text-forest" />
              <span>
                <span className="block font-semibold">Phone</span>
                <a href={business.phoneHref} className="text-forest underline-offset-4 hover:underline">
                  {business.phone}
                </a>
              </span>
            </p>
            <p className="flex items-start gap-3">
              <MailIcon size={20} className="mt-1 shrink-0 text-forest" />
              <span>
                <span className="block font-semibold">Email</span>
                <a href={`mailto:${business.email}`} className="break-all text-forest underline-offset-4 hover:underline">
                  {business.email}
                </a>
              </span>
            </p>
            <p className="flex items-start gap-3">
              <PinIcon size={20} className="mt-1 shrink-0 text-forest" />
              <span>
                <span className="block font-semibold">Office</span>
                {business.streetAddress}
                <br />
                {business.addressLocality}, {business.addressRegion} {business.postalCode}
              </span>
            </p>
          </address>

          {/* Business hours intentionally omitted — awaiting verified hours
              from Terravian (see completion report). */}
          {/* Map embed intentionally omitted — geographic coordinates are not
              published until the business approves exact location data. */}

          <p className="mt-8 border-l-4 border-forest bg-white p-4 text-sm leading-relaxed text-charcoal/85">
            {business.coverageStatement}
          </p>
        </div>

        <div className="border border-charcoal/10 bg-white p-6 md:p-10">
          <h2 className="text-2xl">Send a message</h2>
          <p className="mt-2 text-charcoal/85">
            Tell us about your property and we&apos;ll respond.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
