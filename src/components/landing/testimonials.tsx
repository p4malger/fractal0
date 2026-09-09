import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/course-data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

/**
 * « Témoignages » — retours réels des sessions précédentes
 * (textes éditables dans course-data.ts ✏️, paragraphes via \n\n).
 * Tant qu'un témoignage est vide, un état « à venir » élégant s'affiche.
 */
export function Testimonials() {
  // Grille adaptée au nombre de cartes (1 → centrée, 2 → colonnes, 3+ → triple)
  const count = TESTIMONIALS.length;
  const gridCols =
    count === 1
      ? "mx-auto max-w-2xl md:grid-cols-1"
      : count === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3";

  return (
    <section
      id="temoignages"
      className="relative scroll-mt-24 bg-gradient-to-b from-white via-ivory to-white py-20 md:py-28"
    >
      <div className="bg-fractal-light absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          aida="desire"
          eyebrow="Témoignages"
          title="Ils ont participé"
          highlight="aux sessions précédentes"
          description="Retours de médecins et professionnels de santé ayant suivi les séminaires du Dr. HADDAD."
        />

        <div className={`grid gap-6 lg:gap-8 ${gridCols}`}>
          {TESTIMONIALS.map((t, i) => {
            const hasContent = t.quote.trim().length > 0;
            const paragraphs = t.quote
              .split(/\n{2,}/)
              .map((p) => p.trim())
              .filter(Boolean);
            return (
              <Reveal key={i} delay={i * 120}>
                <figure className="relative flex h-full flex-col gap-5 rounded-2xl border border-navy-100 bg-white p-7 shadow-sm shadow-navy-900/5">
                  <Quote
                    className="h-8 w-8 text-gold-400/70"
                    aria-hidden="true"
                  />
                  {hasContent ? (
                    <>
                      <blockquote className="flex flex-col gap-3 text-sm leading-relaxed text-navy-800 md:text-[0.95rem]">
                        {paragraphs.map((para, pi) => (
                          <p key={pi}>
                            {pi === 0 ? "« " : ""}
                            {para}
                            {pi === paragraphs.length - 1 ? " »" : ""}
                          </p>
                        ))}
                      </blockquote>
                      <figcaption className="mt-auto flex flex-col gap-1 border-t border-navy-100 pt-4">
                        <span className="font-display text-sm font-bold text-navy-900">
                          {t.author}
                        </span>
                        <span className="text-xs text-navy-700/60">{t.context}</span>
                      </figcaption>
                    </>
                  ) : (
                    <div className="flex h-full flex-col items-start gap-4">
                      <p className="font-display text-lg font-semibold text-navy-300/90">
                        Témoignage à venir
                      </p>
                      <p className="text-sm leading-relaxed text-navy-700/60">
                        Les retours d&apos;expérience des participants seront
                        ajoutés après la session d&apos;octobre 2026.
                      </p>
                      <figcaption className="mt-auto flex w-full items-center justify-between border-t border-navy-100 pt-4">
                        <span className="text-xs text-navy-700/60">{t.context}</span>
                        <span className="flex gap-1" aria-hidden="true">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <Star
                              key={s}
                              className="h-3.5 w-3.5 text-gold-300"
                              fill="currentColor"
                              strokeWidth={0}
                            />
                          ))}
                        </span>
                      </figcaption>
                    </div>
                  )}
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
