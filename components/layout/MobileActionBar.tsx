import Link from "next/link";
import { business } from "@/content/business";
import { PhoneIcon } from "@/components/ui/icons";

/**
 * Sticky mobile call/proposal bar. Hidden on md+.
 * body has pb-16 (globals.css) so the bar never obscures page content.
 */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-charcoal/10 bg-white md:hidden">
      <a
        href={business.phoneHref}
        className="flex items-center justify-center gap-2 bg-forest px-4 py-3.5 font-semibold text-cream"
      >
        <PhoneIcon size={18} />
        Call Now
      </a>
      <Link
        href="/request-a-proposal"
        className="flex items-center justify-center gap-2 bg-white px-4 py-3.5 font-semibold text-forest"
      >
        Request a Proposal
      </Link>
    </div>
  );
}
