import Image from "next/image";
import { Calendar, MapPin, UserRound, ChevronDown, ArrowRight, Sparkles, BadgePercent } from "lucide-react";
import { COURSE, PRICING, IMAGES, CONTACT, whatsappUrl, AIDA_STEPS, SHOW_AIDA_STEPS } from "@/lib/course-data";
import { Reveal } from "./reveal";
import { WhatsAppIcon } from "./brand";
import { TrainerPortrait } from "./trainer-portrait";

/**
 * HERO — « ATTENTION » (étape 01 du modèle AIDA).
 * Fond bleu marine profond, halos or/bleu clair, motif fractal discret,
 * visuel ADN + portrait du formateur (photo officielle),
 * ancre tarif — 67 000 DZD au lieu de 120 000 DZD.
 * ✏️ Images pilotables depuis /admin (images.heroImage / trainerPhoto).
 */
export function Hero({
  heroImage,
  trainerPhoto,
}: {
  heroImage?: string;
  trainerPhoto?: string;
}) {
  const heroSrc = heroImage?.trim() || IMAGES.heroImage;
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-navy-950 pb-20 pt-28 md:pb-28 md:pt-36 lg:pb-32"
    >
      {/* Fond : motif fractal + halos */}
      <div className="bg-fractal-dark absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-gold-500/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-56 -left-40 h-[30rem] w-[30rem] rounded-full bg-azure-500/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8 xl:gap-16">
        {/* ---------- Colonne texte ---------- */}
        {/* 📱 min-w-0 : la colonne ne peut jamais dépasser la grille mobile */}
        <div className="flex min-w-0 flex-col items-start gap-7">
          {SHOW_AIDA_STEPS && (
            <Reveal>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-gold-500/45 bg-gold-500/10 px-4 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-gold-300">
                <span className="text-gold-gradient font-display text-sm font-bold tracking-normal">
                  {AIDA_STEPS.attention.step}
                </span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold-400/70" />
                {AIDA_STEPS.attention.label}
              </p>
            </Reveal>
          )}

          <Reveal delay={90}>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-2 text-xs font-semibold tracking-wider text-gold-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-soft absolute inline-flex h-full w-full rounded-full bg-gold-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
              </span>
              FORMATION POUR PROFESSIONNELS DE SANTÉ
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              Approches
              <br className="hidden sm:block" /> Quantiques{" "}
              <span className="text-gold-gradient">Fractales</span>
              <span className="mt-3 flex items-baseline gap-3 text-2xl font-semibold italic text-azure-200/90 sm:text-3xl lg:text-[2rem]">
                <span className="gold-hairline hidden w-10 sm:inline-block" aria-hidden="true" />
                Application médicale
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            {/* 📱 flex-wrap : chaque segment reste entier mais passe à la ligne
                sur mobile — la tagline ne peut plus dépasser l'écran */}
            <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1.5 text-sm font-medium uppercase tracking-[0.18em] text-azure-300/85 sm:text-base">
              {COURSE.tagline.split(" • ").map((part, i, arr) => (
                <span key={part} className="whitespace-nowrap">
                  {i > 0 && (
                    <span className="mx-2.5 text-gold-500" aria-hidden="true">
                      •
                    </span>
                  )}
                  {part}
                </span>
              ))}
            </p>
          </Reveal>

          <Reveal delay={220}>
            <ul className="flex flex-wrap items-center gap-3 text-sm">
              <li className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-azure-100 backdrop-blur-sm">
                <Calendar className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                <span className="font-semibold text-white">{COURSE.dates}</span>
              </li>
              <li className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-azure-100 backdrop-blur-sm">
                <MapPin className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                <span>Hôtel El Hani (4★) · Mohammadia, Alger</span>
              </li>
              <li className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-azure-100 backdrop-blur-sm">
                <UserRound className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                <span>{COURSE.trainer}</span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={260}>
            {/* Ancre tarif — tarif de lancement */}
            <div className="flex w-full max-w-xl flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border border-gold-500/40 bg-gradient-to-br from-gold-500/15 via-navy-900/50 to-navy-900/20 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold-500/45 bg-gold-500/15">
                  <BadgePercent className="h-5 w-5 text-gold-400" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="eyebrow-label text-[0.58rem] text-gold-300">
                    {PRICING.offerLabel}
                  </span>
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-display text-3xl font-bold leading-none text-gold-gradient sm:text-4xl">
                      {PRICING.currentPrice}
                      <span className="ml-1.5 text-base font-semibold sm:text-lg">{PRICING.currency}</span>
                    </span>
                    <span className="text-sm text-azure-200/55 line-through decoration-gold-500/60">
                      {PRICING.originalPrice} {PRICING.currency}
                    </span>
                  </span>
                </div>
              </div>
              <span className="btn-shine inline-flex items-center rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 px-3.5 py-1.5 text-xs font-bold text-navy-950 shadow-md shadow-gold-500/25">
                {PRICING.discountPercent}
              </span>
              <span className="flex items-center gap-2 text-xs text-azure-200/75">
                <Sparkles className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
                Acompte de réservation : {PRICING.depositAmount} {PRICING.currency}
              </span>
            </div>
          </Reveal>

          <Reveal delay={300} className="flex w-full flex-col items-start gap-4 pt-1 sm:flex-row sm:items-center">
            {/* CTA principal → formulaire d'inscription (étape Action) */}
            <a
              href="#inscription"
              className="btn-shine group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 px-6 py-4 text-base font-semibold tracking-wide text-navy-950 shadow-lg shadow-gold-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/35 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500 sm:px-8"
            >
              <span>JE M&apos;INSCRIS À LA FORMATION</span>
              <ArrowRight
                className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href="#programme"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-azure-300/30 bg-transparent px-7 py-4 text-sm font-semibold text-azure-100 transition-all duration-300 hover:border-gold-500/50 hover:bg-white/5 hover:text-gold-300"
            >
              Découvrir le programme
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal delay={360}>
            <p className="flex flex-wrap items-center gap-2.5 text-xs text-azure-200/60">
              <span className="animate-glow-gold inline-flex items-center rounded-full border border-gold-500/50 bg-gold-500/10 px-3 py-1 font-semibold uppercase tracking-widest text-gold-300">
                Places limitées
              </span>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 underline decoration-gold-500/40 underline-offset-4 transition-colors hover:text-gold-300"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                Ou réservez directement par WhatsApp : {CONTACT.whatsappDisplay}
              </a>
            </p>
          </Reveal>
        </div>

        {/* ---------- Colonne visuelle ---------- */}
        <Reveal delay={200} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative">
            {/* Visuel ADN / fractale dans un cadre luxueux */}
            <div className="relative overflow-hidden rounded-3xl border border-gold-500/35 shadow-2xl shadow-navy-950/60">
              <Image
                src={heroSrc}
                alt="Illustration scientifique : double hélice d'ADN associée à une géométrie fractale dorée sur fond bleu marine"
                width={864}
                height={1152}
                priority
                sizes="(max-width: 1024px) 92vw, 44vw"
                className="h-auto w-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent"
                aria-hidden="true"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-[0.65rem] font-medium uppercase tracking-[0.2em] text-azure-200/80">
                <span>ADN · Géométrie fractale</span>
                <span className="text-gold-300">Physique quantique</span>
              </div>
            </div>

            {/* Badge flottant : durée */}
            <div
              className="animate-float-slow absolute -right-3 -top-4 hidden rounded-2xl border border-gold-500/40 bg-navy-900/90 px-5 py-3.5 text-center shadow-xl shadow-navy-950/50 backdrop-blur-md sm:block md:-right-6"
              aria-hidden="true"
            >
              <p className="font-display text-2xl font-bold text-gold-gradient">3</p>
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-azure-200">
                journées · 3 niveaux
              </p>
            </div>

            {/* Carte formateur flottante */}
            <div className="absolute -bottom-10 -left-3 w-44 overflow-hidden rounded-2xl border border-gold-500/40 bg-navy-950/85 shadow-2xl shadow-navy-950/70 backdrop-blur-xl sm:-left-10 sm:w-48">
              <TrainerPortrait compact photo={trainerPhoto} className="aspect-[4/5] rounded-none border-0" />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Séparateur doré bas de hero */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" aria-hidden="true" />
    </section>
  );
}
