"use client";

import { useState } from "react";
import { Check, ChevronDown, Layers, FileText } from "lucide-react";
import { PROGRAM_LEVELS, whatsappUrl, type ProgramLevel } from "@/lib/course-data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { WhatsAppIcon } from "./brand";
import { cn } from "@/lib/utils";

/**
 * « Programme de la formation » — trois niveaux dépliables.
 * Niveau 1 ouvert par défaut ; boutons « Voir le programme détaillé ».
 * Le contenu provient de src/lib/course-data.ts (programme officiel).
 */
function LevelCard({ level, index }: { level: ProgramLevel; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <Reveal delay={index * 110}>
      <article
        className={cn(
          "h-full overflow-hidden rounded-2xl border bg-white transition-all duration-300",
          open
            ? "border-gold-400/60 shadow-xl shadow-navy-900/10"
            : "border-navy-100 shadow-sm shadow-navy-900/5 hover:border-gold-400/40 hover:shadow-lg hover:shadow-navy-900/10"
        )}
      >
        {/* En-tête du niveau */}
        <div className="relative bg-gradient-to-br from-navy-900 via-navy-900 to-navy-800 p-6 md:p-7">
          <div className="bg-fractal-dark absolute inset-0 opacity-50" aria-hidden="true" />
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold-500/50 bg-gold-500/10 font-display text-lg font-bold text-gold-300">
                {level.level.replace(/[^0-9+]/g, "") || "1"}
              </span>
              <div className="flex flex-col gap-1">
                <span className="eyebrow-label text-[0.6rem] text-gold-400">
                  {level.level}
                </span>
                <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                  {level.title}
                </h3>
              </div>
            </div>
            <span className="rounded-full border border-azure-300/30 bg-azure-500/10 px-3.5 py-1.5 text-xs font-medium text-azure-200">
              {level.badge}
            </span>
          </div>
          <p className="relative mt-4 text-sm leading-relaxed text-azure-100/75">
            {level.baseline}
          </p>
        </div>

        {/* Corps : programme détaillé dépliable */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`${level.id}-content`}
          className={cn(
            "flex w-full items-center justify-center gap-2.5 border-b px-6 py-4 text-sm font-semibold transition-colors",
            open
              ? "border-gold-400/40 bg-gold-100/50 text-gold-700"
              : "border-navy-100 bg-ivory text-navy-700 hover:bg-gold-100/40 hover:text-gold-700"
          )}
        >
          <Layers className="h-4 w-4" aria-hidden="true" />
          {open ? "Masquer le programme détaillé" : "Voir le programme détaillé"}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform duration-300", open && "rotate-180")}
            aria-hidden="true"
          />
        </button>

        <div
          id={`${level.id}-content`}
          className={cn(
            "grid transition-all duration-500 ease-out",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div className="space-y-7 p-6 md:p-8">
              {level.groups.map((group) => (
                <div key={group.heading} className="flex flex-col gap-4">
                  <h4 className="flex items-center gap-3">
                    <span className="gold-hairline w-6" aria-hidden="true" />
                    <span className="font-display text-base font-bold text-navy-900">
                      {group.heading}
                    </span>
                  </h4>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-xl bg-ivory px-4 py-3 text-sm leading-snug text-navy-800"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600">
                          <Check className="h-3 w-3 text-navy-950" strokeWidth={3} aria-hidden="true" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Program() {
  return (
    <section
      id="programme"
      className="relative scroll-mt-24 bg-gradient-to-b from-white via-ivory to-white py-20 md:py-28"
    >
      <div className="bg-fractal-light absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          aida="interest"
          eyebrow="Programme de la formation"
          title="Trois niveaux,"
          highlight="une progression maîtrisée"
          description="Du socle fondamental au perfectionnement avancé, chaque niveau s'appuie sur le précédent. Le contenu détaillé ci-dessous reprend le programme officiel de la formation — dépliez chaque niveau pour le découvrir."
        />

        <div className="flex flex-col gap-8 lg:gap-10">
          {PROGRAM_LEVELS.map((level, i) => (
            <LevelCard key={level.id} level={level} index={i} />
          ))}
        </div>

        {/* Programme officiel — demande par WhatsApp */}
        <Reveal delay={160}>
          <aside className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-5 rounded-2xl border border-gold-400/40 bg-navy-900 p-7 text-center shadow-lg shadow-navy-900/15 md:mt-16 md:p-8">
            <FileText className="h-8 w-8 text-gold-400" aria-hidden="true" />
            <p className="max-w-xl text-sm leading-relaxed text-azure-100/85 md:text-base">
              Vous souhaitez le <strong className="text-white">programme officiel détaillé</strong>{" "}
              (horaires, organisation des trois journées, travaux pratiques) ?
              Il vous est remis lors de votre inscription — demandez-le
              directement par WhatsApp.
            </p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex min-h-12 items-center gap-3 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 px-7 py-3 text-sm font-semibold text-navy-950 shadow-md shadow-gold-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Demander le programme détaillé
            </a>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
