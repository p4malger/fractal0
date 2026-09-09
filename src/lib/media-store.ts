/**
 * ============================================================
 *  MAGASIN DE MÉDIAS (côté serveur) — تخزين وسائط الموقع
 * ------------------------------------------------------------
 *  Lecture/écriture des liens vidéos + images dans SQLite
 *  (table SiteSetting, clés "videos" et "images").
 *  • Aucune ligne en base → valeurs par défaut de course-data
 *  • Erreur base de données → la page publique fonctionne quand même
 *  ⚠️ Module serveur uniquement — ne pas importer depuis un composant client
 * ============================================================
 */
import { db } from "@/lib/db";
import { VIDEOS, IMAGES } from "@/lib/course-data";
import {
  isHttpUrl,
  resolveVideo,
  type MediaVideoInput,
  type SiteImagesInput,
  type SiteMedia,
  type VideoFallback,
} from "@/lib/media";

const VIDEOS_KEY = "videos";
const IMAGES_KEY = "images";

export const MAX_VIDEOS = 12;

/** Valeurs par défaut (issues de course-data) — القيم الافتراضية */
export function defaultVideoInputs(): MediaVideoInput[] {
  return VIDEOS.map((v) => ({
    id: v.id,
    title: v.title,
    description: v.description,
    link: v.youtubeId ? `https://www.youtube.com/watch?v=${v.youtubeId}` : "",
    duration: v.duration,
  }));
}

export const defaultImages: SiteImagesInput = {
  trainerPhoto: "",
  heroImage: "",
  ctaBackground: "",
};

function videoFallbacks(): VideoFallback[] {
  return VIDEOS.map((v) => ({
    id: v.id,
    title: v.title,
    description: v.description,
    duration: v.duration,
    thumbnail: v.thumbnail,
  }));
}

/* ------------------- Validation & nettoyage ------------------- */

function sanitizeVideo(v: unknown, index: number): MediaVideoInput | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const title = typeof o.title === "string" ? o.title.trim().slice(0, 120) : "";
  const description =
    typeof o.description === "string" ? o.description.trim().slice(0, 600) : "";
  const linkRaw = typeof o.link === "string" ? o.link.trim() : "";
  const link = linkRaw && (isHttpUrl(linkRaw) || parseLocalPath(linkRaw)) ? linkRaw.slice(0, 500) : "";
  const duration =
    typeof o.duration === "string" ? o.duration.trim().slice(0, 40) : "";
  const id =
    typeof o.id === "string" && o.id.trim() ? o.id.trim().slice(0, 60) : `video-${index + 1}-${Date.now()}`;
  if (!title && !link) return null; // carte entièrement vide → ignorée
  return { id, title, description, link, duration };
}

/** Chemin local autorisé : /images/... (image déposée dans /public) */
function parseLocalPath(s: string): boolean {
  return /^\/[a-zA-Z0-9._/-]+$/.test(s);
}

function sanitizeImage(v: unknown): string {
  if (typeof v !== "string") return "";
  const s = v.trim().slice(0, 500);
  if (!s) return "";
  return isHttpUrl(s) || parseLocalPath(s) ? s : "";
}

/* ------------------- Lecture ------------------- */

export interface RawMedia {
  videos: MediaVideoInput[];
  images: SiteImagesInput;
}

/**
 * Médias bruts (tels que saisis dans /admin) :
 * vidéos = valeurs enregistrées OU valeurs par défaut ;
 * images = valeurs enregistrées ("" = défaut).
 */
export async function getRawMedia(): Promise<RawMedia> {
  let videos: MediaVideoInput[] | null = null;
  let images: SiteImagesInput | null = null;
  try {
    const rows = await db.siteSetting.findMany({
      where: { key: { in: [VIDEOS_KEY, IMAGES_KEY] } },
    });
    for (const row of rows) {
      if (row.key === VIDEOS_KEY) {
        const parsed: unknown = JSON.parse(row.value);
        if (Array.isArray(parsed)) {
          /* ⚠️ une liste vide enregistrée est volontaire (section masquée)
             — on la distingue de l'absence d'enregistrement */
          videos = parsed
            .map(sanitizeVideo)
            .filter((v): v is MediaVideoInput => v !== null);
        }
      } else if (row.key === IMAGES_KEY) {
        const parsed: unknown = JSON.parse(row.value);
        if (parsed && typeof parsed === "object") {
          const o = parsed as Record<string, unknown>;
          images = {
            trainerPhoto: sanitizeImage(o.trainerPhoto),
            heroImage: sanitizeImage(o.heroImage),
            ctaBackground: sanitizeImage(o.ctaBackground),
          };
        }
      }
    }
  } catch (err) {
    console.error("[media-store] lecture impossible, valeurs par défaut :", err);
  }
  return {
    videos: videos ?? defaultVideoInputs(),
    images: images ?? { ...defaultImages },
  };
}

/** Médias résolus pour la page publique (défauts appliqués) */
export async function getSiteMedia(): Promise<SiteMedia> {
  const raw = await getRawMedia();
  const fallbacks = videoFallbacks();
  const videos = raw.videos.map((v, i) => {
    const fb = fallbacks.find((f) => f.id === v.id) ?? fallbacks[i];
    return resolveVideo(v, fb);
  });
  return {
    videos,
    images: {
      trainerPhoto: raw.images.trainerPhoto || IMAGES.trainerPhoto,
      heroImage: raw.images.heroImage || IMAGES.heroImage,
      ctaBackground: raw.images.ctaBackground || IMAGES.ctaBackground,
    },
  };
}

/* ------------------- Écriture ------------------- */

export interface SaveMediaInput {
  videos: unknown;
  images: unknown;
}

/** Valide et enregistre les médias — lève une Error si invalide */
export async function saveSiteMedia(input: SaveMediaInput): Promise<void> {
  if (!input || !Array.isArray(input.videos) || typeof input.images !== "object" || input.images === null) {
    throw new Error("invalid_payload");
  }
  if (input.videos.length > MAX_VIDEOS) {
    throw new Error("too_many_videos");
  }
  const videos = input.videos
    .map(sanitizeVideo)
    .filter((v): v is MediaVideoInput => v !== null);
  const o = input.images as Record<string, unknown>;
  const images: SiteImagesInput = {
    trainerPhoto: sanitizeImage(o.trainerPhoto),
    heroImage: sanitizeImage(o.heroImage),
    ctaBackground: sanitizeImage(o.ctaBackground),
  };

  await db.$transaction([
    db.siteSetting.upsert({
      where: { key: VIDEOS_KEY },
      create: { key: VIDEOS_KEY, value: JSON.stringify(videos) },
      update: { value: JSON.stringify(videos) },
    }),
    db.siteSetting.upsert({
      where: { key: IMAGES_KEY },
      create: { key: IMAGES_KEY, value: JSON.stringify(images) },
      update: { value: JSON.stringify(images) },
    }),
  ]);
}

/* ------------------- Réinitialisation ------------------- */

/** Remet les médias aux valeurs par défaut (bouton « استعادة الافتراضي ») */
export async function resetSiteMedia(): Promise<void> {
  await db.siteSetting.deleteMany({
    where: { key: { in: [VIDEOS_KEY, IMAGES_KEY] } },
  });
}
