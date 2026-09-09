import Image from "next/image";
import { Calendar, MapPin, UserRound, Phone, BadgePercent, ArrowUp, PenLine } from "lucide-react";
import { COURSE, CONTACT, PRICING, IMAGES } from "@/lib/course-data";
import { Reveal } from "./reveal";
import { WhatsAppIcon } from "./brand";
import { whatsappUrl } from "@/lib/course-data";

/**
 * CTA FINAL — « ACTION » (étape 04 du modèle AIDA).
 * « Réservez votre place dès maintenant » — urgence maîtrisée
 * (Places limitées), rappel du tarif de lancement et de l'acompte,
 * double chemin de conversion : formulaire ou WhatsApp direct.
 * ✏️ Fond pilotable depuis /admin (images.ctaBackground).
 */
export function FinalCta({ background }: { background?: string }) {
  const bgSrc = background?.trim() || IMAGES.ctaBackground;
  return (
    <section
      id="inscription-cta"
      className="relative scroll-mt-24 overflow-hidden bg-navy-950 py-20 md:py-28"
    >
      {/* Fond : visuel fractal assombri */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={bgSrc}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/70 to-navy-950" />
      </div>
      <div className="bg-fractal-dark absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 text-center sm:px-6">
        <Reveal>
          <p className="animate-glow-gold inline-flex items-center gap-2.5 rounded-full border border-gold-500/60 bg-gold-500/10 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.22em] text-gold-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse-soft absolute inline-flex h-full w-full rounded-full bg-gold-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
            </span>
            Places limitées
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-5xl">
            Réservez votre place
            <span className="block text-gold-gradient">dès maintenant</span>
          </h2>
        </Reveal>

        <Reveal delay={170}>
          <p className="max-w-2xl text-base leading-relaxed text-azure-100/80 md:text-lg">
            Rejoignez les médecins et professionnels de santé qui
            s&apos;inscrivent aux <strong className="text-white">1er, 2 et 3
            octobre 2026</strong> pour trois journées de fondements
            scientifiques, de pratique clinique et d&apos;approche holistique,
            animées par le Dr. Mohamed HADDAD.
          </p>
        </Reveal>

        <Reveal delay={220}>
          {/* Rappel tarif de lancement */}
          <div className="mx-auto flex max-w-xl flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border border-gold-500/40 bg-gold-500/10 px-6 py-4 backdrop-blur-sm">
            <span className="flex items-center gap-2 text-sm font-semibold text-azure-100">
              <BadgePercent className="h-4 w-4 text-gold-400" aria-hidden="true" />
              {PRICING.offerLabel}
            </span>
            <span className="flex items-baseline gap-2.5">
              <span className="font-display text-2xl font-bold leading-none text-gold-gradient">
                {PRICING.currentPrice} {PRICING.currency}
              </span>
              <span className="text-sm text-azure-200/50 line-through decoration-gold-500/60">
                {PRICING.originalPrice} {PRICING.currency}
              </span>
              <span className="rounded-full bg-gradient-to-br from-gold-300 to-gold-600 px-2.5 py-0.5 text-[0.68rem] font-bold text-navy-950">
                {PRICING.discountPercent}
              </span>
            </span>
            <span className="w-full text-xs text-azure-100/70 sm:w-auto">
              Acompte de réservation : {PRICING.depositAmount} {PRICING.currency}
            </span>
          </div>
        </Reveal>

        <Reveal delay={230}>
          <ul className="grid w-full max-w-2xl gap-3 text-left sm:grid-cols-3">
            {[
              { icon: Calendar, label: COURSE.dates },
              { icon: MapPin, label: "Hôtel El Hani (4★) · Alger" },
              { icon: UserRound, label: COURSE.trainer },
            ].map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-azure-100 backdrop-blur-sm"
              >
                <item.icon className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                <span className="font-medium">{item.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Double conversion : formulaire (principal) + WhatsApp (direct) */}
        <Reveal delay={300} className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <a
            href="#inscription"
            className="btn-shine group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 px-8 py-4 text-base font-bold uppercase tracking-wide text-navy-950 shadow-lg shadow-gold-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold-500/35 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500"
          >
            <PenLine className="h-5 w-5 shrink-0" aria-hidden="true" />
            Remplir le formulaire d&apos;inscription
            <ArrowUp
              className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-1"
              aria-hidden="true"
            />
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Inscription à la formation par WhatsApp"
            className="btn-shine inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#25D366]/50 bg-[#25D366]/12 px-8 py-4 text-base font-semibold text-[#7ee2a8] backdrop-blur-sm transition-all duration-300 hover:border-[#25D366]/70 hover:bg-[#25D366]/20 hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0" />
            WhatsApp direct
          </a>
        </Reveal>

        <Reveal delay={350}>
          <p className="flex items-center gap-2 text-sm text-azure-200/65">
            <Phone className="h-4 w-4 text-gold-400" aria-hidden="true" />
            Inscription et renseignements : {CONTACT.whatsappDisplay}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
