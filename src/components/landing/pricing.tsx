import { Check, BadgePercent, CalendarDays, ShieldCheck, ArrowRight } from "lucide-react";
import { PRICING, COURSE, CONTACT } from "@/lib/course-data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { PaymentCard } from "./payment-card";
import { WhatsAppIcon } from "./brand";

/**
 * ══════════════════════════════════════════════════════════════
 *  TARIFS & PAIEMENT — fin de l'étape « DÉSIR » (AIDA)
 * ──────────────────────────────────────────────────────────────
 *  L'offre (67 000 DZD au lieu de 120 000 DZD) amplifie le désir ;
 *  l'acompte de 10 000 DZD et les coordonnées CCP préparent l'action.
 *  ✏️ Prix, économie et acompte modifiables dans course-data.ts → PRICING
 * ══════════════════════════════════════════════════════════════
 */
export function Pricing() {
  return (
    <section
      id="tarifs"
      className="relative scroll-mt-24 overflow-hidden bg-navy-950 py-20 md:py-28"
    >
      {/* Fond */}
      <div className="bg-fractal-dark absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -top-24 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-gold-500/8 blur-[110px]"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-azure-500/10 blur-[110px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          aida="desire"
          eyebrow="Tarifs & modalités de paiement"
          title="Un tarif de lancement"
          highlight="réservé aux premières inscriptions"
          description={`La formation complète — trois journées, trois niveaux, travaux pratiques — est proposée au tarif de lancement de ${PRICING.currentPrice} ${PRICING.currency} au lieu de ${PRICING.originalPrice} ${PRICING.currency}. Réservez votre place avec un acompte de ${PRICING.depositAmount} ${PRICING.currency}.`}
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* ---------- Carte tarif ---------- */}
          <Reveal className="min-w-0">
            <article className="relative flex h-full min-w-0 flex-col gap-6 overflow-hidden rounded-3xl border border-gold-500/40 bg-gradient-to-br from-navy-900/85 via-navy-900/60 to-navy-800/40 p-5 shadow-2xl shadow-navy-950/50 backdrop-blur-sm sm:p-7 md:gap-7 md:p-9">
              {/* Halo décoratif */}
              <div
                className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold-500/12 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative flex flex-wrap items-start justify-between gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/50 bg-gold-500/12 px-4 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold-300">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                  {PRICING.offerLabel}
                </span>
                <span className="btn-shine inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 px-4 py-1.5 text-sm font-bold text-navy-950 shadow-md shadow-gold-500/30">
                  <BadgePercent className="h-4 w-4" aria-hidden="true" />
                  {PRICING.discountPercent}
                </span>
              </div>

              {/* Bloc prix */}
              <div className="relative flex flex-col gap-2">
                <p className="text-sm font-medium text-azure-200/70">
                  Tarif de la formation complète
                </p>
                <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-display text-5xl font-bold leading-none text-gold-gradient md:text-6xl">
                    {PRICING.currentPrice}
                    <span className="ml-2 text-xl font-semibold md:text-2xl">
                      {PRICING.currency}
                    </span>
                  </span>
                  <span className="text-lg text-azure-200/50 line-through decoration-gold-500/70 md:text-xl">
                    {PRICING.originalPrice} {PRICING.currency}
                  </span>
                </p>
                <p className="text-sm font-semibold text-jade-300">
                  Économie de {PRICING.savings} {PRICING.currency}
                </p>
              </div>

              <div className="gold-hairline relative w-full" aria-hidden="true" />

              {/* Inclus */}
              <ul className="relative flex flex-col gap-3">
                {PRICING.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-snug text-azure-100/90"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600">
                      <Check className="h-3 w-3 text-navy-950" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Acompte + CTA */}
              <div className="relative mt-auto flex flex-col gap-4 border-t border-white/10 pt-6">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-azure-100/85">
                  <span className="font-bold text-gold-300">
                    Acompte de réservation : {PRICING.depositAmount} {PRICING.currency}
                  </span>
                  <span className="text-azure-200/60">
                    · solde de {PRICING.balance} {PRICING.currency}
                  </span>
                </p>
                <a
                  href="#inscription"
                  className="btn-shine group inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-navy-950 shadow-lg shadow-gold-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold-500/35 sm:w-auto"
                >
                  Je réserve ma place
                  <ArrowRight
                    className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
                <p className="flex items-center gap-2 text-xs text-azure-200/55">
                  <ShieldCheck className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
                  Places limitées — l&apos;acompte garantit votre participation
                </p>
              </div>
            </article>
          </Reveal>

          {/* ---------- Carte paiement ---------- */}
          <Reveal delay={130} className="min-w-0">
            <article className="flex h-full min-w-0 flex-col gap-6 rounded-3xl border border-white/12 bg-navy-900/55 p-5 shadow-2xl shadow-navy-950/50 backdrop-blur-sm sm:p-7 md:p-9">
              <div className="flex flex-col gap-2">
                <span className="eyebrow-label text-[0.62rem] text-gold-400">
                  Réserver votre place
                </span>
                <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
                  Un acompte de{" "}
                  <span className="text-gold-gradient">
                    {PRICING.depositAmount} {PRICING.currency}
                  </span>{" "}
                  suffit
                </h3>
                <p className="text-sm leading-relaxed text-azure-100/75">
                  Pour bloquer votre place dans la session d&apos;
                  {COURSE.datesFull.toLowerCase()}, versez l&apos;acompte sur le
                  compte ci-dessous (guichet CCP ou application BaridiMob),
                  puis envoyez le reçu par WhatsApp au {CONTACT.whatsappDisplay}.
                </p>
              </div>

              <PaymentCard dark />

              <p className="mt-auto rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-xs leading-relaxed text-azure-200/70">
                Le solde de{" "}
                <strong className="text-white">
                  {PRICING.balance} {PRICING.currency}
                </strong>{" "}
                est réglé selon les modalités communiquées lors de la
                confirmation de votre inscription. Une question sur le
                paiement ?{" "}
                <a
                  href={`https://wa.me/${CONTACT.whatsappIntl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-gold-300 underline decoration-gold-500/40 underline-offset-4 transition-colors hover:text-gold-200"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                  Écrivez-nous
                </a>
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
