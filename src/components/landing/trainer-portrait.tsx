import Image from "next/image";
import { cn } from "@/lib/utils";
import { COURSE, IMAGES } from "@/lib/course-data";

/**
 * ══════════════════════════════════════════════════════════════
 *  PORTRAIT DU FORMATEUR — Dr. Mohamed HADDAD
 * ──────────────────────────────────────────────────────────────
 *  ✏️ ✨ الأسهل الآن: استبدل صورة الدكتور برابط مباشر من لوحة
 *     التحكم /admin → تبويب « الوسائط » (بدون تعديل الكود)
 *     أو ضع صورة في /public/images/ وغيّر المسار في course-data.ts
 * ══════════════════════════════════════════════════════════════
 */

export function TrainerPortrait({
  className,
  compact = false,
  photo,
}: {
  className?: string;
  compact?: boolean;
  /** URL choisie depuis /admin — vide → image par défaut */
  photo?: string;
}) {
  const photoSrc = photo?.trim() || IMAGES.trainerPhoto;
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-2xl border border-gold-500/40 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 shadow-2xl shadow-navy-950/30",
        className
      )}
    >
      {/* Motif fractal discret + halo */}
      <div className="bg-fractal-dark absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className={cn(
          "absolute left-1/2 -top-20 rounded-full bg-gold-500/15 blur-3xl",
          compact ? "h-28 w-28" : "h-48 w-48"
        )}
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative flex aspect-[4/5] flex-col items-center justify-center text-center",
          compact ? "gap-2 p-4" : "gap-5 p-8"
        )}
      >
        {/* Photo officielle — cercle doré */}
        <span
          className={cn(
            "relative flex items-center justify-center rounded-full",
            compact ? "h-28 w-28 md:h-32 md:w-32" : "h-52 w-52 md:h-60 md:w-60"
          )}
        >
          <span
            className="absolute inset-0 rounded-full border border-gold-500/60"
            aria-hidden="true"
          />
          <span
            className={cn(
              "absolute inset-[-8px] rounded-full border border-gold-500/25",
              compact && "inset-[-6px]"
            )}
            aria-hidden="true"
          />
          <Image
            src={photoSrc}
            alt={`Portrait officiel de ${COURSE.trainer}`}
            width={compact ? 128 : 240}
            height={compact ? 128 : 240}
            className={cn(
              "h-full w-full rounded-full object-cover",
              compact ? "p-1.5" : "p-2"
            )}
          />
        </span>

        <figcaption className={cn("flex flex-col", compact ? "gap-0.5" : "gap-1.5")}>
          <span
            className={cn(
              "font-display font-bold text-white",
              compact ? "text-sm leading-snug" : "text-xl md:text-2xl"
            )}
          >
            {COURSE.trainer}
          </span>
          <span
            className={cn(
              "eyebrow-label text-azure-300/90",
              compact ? "text-[0.5rem]" : "text-[0.65rem]"
            )}
          >
            {COURSE.trainerRole}
          </span>
        </figcaption>

        {!compact && (
          <>
            <span className="gold-hairline w-16" aria-hidden="true" />
            <span className="text-xs leading-relaxed text-azure-200/60">
              Formateur de la session
              <br />
              Alger — Octobre 2026
            </span>
          </>
        )}
      </div>
    </figure>
  );
}
