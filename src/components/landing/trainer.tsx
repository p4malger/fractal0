import { BookOpen, GraduationCap, PenLine } from "lucide-react";
import { COURSE } from "@/lib/course-data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { TrainerPortrait } from "./trainer-portrait";

/**
 * Section intervenant — Dr. Mohamed HADDAD et son ouvrage.
 * Présentation sobre et académique ; livre en maquette 3D élégante.
 * ✏️ Photo pilotable depuis /admin (images.trainerPhoto).
 */
export function Trainer({ trainerPhoto }: { trainerPhoto?: string }) {
  return (
    <section
      id="intervenant"
      className="relative scroll-mt-24 overflow-hidden bg-navy-950 py-20 md:py-28"
    >
      <div className="bg-fractal-dark absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-azure-500/10 blur-[110px]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gold-500/10 blur-[110px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          aida="desire"
          eyebrow="Votre intervenant"
          title="Dr. Mohamed"
          highlight="HADDAD"
          description="Formateur et auteur, Directeur des recherches des laboratoires Fractal, le Dr. HADDAD consacre son parcours à l'étude des carrefours entre physique quantique, géométrie fractale et lecture du vivant. Il transmet depuis de nombreuses années une approche structurée, documentée et accessible aux professionnels de santé."
        />

        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Portrait */}
          <Reveal className="relative mx-auto w-full max-w-sm">
            <div
              className="absolute -inset-3 rounded-3xl border border-gold-500/25"
              aria-hidden="true"
            />
            <TrainerPortrait photo={trainerPhoto} className="aspect-[4/5]" />
          </Reveal>

          {/* Biographie + atouts */}
          <div className="flex flex-col gap-8">
            <Reveal delay={120}>
              <ul className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: GraduationCap, label: "Formateur" },
                  { icon: PenLine, label: "Auteur" },
                ].map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3.5 backdrop-blur-sm"
                  >
                    <item.icon className="h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
                    <span className="text-sm font-semibold text-white">{item.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={180}>
              <div className="flex flex-col gap-4 text-sm leading-relaxed text-azure-100/80 md:text-base">
                <p>
                  Formateur de la session « Approches Quantiques Fractales –
                  Application médicale », le Dr. Mohamed HADDAD présente
                  l&apos;approche telle qu&apos;elle a évolué depuis 2001 :
                  fondements historiques, homéodynamique, indications des
                  Fractals et du vortex, et pratique clinique encadrée —
                  soins manuels avec tubes Vacuum, soins téléphoniques HFC et
                  satellites MH.
                </p>
                <p>
                  Sa pédagogie privilégie la progressivité : chaque notion
                  théorique est reliée à une application pratique, afin que
                  chaque participant reparte avec des repères concrets et un
                  socle solide pour approfondir aux niveaux supérieurs.
                </p>
              </div>
            </Reveal>

            {/* Ouvrage */}
            <Reveal delay={240}>
              <article className="book-3d flex flex-col items-center gap-8 rounded-2xl border border-gold-500/30 bg-gradient-to-br from-navy-900/90 to-navy-800/60 p-7 backdrop-blur-sm sm:flex-row sm:gap-10 md:p-9">
                {/* Maquette 3D du livre */}
                <div className="relative shrink-0" style={{ width: "min(160px, 40vw)" }}>
                  <div className="book-cover relative aspect-[2/3] overflow-hidden rounded-r-md rounded-l-sm bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 p-4 ring-1 ring-gold-500/50">
                    <div className="bg-fractal-dark absolute inset-0 opacity-70" aria-hidden="true" />
                    <div className="relative flex h-full flex-col justify-between text-center">
                      <span className="eyebrow-label text-[0.5rem] text-gold-400">
                        Dr. Mohamed HADDAD
                      </span>
                      <div className="flex flex-col gap-2">
                        <span className="font-display text-base font-bold leading-tight text-white">
                          Le Déclin
                          <br />
                          du Cancer
                        </span>
                        <span className="gold-hairline mx-auto w-10" aria-hidden="true" />
                        <span className="font-display text-[0.65rem] italic text-azure-200">
                          au carrefour des
                          <br />
                          connaissances
                        </span>
                      </div>
                      <span
                        className="mx-auto flex h-8 w-8 items-center justify-center rounded-full border border-gold-500/60"
                        aria-hidden="true"
                      >
                        <BookOpen className="h-3.5 w-3.5 text-gold-400" />
                      </span>
                    </div>
                    {/* Tranche dorée */}
                    <div
                      className="absolute inset-y-0 right-0 w-1.5 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Description de l'ouvrage */}
                <div className="flex flex-col gap-3.5 text-center sm:text-left">
                  <div className="flex items-center justify-center gap-2.5 sm:justify-start">
                    <span className="eyebrow-label text-[0.65rem] text-gold-400">
                      Son ouvrage de référence
                    </span>
                    <span className="rounded-full border border-gold-500/50 bg-gold-500/10 px-2.5 py-0.5 text-[0.6rem] font-bold tracking-wide text-gold-300">
                      2ème édition
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold leading-snug text-white md:text-2xl">
                    « Le Déclin du Cancer —{" "}
                    <span className="italic text-azure-100">
                      au carrefour des connaissances
                    </span>{" "}
                    »
                  </h3>
                  <p className="text-sm leading-relaxed text-azure-100/75">
                    Un ouvrage transdisciplinaire qui invite à croiser les
                    regards — physique, biologie et clinique — et à
                    comprendre le parcours de recherche qui a conduit à
                    l&apos;approche enseignée dans la formation. Une lecture
                    précieuse pour préparer ou prolonger les trois journées
                    d&apos;octobre.
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
