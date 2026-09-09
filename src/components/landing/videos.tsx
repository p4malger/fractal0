"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Clock, ExternalLink, YouTubeIconPlaceholder } from "./video-helpers";
import { whatsappUrl } from "@/lib/course-data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { WhatsAppIcon } from "./brand";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { type ResolvedVideo } from "@/lib/media";

/**
 * « Découvrez la formation en vidéo » — cartes vidéo pilotées par la
 * loupe de contrôle /admin (onglet « الوسائط ») :
 *  • Lien YouTube collé → miniature automatique + lecteur intégré
 *  • Autre lien http → ouverture dans un nouvel onglet
 *  • Aucun lien → emplacement réservé « bientôt disponible »
 *  • Liste vide → la section disparaît de la page
 */
function VideoCard({ video, index }: { video: ResolvedVideo; index: number }) {
  const [open, setOpen] = useState(false);
  const isYouTube = video.youtubeId.trim().length > 0;
  const isExternal = video.externalUrl.trim().length > 0;

  /** Clic sur la carte : lecteur intégré (YouTube), nouvel onglet (lien externe)
   *  ou modale d'emplacement réservé */
  function openCard() {
    if (isExternal) {
      window.open(video.externalUrl, "_blank", "noopener,noreferrer");
      return;
    }
    setOpen(true);
  }

  return (
    <Reveal delay={index * 120} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-900/70 shadow-lg shadow-navy-950/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-400/50 hover:shadow-2xl hover:shadow-navy-950/50">
        {/* Miniature + bouton lecture */}
        <button
          type="button"
          onClick={openCard}
          aria-label={`Lire la vidéo : ${video.title}`}
          className="relative aspect-video w-full overflow-hidden"
        >
          <Image
            src={video.thumbnail}
            alt={`Miniature de la vidéo : ${video.title}`}
            width={1344}
            height={768}
            sizes="(max-width: 768px) 92vw, (max-width: 1200px) 45vw, 30vw"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent"
            aria-hidden="true"
          />
          {/* Voile sombre au survol */}
          <div
            className="absolute inset-0 bg-navy-950/0 transition-colors duration-300 group-hover:bg-navy-950/25"
            aria-hidden="true"
          />

          {/* Bouton Play */}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="btn-shine relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 shadow-xl shadow-gold-500/30 transition-transform duration-300 group-hover:scale-110 md:h-[4.5rem] md:w-[4.5rem]">
              {isExternal ? (
                <ExternalLink className="h-6 w-6 text-navy-950 md:h-7 md:w-7" aria-hidden="true" />
              ) : (
                <Play className="ml-1 h-6 w-6 fill-navy-950 text-navy-950 md:h-7 md:w-7" aria-hidden="true" />
              )}
            </span>
          </span>

          {/* Durée / statut */}
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-navy-950/85 px-3 py-1 text-[0.7rem] font-medium text-azure-200 backdrop-blur-sm">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {video.duration}
          </span>
        </button>

        {/* Titre + description */}
        <div className="flex flex-1 flex-col gap-2.5 p-5 md:p-6">
          <h3 className="font-display text-lg font-bold leading-snug text-white md:text-xl">
            {video.title}
          </h3>
          <p className="text-sm leading-relaxed text-azure-100/70">
            {video.description}
          </p>
        </div>

        {/* Modale : lecteur YouTube (ou emplacement réservé) */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-3xl border border-gold-500/30 bg-navy-950 p-0 [&>button]:rounded-full [&>button]:bg-navy-800/80 [&>button]:text-white hover:[&>button]:bg-navy-700">
            <DialogHeader className="px-6 pt-6">
              <DialogTitle className="font-display text-lg font-bold text-white md:text-xl">
                {video.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-azure-100/70">
                {video.description}
              </DialogDescription>
            </DialogHeader>
            <div className="px-6 pb-6">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-navy-900">
                {isYouTube ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-fractal-dark p-8 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold-500/50">
                      <YouTubeIconPlaceholder />
                    </span>
                    <p className="font-display text-xl font-semibold text-white">
                      Emplacement vidéo — bientôt disponible
                    </p>
                    <p className="max-w-md text-sm leading-relaxed text-azure-100/70">
                      Cette vidéo sera publiée prochainement. Inscrivez-vous
                      sur WhatsApp pour être informé dès sa mise en ligne.
                    </p>
                    <a
                      href={whatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-shine inline-flex min-h-11 items-center gap-2.5 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 px-6 py-2.5 text-sm font-semibold text-navy-950"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Être informé par WhatsApp
                    </a>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </article>
    </Reveal>
  );
}

/* Titre adapté au nombre de vidéos — عنوان يتكيف مع عدد الفيديوهات */
const COUNT_TITLES: Record<number, string> = {
  1: "Un regard sur",
  2: "Deux regards sur",
  3: "Trois regards sur",
  4: "Quatre regards sur",
  5: "Cinq regards sur",
  6: "Six regards sur",
};

export function Videos({ videos }: { videos: ResolvedVideo[] }) {
  /* Aucune vidéo enregistrée → la section n'apparaît pas */
  if (!videos || videos.length === 0) return null;

  const countTitle = COUNT_TITLES[videos.length] ?? "Découvrez";
  const countDesc =
    videos.length === 1
      ? "une vidéo pour préparer votre venue — cliquez sur la carte pour lancer la lecture."
      : `${videos.length} vidéos pour préparer votre venue — cliquez sur une carte pour lancer la lecture.`;

  return (
    <section
      id="videos"
      className="relative scroll-mt-24 overflow-hidden bg-navy-950 py-20 md:py-28"
    >
      <div className="bg-fractal-dark absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -top-24 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-gold-500/8 blur-[110px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          aida="desire"
          eyebrow="Découvrez la formation en vidéo"
          title={countTitle}
          highlight="l'approche Quantique Fractale"
          description={`Présentation de la formation, introduction aux Fractals et aperçu de la pratique : ${countDesc}`}
        />

        <div
          className={
            videos.length === 1
              ? "mx-auto grid max-w-xl gap-6 md:gap-8"
              : "grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          }
        >
          {videos.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
