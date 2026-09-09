/**
 * ============================================================
 *  MÉDIAS DU SITE (partagé client/serveur) — وسائط الموقع
 * ------------------------------------------------------------
 *  Types + logique pure pour gérer les liens vidéos/images
 *  depuis la loupe de contrôle /admin → onglet « الوسائط ».
 *  • L'admin colle un lien YouTube quelconque (watch?v=, youtu.be,
 *    shorts, embed, live…) → l'identifiant est extrait automatiquement
 *  • La miniature est récupérée automatiquement depuis YouTube
 *  • Un lien non-YouTube (http/https) s'ouvre dans un nouvel onglet
 *  ✨ بدون أي تعقيدات برمجية: الصق الرابط فقط
 * ============================================================
 */

/* ------------------- Types ------------------- */

/** Vidéo telle que saisie dans la loupe de contrôle */
export interface MediaVideoInput {
  id: string;
  title: string;
  description: string;
  /** Lien collé par l'admin (YouTube ou autre) — "" = emplacement réservé */
  link: string;
  duration: string;
}

/** Images du site (URL) — "" = valeur par défaut de course-data */
export interface SiteImagesInput {
  trainerPhoto: string;
  heroImage: string;
  ctaBackground: string;
}

/** Vidéo résolue prête à afficher sur la page publique */
export interface ResolvedVideo {
  id: string;
  title: string;
  description: string;
  /** ID YouTube extrait du lien — "" si pas YouTube */
  youtubeId: string;
  /** Lien externe non-YouTube — "" sinon (ouvert dans un nouvel onglet) */
  externalUrl: string;
  /** Miniature : YouTube auto, ou image par défaut */
  thumbnail: string;
  duration: string;
}

export interface SiteMedia {
  videos: ResolvedVideo[];
  images: Required<SiteImagesInput>;
}

/** Fallback par défaut (issu de course-data) */
export interface VideoFallback {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
}

/* ------------------- Utilitaires ------------------- */

const YT_ID_RE = /^[a-zA-Z0-9_-]{11}$/;

/**
 * Extrait l'identifiant YouTube d'un lien quelconque.
 * Formats acceptés :
 *  - https://www.youtube.com/watch?v=ID
 *  - https://youtu.be/ID
 *  - https://www.youtube.com/shorts/ID
 *  - https://www.youtube.com/embed/ID  · /live/ID  · /v/ID
 *  - m.youtube.com, music.youtube.com, youtube-nocookie.com
 *  - l'identifiant brut (11 caractères)
 * استخراج معرّف الفيديو من أي شكل من أشكال رابط يوتيوب
 */
export function parseYouTubeId(raw: string): string {
  const s = (raw ?? "").trim();
  if (!s) return "";
  if (YT_ID_RE.test(s)) return s;
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`);
  } catch {
    return "";
  }
  const host = url.hostname.replace(/^www\./i, "").toLowerCase();
  if (host === "youtu.be") {
    const seg = url.pathname.split("/").filter(Boolean)[0] ?? "";
    return YT_ID_RE.test(seg) ? seg : "";
  }
  if (host === "youtube.com" || host.endsWith(".youtube.com") || host === "youtube-nocookie.com") {
    const v = url.searchParams.get("v");
    if (v && YT_ID_RE.test(v)) return v;
    const m = url.pathname.match(/\/(?:shorts|embed|live|v)\/([a-zA-Z0-9_-]{11})/);
    if (m) return m[1];
  }
  return "";
}

/** Vérifie qu'une chaîne est une URL http(s) valide */
export function isHttpUrl(raw: string): boolean {
  const s = (raw ?? "").trim();
  if (!/^https?:\/\//i.test(s)) return false;
  try {
    new URL(s);
    return true;
  } catch {
    return false;
  }
}

/** Miniature YouTube automatique pour un identifiant donné */
export function youtubeThumbnail(youtubeId: string): string {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

/* ------------------- Résolution ------------------- */

/** Résout une vidéo saisie → prête à l'affichage public */
export function resolveVideo(
  input: MediaVideoInput,
  fallback?: VideoFallback
): ResolvedVideo {
  const link = (input.link ?? "").trim();
  const youtubeId = parseYouTubeId(link);
  const externalUrl = !youtubeId && isHttpUrl(link) ? link : "";
  const thumbnail = youtubeId
    ? youtubeThumbnail(youtubeId)
    : (input as MediaVideoInput & { thumbnail?: string }).thumbnail?.trim() || fallback?.thumbnail || "";
  return {
    id: input.id,
    title: (input.title ?? "").trim() || fallback?.title || "Vidéo",
    description: (input.description ?? "").trim() || fallback?.description || "",
    youtubeId,
    externalUrl,
    thumbnail,
    duration: (input.duration ?? "").trim() || fallback?.duration || "À venir",
  };
}
