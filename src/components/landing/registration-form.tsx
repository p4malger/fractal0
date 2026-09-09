"use client";

import { useState, type ChangeEvent, type ComponentType, type FormEvent } from "react";
import {
  Calendar,
  MapPin,
  UserRound,
  Layers,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  Send,
  PenLine,
  Phone,
  Mail,
  BriefcaseMedical,
  MessageSquareText,
  ArrowLeftRight,
  ClipboardCheck,
  Landmark,
} from "lucide-react";
import {
  COURSE,
  PRICING,
  CONTACT,
  FORM_PROFESSIONS,
  FORM_LEVELS,
  whatsappRegistrationUrl,
  whatsappUrl,
  type RegistrationData,
} from "@/lib/course-data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { PaymentCard } from "./payment-card";
import { WhatsAppIcon } from "./brand";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

/**
 * ══════════════════════════════════════════════════════════════
 *  FORMULAIRE D'INSCRIPTION — étape « ACTION » (AIDA)
 * ──────────────────────────────────────────────────────────────
 *  1. Le participant remplit ses coordonnées (validation locale).
 *  2. L'envoi ouvre WhatsApp avec un message pré-rempli complet.
 *  3. Le panneau de confirmation rappelle l'acompte (CCP/BaridiMob).
 *  ✏️ Champs, professions et niveaux : course-data.ts
 *     (FORM_PROFESSIONS / FORM_LEVELS / PRICING / PAYMENT)
 * ══════════════════════════════════════════════════════════════
 */

const FIELD =
  "min-h-12 w-full rounded-xl border border-navy-200 bg-white px-4 text-sm text-navy-900 shadow-sm shadow-navy-900/5 outline-none transition-all duration-200 placeholder:text-navy-300 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/25";

const ICON_FIELD = "pl-11";

interface FieldIconProps {
  icon: ComponentType<{ className?: string }>;
}

function FieldIcon({ icon: Icon }: FieldIconProps) {
  return (
    <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" aria-hidden="true" />
  );
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-xs font-medium text-red-700">
      {message}
    </p>
  );
}

export function RegistrationForm() {
  const [values, setValues] = useState<RegistrationData>({
    name: "",
    phone: "",
    email: "",
    profession: "",
    city: "",
    level: FORM_LEVELS[0],
    message: "",
  });
  // ✅ Consentement coché d'avance — الموافقة مفعّلة تلقائيًا
  const [consent, setConsent] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const set = (key: keyof RegistrationData) => (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((err) => {
      const next = { ...err };
      delete next[key];
      return next;
    });
  };

  function validate(): Record<string, string> {
    const e: Record<string, string> = {};
    if (values.name.trim().length < 3) {
      e.name = "Veuillez indiquer votre nom et prénom.";
    }
    const digits = values.phone.replace(/[^0-9]/g, "");
    if (digits.length < 9) {
      e.phone = "Veuillez indiquer un numéro de téléphone valide.";
    }
    if (
      values.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
    ) {
      e.email = "Adresse email invalide.";
    }
    if (!values.profession) {
      e.profession = "Veuillez choisir votre profession.";
    }
    if (!consent) {
      e.consent = "Merci d'accepter d'être contacté par WhatsApp.";
    }
    return e;
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    const url = whatsappRegistrationUrl(values);
    setResultUrl(url);
    // WhatsApp d'abord (appel synchrone → évite les bloqueurs de pop-up)
    window.open(url, "_blank", "noopener,noreferrer");
    // 💾 Enregistrement silencieux en base de données (tableau de bord /admin)
    fetch("/api/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      keepalive: true,
    }).catch(() => {
      /* l'envoi WhatsApp reste la voie principale — pas d'alerte */
    });
  }

  return (
    <section
      id="inscription"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-white via-ivory to-white py-20 md:py-28"
    >
      <div className="bg-fractal-light absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="absolute -top-24 left-1/2 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-gold-500/8 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          aida="action"
          eyebrow="Inscription en ligne"
          title="Réservez votre place"
          highlight="en deux minutes"
          description={`Remplissez le formulaire ci-dessous : votre demande d'inscription est transmise directement à l'équipe GO Healthy Academy par WhatsApp, avec l'ensemble de vos coordonnées. Réservez ensuite votre place avec l'acompte de ${PRICING.depositAmount} ${PRICING.currency}.`}
        />

        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* ---------- Formulaire ---------- */}
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-gold-400/50 bg-white p-6 shadow-2xl shadow-navy-900/10 md:p-9">
              <div
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
                aria-hidden="true"
              />

              {resultUrl ? (
                /* ══ Panneau de confirmation ══ */
                <div className="flex flex-col items-center gap-6 text-center" role="status">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold-500/50 bg-gold-500/12">
                    <CheckCircle2 className="h-8 w-8 text-gold-500" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-2xl font-bold text-navy-900 md:text-3xl">
                      Votre demande d&apos;inscription est prête
                    </h3>
                    <p className="max-w-md text-sm leading-relaxed text-navy-700/80">
                      WhatsApp s&apos;est ouvert dans un nouvel onglet — appuyez
                      sur «&nbsp;Envoyer&nbsp;» dans WhatsApp pour transmettre
                      votre demande à notre équipe. Si rien ne s&apos;est ouvert,
                      utilisez le bouton ci-dessous.
                    </p>
                  </div>

                  <a
                    href={resultUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shine inline-flex min-h-13 items-center gap-3 rounded-full bg-gradient-to-br from-[#25D366] via-[#1DA851] to-[#128C7E] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#1DA851]/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Ouvrir WhatsApp et envoyer ma demande
                  </a>

                  <div className="gold-hairline w-full" aria-hidden="true" />

                  {/* Étape suivante : l'acompte */}
                  <div className="flex w-full flex-col items-start gap-4 text-left">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-500/45 bg-gold-500/10">
                        <Landmark className="h-5 w-5 text-gold-600" aria-hidden="true" />
                      </span>
                      <div className="flex flex-col">
                        <span className="font-display text-lg font-bold text-navy-900">
                          Étape suivante — l&apos;acompte de réservation
                        </span>
                        <span className="text-sm text-navy-700/75">
                          {PRICING.depositAmount} {PRICING.currency} à verser
                          pour bloquer votre place
                        </span>
                      </div>
                    </div>
                    <PaymentCard dark={false} showHeader={false} />
                    <p className="text-xs leading-relaxed text-navy-700/70">
                      Après votre versement, envoyez le reçu (photo ou capture
                      d&apos;écran) par WhatsApp au{" "}
                      <a
                        href={whatsappUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-gold-700 underline decoration-gold-500/50 underline-offset-4"
                      >
                        {CONTACT.whatsappDisplay}
                      </a>{" "}
                      — votre place est alors définitivement réservée. Le solde
                      de {PRICING.balance} {PRICING.currency} est réglé selon
                      les modalités communiquées lors de la confirmation.
                    </p>
                    <button
                      type="button"
                      onClick={() => setResultUrl(null)}
                      className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-navy-700 underline decoration-navy-300 underline-offset-4 transition-colors hover:text-gold-700"
                    >
                      <PenLine className="h-4 w-4" aria-hidden="true" />
                      Modifier ma demande
                    </button>
                  </div>
                </div>
              ) : (
                /* ══ Formulaire ══ */
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-900">
                      <PenLine className="h-5 w-5 text-gold-400" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col">
                      <h3 className="font-display text-xl font-bold text-navy-900 md:text-2xl">
                        Formulaire d&apos;inscription
                      </h3>
                      <p className="text-xs text-navy-700/65">
                        {COURSE.dates} — {COURSE.venue}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* Nom */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="reg-name" className="text-sm font-semibold text-navy-800">
                        Nom et prénom <span className="text-gold-600">*</span>
                      </Label>
                      <div className="relative">
                        <FieldIcon icon={UserRound} />
                        <Input
                          id="reg-name"
                          autoComplete="name"
                          placeholder="Dr. Nom et prénom"
                          value={values.name}
                          onChange={set("name")}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "reg-name-error" : undefined}
                          className={`${FIELD} ${ICON_FIELD}`}
                        />
                      </div>
                      <ErrorText id="reg-name-error" message={errors.name} />
                    </div>

                    {/* Téléphone */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="reg-phone" className="text-sm font-semibold text-navy-800">
                        Téléphone <span className="text-gold-600">*</span>
                      </Label>
                      <div className="relative">
                        <FieldIcon icon={Phone} />
                        <Input
                          id="reg-phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="06 XX XX XX XX"
                          value={values.phone}
                          onChange={set("phone")}
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "reg-phone-error" : undefined}
                          className={`${FIELD} ${ICON_FIELD}`}
                        />
                      </div>
                      <ErrorText id="reg-phone-error" message={errors.phone} />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="reg-email" className="text-sm font-semibold text-navy-800">
                        Email <span className="font-normal text-navy-400">(optionnel)</span>
                      </Label>
                      <div className="relative">
                        <FieldIcon icon={Mail} />
                        <Input
                          id="reg-email"
                          type="email"
                          autoComplete="email"
                          placeholder="nom@exemple.com"
                          value={values.email}
                          onChange={set("email")}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "reg-email-error" : undefined}
                          className={`${FIELD} ${ICON_FIELD}`}
                        />
                      </div>
                      <ErrorText id="reg-email-error" message={errors.email} />
                    </div>

                    {/* Ville */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="reg-city" className="text-sm font-semibold text-navy-800">
                        Ville / Wilaya <span className="font-normal text-navy-400">(optionnel)</span>
                      </Label>
                      <div className="relative">
                        <FieldIcon icon={MapPin} />
                        <Input
                          id="reg-city"
                          autoComplete="address-level2"
                          placeholder="Ex. Alger"
                          value={values.city}
                          onChange={set("city")}
                          className={`${FIELD} ${ICON_FIELD}`}
                        />
                      </div>
                    </div>

                    {/* Profession */}
                    <div className="flex flex-col gap-2 sm:col-span-2">
                      <Label htmlFor="reg-profession" className="text-sm font-semibold text-navy-800">
                        Profession <span className="text-gold-600">*</span>
                      </Label>
                      <div className="relative">
                        <FieldIcon icon={BriefcaseMedical} />
                        <select
                          id="reg-profession"
                          value={values.profession}
                          onChange={set("profession")}
                          aria-invalid={!!errors.profession}
                          aria-describedby={errors.profession ? "reg-profession-error" : undefined}
                          className={`${FIELD} ${ICON_FIELD} cursor-pointer appearance-none pr-10 ${!values.profession ? "text-navy-300" : ""}`}
                        >
                          <option value="" disabled>
                            Sélectionnez votre profession…
                          </option>
                          {FORM_PROFESSIONS.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400"
                          aria-hidden="true"
                        />
                      </div>
                      <ErrorText id="reg-profession-error" message={errors.profession} />
                    </div>

                    {/* Niveau — un seul choix : affichage fixe (pas de liste déroulante) */}
                    <div className="flex flex-col gap-2 sm:col-span-2">
                      <Label htmlFor="reg-level" className="text-sm font-semibold text-navy-800">
                        Niveau souhaité
                      </Label>
                      <div className="relative">
                        <FieldIcon icon={Layers} />
                        {FORM_LEVELS.length > 1 ? (
                          <>
                            <select
                              id="reg-level"
                              value={values.level}
                              onChange={set("level")}
                              className={`${FIELD} ${ICON_FIELD} cursor-pointer appearance-none pr-10`}
                            >
                              {FORM_LEVELS.map((l) => (
                                <option key={l} value={l}>
                                  {l}
                                </option>
                              ))}
                            </select>
                            <ChevronDown
                              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400"
                              aria-hidden="true"
                            />
                          </>
                        ) : (
                          <div
                            id="reg-level"
                            className={`${FIELD} ${ICON_FIELD} flex items-center justify-between gap-3 bg-ivory`}
                          >
                            <span className="font-semibold text-navy-900">{FORM_LEVELS[0]}</span>
                            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold-500/40 bg-gold-500/12 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-gold-700">
                              <BadgeCheck className="h-3 w-3" aria-hidden="true" />
                              Comprise
                            </span>
                          </div>
                        )}
                      </div>
                      {FORM_LEVELS.length === 1 && (
                        <p className="text-xs leading-relaxed text-navy-700/60">
                          L&apos;inscription couvre l&apos;intégralité des trois niveaux :
                          Niveau 1, Niveau 2 et Niveau 2+ — sans choix séparé à
                          effectuer.
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2 sm:col-span-2">
                      <Label htmlFor="reg-message" className="text-sm font-semibold text-navy-800">
                        Message <span className="font-normal text-navy-400">(optionnel)</span>
                      </Label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-4 text-navy-300">
                          <MessageSquareText className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <Textarea
                          id="reg-message"
                          rows={4}
                          placeholder="Une question, une précision sur votre inscription ?"
                          value={values.message}
                          onChange={set("message")}
                          className={`${FIELD} ${ICON_FIELD} min-h-28 resize-y`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Consentement */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-3 rounded-xl border border-navy-100 bg-ivory p-4">
                      <Checkbox
                        id="reg-consent"
                        checked={consent}
                        onCheckedChange={(c) => {
                          setConsent(c === true);
                          setErrors((err) => {
                            const next = { ...err };
                            delete next.consent;
                            return next;
                          });
                        }}
                        aria-invalid={!!errors.consent}
                        aria-describedby={errors.consent ? "reg-consent-error" : undefined}
                        className="mt-0.5 data-[state=checked]:border-gold-600 data-[state=checked]:bg-gold-500"
                      />
                      <Label
                        htmlFor="reg-consent"
                        className="cursor-pointer text-xs leading-relaxed font-normal text-navy-800"
                      >
                        J&apos;accepte d&apos;être contacté(e) par l&apos;équipe
                        GO Healthy Academy par WhatsApp au{" "}
                        {CONTACT.whatsappDisplay} pour le traitement de mon
                        inscription. Mes coordonnées ne sont utilisées que dans
                        ce cadre et ne sont jamais cédées à des tiers.
                      </Label>
                    </div>
                    <ErrorText id="reg-consent-error" message={errors.consent} />
                  </div>

                  {/* Envoi */}
                  <div className="flex flex-col gap-3">
                    <button
                      type="submit"
                      className="btn-shine group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 px-8 py-4 text-base font-bold uppercase tracking-wide text-navy-950 shadow-lg shadow-gold-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold-500/35 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500"
                    >
                      <Send
                        className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                      Confirmer mon inscription
                    </button>
                    <p className="flex items-center justify-center gap-2 text-center text-xs text-navy-700/60">
                      <ArrowLeftRight className="h-3.5 w-3.5 shrink-0 text-gold-600" aria-hidden="true" />
                      Votre demande s&apos;ouvre dans WhatsApp, prête à être
                      envoyée — vos coordonnées sont enregistrées uniquement
                      pour le traitement de votre inscription.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          {/* ---------- Récapitulatif ---------- */}
          <Reveal delay={130}>
            <aside className="relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 bg-navy-950 p-6 shadow-2xl shadow-navy-900/25 md:p-8">
              <div className="bg-fractal-dark absolute inset-0" aria-hidden="true" />
              <div
                className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gold-500/12 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative flex flex-col gap-1.5">
                <span className="eyebrow-label text-[0.62rem] text-gold-400">
                  Votre inscription en bref
                </span>
                <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                  Approches Quantiques Fractales
                </h3>
                <p className="text-sm text-azure-200/70">
                  {COURSE.subtitle} — {COURSE.tagline.split(" • ")[1]}
                </p>
              </div>

              <ul className="relative flex flex-col gap-3">
                {[
                  { icon: Calendar, label: COURSE.datesFull },
                  { icon: MapPin, label: COURSE.venue },
                  { icon: UserRound, label: `${COURSE.trainer} — formateur` },
                  { icon: Layers, label: COURSE.duration },
                ].map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-azure-100"
                  >
                    <item.icon className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                    <span className="font-medium">{item.label}</span>
                  </li>
                ))}
              </ul>

              <div className="relative rounded-2xl border border-gold-500/40 bg-gradient-to-br from-gold-500/15 via-navy-900/50 to-navy-900/20 p-5">
                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-3xl font-bold leading-none text-gold-gradient">
                    {PRICING.currentPrice}
                    <span className="ml-1.5 text-sm font-semibold">{PRICING.currency}</span>
                  </span>
                  <span className="text-sm text-azure-200/50 line-through decoration-gold-500/60">
                    {PRICING.originalPrice} {PRICING.currency}
                  </span>
                  <span className="rounded-full bg-gradient-to-br from-gold-300 to-gold-600 px-2.5 py-0.5 text-[0.68rem] font-bold text-navy-950">
                    {PRICING.discountPercent}
                  </span>
                </p>
                <p className="mt-2 text-xs text-azure-100/75">
                  {PRICING.depositLabel} :{" "}
                  <strong className="text-gold-300">
                    {PRICING.depositAmount} {PRICING.currency}
                  </strong>{" "}
                  · solde {PRICING.balance} {PRICING.currency}
                </p>
              </div>

              {/* Parcours d'inscription */}
              <div className="relative flex flex-col gap-4">
                <span className="eyebrow-label text-[0.62rem] text-gold-400">
                  Comment ça marche
                </span>
                <ol className="flex flex-col gap-3.5">
                  {[
                    {
                      icon: ClipboardCheck,
                      title: "J'envoie le formulaire",
                      text: "Vos coordonnées s'ouvrent dans WhatsApp, prêtes à être envoyées.",
                    },
                    {
                      icon: Landmark,
                      title: "Je verse l'acompte",
                      text: `${PRICING.depositAmount} ${PRICING.currency} sur CCP ou BaridiMob (détails affichés après l'envoi).`,
                    },
                    {
                      icon: BadgeCheck,
                      title: "Ma place est réservée",
                      text: "Envoyez le reçu par WhatsApp — la confirmation est immédiate.",
                    },
                  ].map((step, i) => (
                    <li key={step.title} className="flex items-start gap-3.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gold-500/45 bg-gold-500/10 font-display text-sm font-bold text-gold-300">
                        {i + 1}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-white">{step.title}</span>
                        <span className="text-xs leading-relaxed text-azure-200/65">{step.text}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-azure-100 backdrop-blur-sm transition-all duration-300 hover:border-gold-500/50 hover:bg-gold-500/10 hover:text-gold-300"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Vous préférez WhatsApp directement ? {CONTACT.whatsappDisplay}
              </a>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
