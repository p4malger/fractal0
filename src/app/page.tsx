import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { InfoBand } from "@/components/landing/info-band";
import { Program } from "@/components/landing/program";
import { Videos } from "@/components/landing/videos";
import { Trainer } from "@/components/landing/trainer";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { Faq } from "@/components/landing/faq";
import { RegistrationForm } from "@/components/landing/registration-form";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";
import { getSiteMedia } from "@/lib/media-store";

/** Médias gérés depuis /admin → onglet « الوسائط » (rendu dynamique) */
export const dynamic = "force-dynamic";

/**
 * Page d'atterrissage — « Approches Quantiques Fractales – Application
 * médicale » · GO Healthy Academy · Dr. Mohamed HADDAD
 * 1, 2, 3 octobre 2026 — Hôtel El Hani (4★), Mohammadia, Alger.
 *
 * ─────────────────────────────────────────────────────────────
 *  STRUCTURE AIDA (Attention → Intérêt → Désir → Action)
 *  01 ATTENTION : Hero (ancre tarif 67 000 DZD) + InfoBand
 *  02 INTÉRÊT   : Programme (3 niveaux)
 *  03 DÉSIR     : Vidéos + Formateur + Témoignages
 *                 + Tarifs & paiement
 *  04 ACTION    : Formulaire d'inscription + CTA final WhatsApp
 *  DERNIÈRE     : FAQ — Questions fréquentes (sur demande client,
 *                 dernière section de la page avant le footer)
 * ─────────────────────────────────────────────────────────────
 */
export default async function Home() {
  /* Médias (vidéos + images) définis depuis la loupe de contrôle /admin,
     avec repli sur les valeurs par défaut de course-data.ts */
  const media = await getSiteMedia();

  /* Données structurées SEO — événement formation */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Approches Quantiques Fractales – Application médicale",
    description:
      "Formation pour médecins et professionnels de santé animée par le Dr. Mohamed HADDAD : fondements scientifiques, pratique clinique et approche holistique. Niveau 1, Niveau 2 et Niveau 2+. Tarif de lancement : 67 000 DZD au lieu de 120 000 DZD.",
    startDate: "2026-10-01",
    endDate: "2026-10-03",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Hôtel El Hani (4★)",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mohammadia, Alger",
        addressCountry: "DZ",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "GO Healthy Academy",
    },
    performer: {
      "@type": "Person",
      name: "Dr. Mohamed HADDAD",
      jobTitle: "Directeur des recherches des laboratoires Fractal",
    },
    inLanguage: "fr",
    offers: {
      "@type": "Offer",
      price: "67000",
      priceCurrency: "DZD",
      availability: "https://schema.org/LimitedAvailability",
      description:
        "Tarif de lancement : 67 000 DZD au lieu de 120 000 DZD (−44 %). Acompte de réservation : 10 000 DZD.",
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Données structurées (SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar showVideosLink={media.videos.length > 0} />

      <main className="flex-1">
        {/* 01 · ATTENTION */}
        <Hero
          heroImage={media.images.heroImage}
          trainerPhoto={media.images.trainerPhoto}
        />
        <InfoBand />

        {/* 02 · INTÉRÊT */}
        <Program />

        {/* 03 · DÉSIR */}
        <Videos videos={media.videos} />
        <Trainer trainerPhoto={media.images.trainerPhoto} />
        <Testimonials />
        <Pricing />

        {/* 04 · ACTION */}
        <RegistrationForm />
        <FinalCta background={media.images.ctaBackground} />

        {/* FAQ — dernière section de la page (sur demande client) */}
        <Faq />
      </main>

      <Footer showVideosLink={media.videos.length > 0} />
    </div>
  );
}
