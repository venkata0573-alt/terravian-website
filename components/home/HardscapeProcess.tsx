import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * Hardscape design process strip: measurement → concept → materials →
 * installation → final walkthrough.
 */
const steps = [
  { title: "Site measurement", text: "Dimensions, grades, and drainage recorded on site." },
  { title: "Concept", text: "Layout options drawn against how the space will actually be used." },
  { title: "Materials", text: "Pavers, stone, and block selected and confirmed before work begins." },
  { title: "Installation", text: "Base preparation, setting, edging, and drainage executed to plan." },
  { title: "Final walkthrough", text: "Completed work reviewed with you before the project closes." },
];

export function HardscapeProcess() {
  return (
    <div>
      <ol className="grid gap-6 md:grid-cols-3 xl:grid-cols-5">
        {steps.map((s, i) => (
          <li key={s.title} className="relative border-t-4 border-forest bg-white p-6">
            <p className="text-sm font-bold uppercase tracking-[0.08em] text-earth">
              Phase {i + 1}
            </p>
            <h3 className="mt-2 text-lg">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/85">{s.text}</p>
          </li>
        ))}
      </ol>
      <Link
        href="/services/hardscape-design"
        className="mt-8 inline-flex items-center gap-2 font-semibold text-forest transition-colors duration-fast hover:text-earth"
      >
        See hardscape capabilities
        <ArrowRightIcon size={18} />
      </Link>
    </div>
  );
}
