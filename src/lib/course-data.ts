/**
 * ============================================================
 *  GO HEALTHY ACADEMY — Configuration centrale de la page
 *  « Approches Quantiques Fractales – Application médicale »
 * ------------------------------------------------------------
 *  ✏️  CE FICHIER CONTIENT TOUT LE CONTENU MODIFIABLE :
 *  • Tarifs (prix actuel / prix barré / acompte) — الأسعار
 *  • Coordonnées de paiement CCP / BaridiMob — معلومات الدفع
 *  • Champs du formulaire d'inscription — حقول نموذج التسجيل
 *  • Liens YouTube (section vidéos) — روابط الفيديو
 *  • Images (photo du formateur, visuels) — الصور
 *  ✨ يمكن الآن إدارة روابط الفيديو والصور من لوحة التحكم /admin (تبويب الوسائط)
 *     بدون تعديل أي كود — هذا الملف يبقى كإعداد افتراضي احتياطي
 *  • Programme des niveaux (Niveau 1, 2, 2+) — البرنامج
 *  • Témoignages (à compléter) — الشهادات
 *  • Coordonnées WhatsApp — رقم واتساب
 *  Structure de la page : modèle AIDA (Attention → Intérêt → Désir → Action)
 *  ⚠️ لا تغيّر أي شيء خارج هذا الملف إن أردت فقط تحديث المحتوى
 * ============================================================
 */

/* ------------------- Coordonnées & inscription ------------------- */

/**
 * ⚠️ URL du site officiel — à renseigner au déploiement.
 * (utilisée pour le SEO, Open Graph et le lien du pied de page)
 * رابط الموقع الرسمي — تم تعيينه من الملصق الرسمي، تحقّق منه عند الحاجة
 */
export const SITE_URL = "https://www.fractalnutra.com";

export const CONTACT = {
  whatsappDisplay: "0657 86 74 44",
  whatsappIntl: "213657867444", // +213 6 57 86 74 44
  whatsappMessage:
    "Bonjour, je souhaite m'inscrire à la formation « Approches Quantiques Fractales – Application médicale » (1, 2, 3 octobre 2026 – Hôtel El Hani, Mohammadia, Alger).",
  city: "Alger, Algérie",
  // ⚠️ Remplacez par l'URL réelle du site institutionnel (ou renseignez SITE_URL)
  websiteUrl: SITE_URL || "#",
  websiteLabel: "www.fractalnutra.com",
} as const;

export function whatsappUrl(): string {
  return `https://wa.me/${CONTACT.whatsappIntl}?text=${encodeURIComponent(
    CONTACT.whatsappMessage
  )}`;
}

/* ------------------- Tarifs — الأسعار -------------------
 * ✏️ سعر الدورة: غيّر القيم هنا فقط وستتحدث تلقائيًا في كامل الصفحة
 * ---------------------------------------------------------------- */

export const PRICING = {
  currency: "DZD",
  currentPrice: "67 000", // ← السعر الحالي بعد التخفيض (بالدج)
  originalPrice: "120 000", // ← السعر الأصلي (يظهر مشطوبًا)
  savings: "53 000", // ← مبلغ التوفير
  discountPercent: "−44 %", // ← نسبة التخفيض
  offerLabel: "Tarif de lancement", // ← عنوان العرض
  /**
   * Acompte de réservation — عربون حجز المكان
   * المبلغ الذي يُطلب من المشارك لحجز مكانه قبل الدورة
   */
  depositAmount: "10 000", // ← مبلغ العربون
  depositLabel: "Acompte de réservation",
  balance: "57 000", // ← المتبقي بعد العربون
  includes: [
    "Les 3 journées de formation — 1er, 2 et 3 octobre 2026",
    "L'accès aux trois niveaux : Niveau 1, Niveau 2 et Niveau 2+",
    "Les travaux pratiques encadrés par le formateur",
    "L'attestation de participation",
  ],
} as const;

/* ------------------- Paiement — معلومات الدفع -------------------
 * ✏️ معلومات الحساب البريدي CCP / BaridiMob لتسديد عربون الحجز
 * ---------------------------------------------------------------- */

export const PAYMENT = {
  title: "Informations de paiement CCP / BaridiMob",
  ccpNumber: "9539544", // رقم الحساب البريدي
  ccpKey: "66", // مفتاح الحساب
  holder: "Kerkatou Chouaib", // اسم صاحب الحساب
  city: "Alger", // المدينة
  rip: "00799999000953954466", // رقم RIP / BaridiMob
  ripLabel: "BaridiMob / RIP",
} as const;

/* ------------------- Formulaire d'inscription — نموذج التسجيل -------------------
 * ✏️ خيارات المهن والمستويات في القائمتين المنسدلتين
 * ---------------------------------------------------------------- */

export const FORM_PROFESSIONS = [
  "Médecin",
  "Pharmacien",
  "Chirurgien-dentiste",
  "Biologiste",
  "Infirmier / Infirmière",
  "Paramédical",
  "Autre professionnel de santé",
] as const;

export const FORM_LEVELS = [
  // ✏️ خيار واحد فقط: كل المستويات 1 و 2 و 2+
  // لإعادة خيارات متعددة، أضف عناصر جديدة للمصفوفة وستظهر القائمة المنسدلة تلقائيًا
  "Formation complète — Niveaux 1, 2 et 2+",
] as const;

export interface RegistrationData {
  name: string;
  phone: string;
  email: string;
  profession: string;
  city: string;
  level: string;
  message: string;
}

/**
 * Génère le lien WhatsApp pré-rempli à partir du formulaire d'inscription.
 * يبني رسالة واتساب جاهزة من بيانات النموذج
 */
export function whatsappRegistrationUrl(data: RegistrationData): string {
  const lines = [
    "Bonjour, je confirme mon inscription à la formation « Approches Quantiques Fractales – Application médicale » (1, 2, 3 octobre 2026 — Hôtel El Hani, Mohammadia, Alger).",
    "",
    `▪ Nom et prénom : ${data.name}`,
    `▪ Téléphone : ${data.phone}`,
  ];
  if (data.email.trim()) lines.push(`▪ Email : ${data.email.trim()}`);
  lines.push(`▪ Profession : ${data.profession}`);
  if (data.city.trim()) lines.push(`▪ Ville : ${data.city.trim()}`);
  lines.push(`▪ Niveau souhaité : ${data.level}`);
  if (data.message.trim()) lines.push(`▪ Message : ${data.message.trim()}`);
  lines.push(
    "",
    "(Envoyé depuis le formulaire d'inscription du site)"
  );
  return `https://wa.me/${CONTACT.whatsappIntl}?text=${encodeURIComponent(
    lines.join("\n")
  )}`;
}

/* ------------------- Structure AIDA -------------------
 * Affiche les étapes AIDA (Attention → Intérêt → Désir → Action)
 * إظهار شارات مراحل AIDA على الصفحة — غيّر إلى false لإخفائها
 * ---------------------------------------------------------------- */

export const SHOW_AIDA_STEPS = true;

export const AIDA_STEPS = {
  attention: { step: "01", label: "Attention" },
  interest: { step: "02", label: "Intérêt" },
  desire: { step: "03", label: "Désir" },
  action: { step: "04", label: "Action" },
} as const;

/* ------------------- Images — الصور -------------------
 * 📷 ✨ الأسهل الآن: ضع روابط الصور مباشرة من لوحة التحكم /admin (تبويب الوسائط)
 *    ما يلي هو الإعداد الافتراضي الاحتياطي فقط.
 * ---------------------------------------------------------------- */

export const IMAGES = {
  /** Photo du formateur extraite de l'affiche officielle (cercle transparent) */
  trainerPhoto: "/images/dr-haddad.png", // ← صورة الدكتور
  /** Visuel ADN + fractale du hero */
  heroImage: "/images/hero-dna-fractal.png", // ← صورة الواجهة
  /** Fond fractal de la section CTA finale */
  ctaBackground: "/images/cta-background.png", // ← خلفية القسم الختامي
} as const;

/* ------------------- Informations générales ------------------- */

export const COURSE = {
  academy: "GO Healthy Academy",
  title: "Approches Quantiques Fractales",
  subtitle: "Application médicale",
  tagline: "Fondements Scientifiques • Pratique Clinique • Approche Holistique",
  dates: "1, 2, 3 Octobre 2026",
  datesFull: "1er, 2 et 3 octobre 2026",
  venue: "Hôtel El Hani (4★), Mohammadia, Alger",
  trainer: "Dr. Mohamed HADDAD",
  // ✏️ تعريف الدكتور — حُذفت كلمة « Médecin » بناءً على الطلب
  trainerRole: "Formateur · Auteur",
  trainerTitle: "Directeur des recherches des laboratoires Fractal", // ← من الملصق الرسمي
  audience: "Médecins & professionnels de santé",
  duration: "3 jours · 3 niveaux",
  // ✏️ الكتاب — الاسم الصحيح من الغلاف الرسمي: « Le DÉCLIN du Cancer »
  book: {
    title: "Le Déclin du Cancer",
    subtitle: "au carrefour des connaissances",
    author: "Dr. Mohamed HADDAD",
    edition: "2ème édition",
    publisher: "Éditions Brocal",
  },
} as const;

/* ------------------- Navigation ------------------- */

/* ⚠️ « Pourquoi participer ? » supprimé — le lien « La formation » a été retiré */
export const NAV_LINKS = [
  { href: "#programme", label: "Programme" },
  { href: "#intervenant", label: "Formateur" },
  { href: "#videos", label: "Vidéos" },
  { href: "#tarifs", label: "Tarifs & paiement" },
  { href: "#faq", label: "FAQ" },
] as const;

/* ------------------- Programme de la formation -------------------
   Contenu conforme au programme officiel communiqué.
   ⚠️ Pour ajuster un intitulé, modifiez simplement le texte ci-dessous.
------------------------------------------------------------------- */

export interface ProgramGroup {
  heading: string;
  items: string[];
}

export interface ProgramLevel {
  id: string;
  level: string;
  title: string;
  baseline: string;
  badge: string;
  groups: ProgramGroup[];
}

export const PROGRAM_LEVELS: ProgramLevel[] = [
  {
    id: "niveau-1",
    level: "Niveau 1",
    title: "Fondements de l'approche",
    baseline:
      "Le socle théorique et pratique : histoire des Fractals, homéodynamique, indications et premiers protocoles cliniques.",
    badge: "Point d'entrée",
    groups: [
      {
        heading: "Fondements & histoire",
        items: [
          "Historique des découvertes des Fractals",
          "Évolution de l'approche depuis 2001",
          "Corrélations avec la physique quantique et les maladies graves",
          "Découvertes du Dr Hamer",
        ],
      },
      {
        heading: "Concepts & indications",
        items: [
          "Homéodynamique",
          "Indications des Fractals / vortex",
          "Adjonction aux remèdes naturels",
          "Satellites MH",
        ],
      },
      {
        heading: "Pratique clinique & résultats",
        items: [
          "Résultats cliniques observés",
          "Soins manuels avec tubes Vacuum",
          "Soins téléphoniques HFC",
          "Travaux pratiques",
        ],
      },
    ],
  },
  {
    id: "niveau-2",
    level: "Niveau 2",
    title: "Approfondissement clinique",
    baseline:
      "L'approfondissement des acquis du Niveau 1 : analyse de cas, pratique guidée et intégration à la démarche clinique.",
    badge: "Prérequis : Niveau 1",
    groups: [
      {
        heading: "Approfondissement des fondamentaux",
        items: [
          "Approfondissement des concepts du Niveau 1",
          "Homéodynamique : intégration à la démarche clinique",
          "Corrélations physique quantique / maladies graves — suite",
          "Utilisation avancée des satellites MH",
        ],
      },
      {
        heading: "Pratique guidée",
        items: [
          "Étude de cas et analyse de situations cliniques observées",
          "Pratique guidée des soins avec tubes Vacuum",
          "Pratique guidée des soins téléphoniques HFC",
          "Adjonction aux remèdes naturels — applications",
        ],
      },
      {
        heading: "Ateliers & échanges",
        items: [
          "Ateliers pratiques en petits groupes",
          "Analyse des résultats cliniques observés",
          "Échanges de cas entre participants",
          "Synthèse et perspectives d'évolution",
        ],
      },
    ],
  },
  {
    id: "niveau-2-plus",
    level: "Niveau 2+",
    title: "Perfectionnement & maîtrise",
    baseline:
      "Le niveau avancé : supervision de la pratique, cas complexes et actualisation des connaissances.",
    badge: "Niveau avancé",
    groups: [
      {
        heading: "Supervision de la pratique",
        items: [
          "Perfectionnement et supervision de la pratique",
          "Analyse approfondie de cas complexes",
          "Maîtrise des protocoles : tubes Vacuum, soins HFC, satellites MH",
        ],
      },
      {
        heading: "Actualisation & maîtrise",
        items: [
          "Actualisation des connaissances et dernières évolutions",
          "Retours d'expérience et échanges de pratique",
          "Travaux pratiques de haut niveau",
        ],
      },
    ],
  },
];

/* ------------------- Section vidéos -------------------
   ✏️ ✨ الأسهل الآن: أضف روابط الفيديوهات مباشرة من لوحة التحكم /admin
      (تبويب « الوسائط ») — بدون تعديل أي كود.
      ما يلي هو الإعداد الافتراضي الاحتياطي فقط.
---------------------------------------------------------- */

export interface VideoCard {
  id: string;
  title: string;
  description: string;
  youtubeId: string; // "" → emplacement réservé
  thumbnail: string;
  duration: string;
}

export const VIDEOS: VideoCard[] = [
  {
    id: "video-1",
    title: "Présentation de la formation",
    description:
      "Le Dr. Mohamed HADDAD présente la philosophie, les objectifs et le déroulé des trois niveaux de la formation.",
    youtubeId: "",
    thumbnail: "/images/video-thumb-1.png",
    duration: "À venir",
  },
  {
    id: "video-2",
    title: "Comprendre les Fractals",
    description:
      "Une introduction visuelle à la géométrie fractale et à ses corrélations avec le vivant et la physique quantique.",
    youtubeId: "",
    thumbnail: "/images/video-thumb-2.png",
    duration: "À venir",
  },
  {
    id: "video-3",
    title: "L'approche en pratique",
    description:
      "Aperçu des pratiques présentées durant la formation : tubes Vacuum, soins HFC et travaux pratiques encadrés.",
    youtubeId: "",
    thumbnail: "/images/video-thumb-3.png",
    duration: "À venir",
  },
];

/* ------------------- FAQ -------------------
   ✏️ 3 questions essentielles (audience · tarif · réservation).
   • Modifier : éditez question/answer.
   • Ajouter une question : ajoutez { question, answer }.
---------------------------------------------------------- */

export const FAQ_ITEMS = [
  {
    question: "Qui peut participer à cette formation ?",
    answer:
      "La formation s'adresse en priorité aux médecins et professionnels de santé désireux d'élargir leur culture scientifique et leur pratique : médecins, pharmaciens, dentistes, biologistes, infirmiers et autres professionnels de santé. Le Niveau 1 constitue le point d'entrée naturel de la formation ; les niveaux 2 et 2+ s'adressent à ceux ayant déjà suivi les niveaux précédents.",
  },
  {
    question: "Quel est le tarif de la formation ?",
    answer:
      "Dans le cadre du tarif de lancement, la formation est proposée à 67 000 DZD au lieu de 120 000 DZD — soit une économie de 53 000 DZD (−44 %). Ce tarif couvre les trois journées (1er, 2 et 3 octobre 2026), l'accès aux trois niveaux, les travaux pratiques encadrés et l'attestation de participation.",
  },
  {
    question: "Comment réserver ma place (acompte) ?",
    answer:
      "Pour bloquer votre place, un acompte de 10 000 DZD est à verser sur le compte CCP n° 9539544, clé 66 (Kerkatou Chouaib, Alger) ou via BaridiMob / RIP : 00799999000953954466. Le solde de 57 000 DZD est ensuite réglé selon les modalités communiquées lors de la confirmation de votre inscription. Envoyez le reçu de versement par WhatsApp au 0657 86 74 44 pour valider définitivement votre réservation.",
  },
] as const;

/* ------------------- Témoignages -------------------
   ✏️ Témoignages réels des sessions précédentes.
   • Modifier un texte : éditez « quote ».
   • Plusieurs paragraphes : séparez-les par \n\n.
   • Ajouter un témoignage : ajoutez { quote, author, context }.
   • Laissez quote vide ("") pour afficher « Témoignage à venir ».
---------------------------------------------------------- */

export interface Testimonial {
  quote: string;
  author: string;
  context: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "En tous les cas, c'est une très bonne expérience et, pour moi, c'est quelque chose de nouveau : c'est magnifique, fantastique. Le séminaire s'est très bien déroulé.\n\nUn grand bravo pour l'organisation, pour la conférence et pour tout.",
    author: "Dr Z. M.",
    context: "Séminaire précédent",
  },
  {
    quote:
      "Le résultat est vraiment surprenant. On se rend compte qu'il nous reste encore beaucoup de choses à apprendre sur le soin. En tant que professionnels de santé, nous avons une approche très cartésienne, basée sur la physiologie et la physiopathologie, mais il existe encore beaucoup de choses que nous ne comprenons pas.\n\nCe qui m'a le plus marquée, ce sont les cas que j'ai vus de mes propres yeux. Par exemple, chez un patient atteint d'Alzheimer, j'ai pu observer une amélioration impressionnante de la mémoire : il a retrouvé des informations sur sa profession, ses enfants, son âge et même sa date d'anniversaire.\n\nDu point de vue de la douleur, les résultats sont également très intéressants et méritent d'être davantage étudiés.",
    author: "Dr D. B.",
    context: "Séminaire précédent",
  },
];
