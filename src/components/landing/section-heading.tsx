import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { AIDA_STEPS, SHOW_AIDA_STEPS } from "@/lib/course-data";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  dark?: boolean;
  align?: "center" | "left";
  className?: string;
  /** Étape AIDA affichée en badge — "attention" | "interest" | "desire" | "action" */
  aida?: keyof typeof AIDA_STEPS;
}

/**
 * En-tête de section harmonisé : badge d'étape AIDA (optionnel),
 * eyebrow doré, titre Playfair, description sobre.
 * Style académique constant sur toute la page.
 */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  dark = false,
  align = "center",
  className,
  aida,
}: SectionHeadingProps) {
  const aidaStep = aida ? AIDA_STEPS[aida] : null;

  return (
    <Reveal
      className={cn(
        "mb-12 flex flex-col gap-4 md:mb-16",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {aidaStep && SHOW_AIDA_STEPS && (
        <span
          className={cn(
            "inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.22em]",
            dark
              ? "border-gold-500/45 bg-gold-500/10 text-gold-300"
              : "border-gold-500/45 bg-gold-500/10 text-gold-700"
          )}
        >
          <span className="text-gold-gradient font-display text-sm font-bold tracking-normal">
            {aidaStep.step}
          </span>
          <span
            aria-hidden="true"
            className={cn("h-1 w-1 rounded-full", dark ? "bg-gold-400/70" : "bg-gold-600/60")}
          />
          <span>{aidaStep.label}</span>
        </span>
      )}
      <span className="flex items-center gap-3">
        <span className="gold-hairline w-8 md:w-12" aria-hidden="true" />
        <span
          className={cn(
            "eyebrow-label",
            dark ? "text-gold-400" : "text-gold-600"
          )}
        >
          {eyebrow}
        </span>
        <span className="gold-hairline w-8 md:w-12" aria-hidden="true" />
      </span>
      <h2
        className={cn(
          "font-display max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-navy-900"
        )}
      >
        {title}{" "}
        {highlight && (
          <span
            className={cn(
              "font-display italic",
              dark ? "text-gold-gradient" : "text-gold-gradient"
            )}
          >
            {highlight}
          </span>
        )}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed md:text-lg",
            dark ? "text-azure-200/80" : "text-navy-700/75"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
