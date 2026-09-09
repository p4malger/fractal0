"use client";

import { useState } from "react";
import { Copy, Check, Landmark, Wallet } from "lucide-react";
import { PAYMENT } from "@/lib/course-data";
import { cn } from "@/lib/utils";

/**
 * ══════════════════════════════════════════════════════════════
 *  CARTE DE PAIEMENT — CCP / BaridiMob (étape « Action » AIDA)
 * ──────────────────────────────────────────────────────────────
 *  Affiche les coordonnées bancaires pour le versement de l'acompte,
 *  avec bouton « copier » sur chaque ligne (CCP, clé, RIP).
 *  ✏️ Toutes les valeurs proviennent de src/lib/course-data.ts → PAYMENT
 *  💳 كل معلومات الدفع معدلة من ملف course-data.ts فقط
 * ══════════════════════════════════════════════════════════════
 */

interface CopyRowProps {
  label: string;
  value: string;
  copyValue?: string;
  mono?: boolean;
  dark?: boolean;
}

function CopyRow({ label, value, copyValue, mono = true, dark = true }: CopyRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = copyValue ?? value;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback pour les navigateurs sans Clipboard API
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copier ${label} : ${value}`}
      className={cn(
        "group/row flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200",
        dark
          ? "border-white/10 bg-white/[0.05] hover:border-gold-500/45 hover:bg-gold-500/10"
          : "border-navy-100 bg-ivory hover:border-gold-400/60 hover:bg-gold-100/50"
      )}
    >
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span
          className={cn(
            "text-[0.62rem] font-semibold uppercase tracking-[0.16em]",
            dark ? "text-azure-200/60" : "text-navy-700/60"
          )}
        >
          {label}
        </span>
        {/* 📱 mobile: police légèrement réduite + retour à la ligne autorisé
            → le numéro RIP/CCP reste TOUJOURS entièrement lisible (jamais coupé) */}
        <span
          className={cn(
            "text-[0.8rem] font-bold tabular-nums sm:text-sm",
            mono && "break-all sm:tracking-wider",
            dark ? "text-white" : "text-navy-900"
          )}
        >
          {value}
        </span>
      </span>
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors",
          copied
            ? "border-jade-400/60 bg-jade-500/15 text-jade-400"
            : dark
              ? "border-white/15 bg-white/[0.04] text-azure-200/70 group-hover/row:border-gold-500/40 group-hover/row:text-gold-300"
              : "border-navy-200 bg-white text-navy-500 group-hover/row:border-gold-500/50 group-hover/row:text-gold-700"
        )}
        aria-hidden="true"
      >
        {copied ? <Check className="h-4 w-4" strokeWidth={2.5} /> : <Copy className="h-3.5 w-3.5" />}
      </span>
    </button>
  );
}

interface PaymentCardProps {
  /** true → fond sombre (sections bleu marine) · false → fond clair */
  dark?: boolean;
  className?: string;
  /** Affiche l'en-tête « Informations de paiement » */
  showHeader?: boolean;
}

export function PaymentCard({
  dark = true,
  className,
  showHeader = true,
}: PaymentCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3.5",
        dark ? "rounded-2xl border border-white/10 bg-navy-900/50 p-5 backdrop-blur-sm md:p-6" : "p-0",
        className
      )}
    >
      {showHeader && (
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
              dark
                ? "border-gold-500/45 bg-gold-500/12 text-gold-400"
                : "border-gold-500/45 bg-gold-500/10 text-gold-700"
            )}
          >
            <Landmark className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-0.5">
            <h3
              className={cn(
                "font-display text-base font-bold md:text-lg",
                dark ? "text-white" : "text-navy-900"
              )}
            >
              {PAYMENT.title}
            </h3>
            <p
              className={cn(
                "text-xs",
                dark ? "text-azure-200/65" : "text-navy-700/65"
              )}
            >
              {PAYMENT.holder} — {PAYMENT.city}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2.5">
        <CopyRow
          label="N° CCP"
          value={`${PAYMENT.ccpNumber} clé ${PAYMENT.ccpKey}`}
          copyValue={`${PAYMENT.ccpNumber} ${PAYMENT.ccpKey}`}
          dark={dark}
        />
        <CopyRow label="Titulaire" value={PAYMENT.holder} mono={false} dark={dark} />
        <CopyRow label="Ville" value={PAYMENT.city} mono={false} dark={dark} />
        <CopyRow
          label={PAYMENT.ripLabel}
          value={PAYMENT.rip}
          dark={dark}
        />
      </div>

      <p
        className={cn(
          "flex items-start gap-2.5 rounded-xl px-3.5 py-3 text-xs leading-relaxed",
          dark
            ? "bg-gold-500/10 text-azure-100/80"
            : "bg-gold-100/70 text-navy-800"
        )}
      >
        <Wallet
          className={cn("mt-0.5 h-4 w-4 shrink-0", dark ? "text-gold-400" : "text-gold-700")}
          aria-hidden="true"
        />
        Versement de l&apos;acompte de réservation — le reçu est ensuite à
        envoyer par WhatsApp pour confirmer votre place.
      </p>
    </div>
  );
}
