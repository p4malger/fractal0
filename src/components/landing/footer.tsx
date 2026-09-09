"use client";

import { useState } from "react";
import { NAV_LINKS, CONTACT, COURSE, PAYMENT } from "@/lib/course-data";
import { Logo, WhatsAppIcon } from "./brand";
import { whatsappUrl } from "@/lib/course-data";
import { MapPin, Phone, Globe, ShieldCheck, Scale, Stethoscope, Landmark } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

/* ---------------- Mentions légales ---------------- */

function LegalMentionsDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 text-sm text-azure-200/70 transition-colors hover:text-gold-300"
        >
          <Scale className="h-4 w-4" aria-hidden="true" />
          Mentions légales
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto border border-gold-500/30 bg-navy-950 text-azure-100 [&>button]:rounded-full [&>button]:bg-navy-800/80 [&>button]:text-white">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-bold text-white">
            Mentions légales
          </DialogTitle>
          <DialogDescription className="text-sm text-azure-200/70">
            Éditeur et responsable de publication : GO Healthy Academy
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5 text-sm leading-relaxed text-azure-100/80">
          <section>
            <h3 className="font-display mb-1.5 text-base font-bold text-gold-300">
              Éditeur du site
            </h3>
            <p>
              GO Healthy Academy — Alger, Algérie. Contact : WhatsApp{" "}
              {CONTACT.whatsappDisplay}. Le responsable de la publication est
              l&apos;équipe GO Healthy Academy.
            </p>
          </section>
          <section>
            <h3 className="font-display mb-1.5 text-base font-bold text-gold-300">
              Objet du site
            </h3>
            <p>
              Ce site présente la formation « {COURSE.title} —{" "}
              {COURSE.subtitle} », animée par {COURSE.trainer}, prévue les{" "}
              {COURSE.datesFull} au {COURSE.venue}. Il s&apos;adresse aux
              médecins et professionnels de santé.
            </p>
          </section>
          <section>
            <h3 className="font-display mb-1.5 text-base font-bold text-gold-300">
              Propriété intellectuelle
            </h3>
            <p>
              L&apos;ensemble des contenus (textes, programme, visuels,
              identité visuelle) est la propriété exclusive de GO Healthy
              Academy et de {COURSE.trainer}. Toute reproduction, même
              partielle, sans autorisation écrite préalable est interdite.
            </p>
          </section>
          <section>
            <h3 className="font-display mb-1.5 text-base font-bold text-gold-300">
              Avertissement
            </h3>
            <p>
              Les informations diffusées ont un caractère strictement
              informatif et pédagogique. La formation présentée est une
              formation de perfectionnement destinée aux professionnels de
              santé ; elle ne remplace ni un diagnostic, ni un traitement
              médical conventionnel.
            </p>
          </section>
          <section>
            <h3 className="font-display mb-1.5 text-base font-bold text-gold-300">
              Hébergement
            </h3>
            <p>
              Le site est hébergé sur une infrastructure cloud sécurisée.
              Pour toute question relative au site, contactez GO Healthy
              Academy par WhatsApp.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Politique de confidentialité ---------------- */

function PrivacyDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 text-sm text-azure-200/70 transition-colors hover:text-gold-300"
        >
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Politique de confidentialité
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto border border-gold-500/30 bg-navy-950 text-azure-100 [&>button]:rounded-full [&>button]:bg-navy-800/80 [&>button]:text-white">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-bold text-white">
            Politique de confidentialité
          </DialogTitle>
          <DialogDescription className="text-sm text-azure-200/70">
            Vos données personnelles — GO Healthy Academy
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5 text-sm leading-relaxed text-azure-100/80">
          <section>
            <h3 className="font-display mb-1.5 text-base font-bold text-gold-300">
              Données collectées
            </h3>
            <p>
              Les seules données personnelles que nous recueillons sont celles
              que vous nous transmettez volontairement lors de votre
              inscription — via le formulaire en ligne (nom, profession et
              coordonnées de contact, enregistrés de façon sécurisée pour le
              traitement de votre demande) ou par WhatsApp pour vos demandes
              de renseignements.
            </p>
          </section>
          <section>
            <h3 className="font-display mb-1.5 text-base font-bold text-gold-300">
              Finalité du traitement
            </h3>
            <p>
              Vos données sont utilisées exclusivement pour la gestion de votre
              inscription à la formation, l&apos;envoi d&apos;informations
              pratiques (programme détaillé, horaires, lieu) et le suivi
              administratif de la session. Elles ne sont ni vendues, ni
              cédées, ni utilisées à des fins commerciales tierces.
            </p>
          </section>
          <section>
            <h3 className="font-display mb-1.5 text-base font-bold text-gold-300">
              Cookies et mesure d&apos;audience
            </h3>
            <p>
              Cette page n&apos;utilise pas de cookies publicitaires ni de
              traceurs tiers. Aucune donnée de navigation n&apos;est conservée
              à votre insu.
            </p>
          </section>
          <section>
            <h3 className="font-display mb-1.5 text-base font-bold text-gold-300">
              Vos droits
            </h3>
            <p>
              Conformément à la réglementation applicable en matière de
              protection des données, vous disposez d&apos;un droit
              d&apos;accès, de rectification et de suppression de vos données.
              Pour l&apos;exercer, contactez-nous simplement par WhatsApp au{" "}
              {CONTACT.whatsappDisplay}.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Pied de page ---------------- */

export function Footer({
  showVideosLink = true,
}: {
  /** false → masque le lien « Vidéos » (aucune vidéo enregistrée) */
  showVideosLink?: boolean;
}) {
  const links = showVideosLink
    ? NAV_LINKS
    : NAV_LINKS.filter((l) => l.href !== "#videos");
  return (
    <footer className="relative mt-auto bg-navy-950">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" aria-hidden="true" />
      <div className="bg-fractal-dark absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 md:pt-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_1fr] lg:gap-10">
          {/* Marque */}
          <div className="flex flex-col gap-5">
            <Logo dark />
            <p className="max-w-xs text-sm leading-relaxed text-azure-200/70">
              Institution de formation dédiée aux médecins et professionnels
              de santé, alliant exigence académique, fondements scientifiques
              et approche holistique.
            </p>
            <p className="inline-flex items-center gap-2.5 text-xs text-azure-200/55">
              <Stethoscope className="h-4 w-4 text-gold-500" aria-hidden="true" />
              Formations réservées aux professionnels de santé
            </p>
          </div>

          {/* Contact */}
          <nav aria-label="Coordonnées">
            <h3 className="eyebrow-label mb-5 text-gold-400">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-azure-100/85 transition-colors hover:text-gold-300"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] transition-colors group-hover:border-gold-500/40">
                    <WhatsAppIcon className="h-4 w-4 text-gold-400" />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-semibold text-white">
                      {CONTACT.whatsappDisplay}
                    </span>
                    <span className="text-xs text-azure-200/60">
                      Inscription &amp; renseignements
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-azure-100/85">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06]">
                  <Phone className="h-4 w-4 text-gold-400" aria-hidden="true" />
                </span>
                Alger, Algérie
              </li>
              <li className="flex items-center gap-3 text-sm text-azure-100/85">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06]">
                  <MapPin className="h-4 w-4 text-gold-400" aria-hidden="true" />
                </span>
                Hôtel El Hani (4★), Mohammadia
              </li>
              <li className="flex items-center gap-3 text-sm text-azure-100/85">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06]">
                  <Landmark className="h-4 w-4 text-gold-400" aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="font-semibold text-white">
                    CCP {PAYMENT.ccpNumber} clé {PAYMENT.ccpKey}
                  </span>
                  <span className="text-xs text-azure-200/60">
                    {PAYMENT.holder} — {PAYMENT.city}
                  </span>
                </span>
              </li>
            </ul>
          </nav>

          {/* Liens rapides */}
          <nav aria-label="Liens rapides">
            <h3 className="eyebrow-label mb-5 text-gold-400">Navigation</h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-azure-100/80 transition-colors hover:text-gold-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Légal + site web */}
          <div className="flex flex-col gap-5">
            <h3 className="eyebrow-label text-gold-400">Informations</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={CONTACT.websiteUrl}
                  className="group flex items-center gap-2.5 text-sm text-azure-100/85 transition-colors hover:text-gold-300"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] transition-colors group-hover:border-gold-500/40">
                    <Globe className="h-4 w-4 text-gold-400" aria-hidden="true" />
                  </span>
                  {CONTACT.websiteLabel}
                </a>
              </li>
              <li>
                <LegalMentionsDialog />
              </li>
              <li>
                <PrivacyDialog />
              </li>
            </ul>
          </div>
        </div>

        {/* Barre inférieure */}
        <div className="mt-14 flex flex-col items-center gap-3 border-t border-white/10 pt-8 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-xs text-azure-200/55">
            © 2026 {COURSE.academy} — Tous droits réservés.
          </p>
          <p className="text-xs text-azure-200/45">
            Formation de perfectionnement académique — ne se substitue pas à un
            traitement médical conventionnel.
          </p>
        </div>
      </div>

      {/* Marge de sécurité basse (mobile) */}
      <div className="h-[env(safe-area-inset-bottom)]" aria-hidden="true" />
    </footer>
  );
}
