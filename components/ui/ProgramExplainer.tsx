import { programs } from "@/content/programs";
import { CheckIcon } from "./icons";

/**
 * Proprietary program explainer block.
 * The ™ form is used when `firstUse` is true (first mention on the page);
 * subsequent mentions use the plain name. Copy is a structural draft pending
 * Terravian approval (see content/programs.ts).
 */
export function ProgramExplainer({
  programId,
  firstUse = false,
  onDark = false,
}: {
  programId: string;
  firstUse?: boolean;
  onDark?: boolean;
}) {
  const program = programs.find((p) => p.id === programId);
  if (!program) return null;
  return (
    <div
      className={`border-l-4 p-6 ${
        onDark ? "border-tint bg-white/5" : "border-forest bg-white"
      }`}
    >
      <h3
        className={`flex items-start gap-3 text-xl leading-snug ${
          onDark ? "text-cream" : "text-charcoal"
        }`}
      >
        <span className={`mt-0.5 shrink-0 ${onDark ? "text-tint" : "text-forest"}`}>
          <CheckIcon size={22} />
        </span>
        {firstUse ? program.nameTrademarked : program.name}
      </h3>
      <p className={`mt-2 font-semibold ${onDark ? "text-cream/95" : "text-forest"}`}>
        {program.summary}
      </p>
      <p className={`mt-2 leading-relaxed ${onDark ? "text-cream/85" : "text-charcoal/90"}`}>
        {program.detail}
      </p>
    </div>
  );
}
