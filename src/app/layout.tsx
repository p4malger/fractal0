import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SITE_URL } from "@/lib/course-data";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
  title:
    "Approches Quantiques Fractales – Application médicale | GO Healthy Academy",
  description:
    "Formation réservée aux médecins et professionnels de santé : Approches Quantiques Fractales – Application médicale, animée par le Dr. Mohamed HADDAD. Du 1er au 3 octobre 2026 à l'Hôtel El Hani (4★), Mohammadia, Alger. Tarif de lancement : 67 000 DZD au lieu de 120 000 DZD. Fondements scientifiques, pratique clinique et approche holistique. Inscription : formulaire en ligne ou WhatsApp 0657 86 74 44.",
  keywords: [
    "Approches Quantiques Fractales",
    "formation médecins",
    "application médicale",
    "Dr Mohamed HADDAD",
    "GO Healthy Academy",
    "formation santé Alger",
    "homéodynamique",
    "Fractals",
    "physique quantique",
    "Hôtel El Hani Mohammadia",
    "octobre 2026",
  ],
  authors: [{ name: "GO Healthy Academy" }],
  creator: "GO Healthy Academy",
  publisher: "GO Healthy Academy",
  category: "education",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title:
      "Approches Quantiques Fractales – Application médicale | GO Healthy Academy",
    description:
      "Formation pour médecins et professionnels de santé animée par le Dr. Mohamed HADDAD — 1, 2, 3 octobre 2026, Hôtel El Hani (4★), Mohammadia, Alger. Tarif de lancement : 67 000 DZD au lieu de 120 000 DZD. Fondements Scientifiques • Pratique Clinique • Approche Holistique.",
    url: "/",
    siteName: "GO Healthy Academy",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/images/hero-dna-fractal.png",
        width: 864,
        height: 1152,
        alt: "ADN et géométrie fractale — Approches Quantiques Fractales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Approches Quantiques Fractales – Application médicale | GO Healthy Academy",
    description:
      "Formation pour médecins et professionnels de santé — Dr. Mohamed HADDAD. 1, 2, 3 octobre 2026, Hôtel El Hani (4★), Alger. Tarif de lancement : 67 000 DZD.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        {/* Active les animations d'apparition uniquement si JS est présent
            (sinon le contenu reste intégralement visible — SEO-safe) */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
