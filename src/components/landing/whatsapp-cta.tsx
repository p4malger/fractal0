import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./brand";
import { whatsappUrl } from "@/lib/course-data";

interface WhatsAppCtaProps {
  label?: string;
  size?: "lg" | "md" | "sm";
  variant?: "gold" | "outline" | "light" | "navy";
  className?: string;
  showNumber?: boolean;
}

/**
 * Bouton d'appel à l'action WhatsApp — cœur des conversions.
 * Variantes : gold (dégradé or), outline (or sur fond sombre),
 * navy (sur fond clair), light (blanc sur fond sombre).
 */
export function WhatsAppCta({
  label = "JE M'INSCRIS À LA FORMATION",
  size = "lg",
  variant = "gold",
  className,
  showNumber = false,
}: WhatsAppCtaProps) {
  return (
    <span className={cn("inline-flex flex-col gap-2", className)}>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Inscription à la formation par WhatsApp"
        className={cn(
          "btn-shine group inline-flex items-center justify-center gap-3 rounded-full font-semibold tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500",
          size === "lg" && "min-h-14 px-8 py-4 text-base",
          size === "md" && "min-h-12 px-6 py-3 text-sm",
          size === "sm" && "min-h-10 px-5 py-2.5 text-xs",
          variant === "gold" &&
            "bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 text-navy-950 shadow-lg shadow-gold-500/25 hover:shadow-xl hover:shadow-gold-500/35 hover:-translate-y-0.5 active:translate-y-0",
          variant === "outline" &&
            "border border-gold-500/60 bg-transparent text-gold-300 hover:bg-gold-500/10 hover:border-gold-400",
          variant === "light" &&
            "bg-white text-navy-900 shadow-lg shadow-navy-950/20 hover:shadow-xl hover:-translate-y-0.5",
          variant === "navy" &&
            "border border-navy-200 bg-white text-navy-800 shadow-sm shadow-navy-900/10 hover:bg-navy-900 hover:text-white hover:border-navy-900 hover:-translate-y-0.5"
        )}
      >
        <WhatsAppIcon className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
        <span>{label}</span>
      </a>
      {showNumber && (
        <span className="flex items-center justify-center gap-2 text-sm text-white/70">
          <span className="inline-block h-1 w-1 rounded-full bg-gold-400" />
          WhatsApp : 0657 86 74 44
          <span className="inline-block h-1 w-1 rounded-full bg-gold-400" />
        </span>
      )}
    </span>
  );
}
