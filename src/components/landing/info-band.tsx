import { Calendar, MapPin, UserRound, Users } from "lucide-react";
import { COURSE } from "@/lib/course-data";
import { Reveal } from "./reveal";

/**
 * Bandeau d'informations clés — transition marine → blanc.
 * Quatre repères : dates, lieu, formateur, public.
 */
export function InfoBand() {
  const items = [
    {
      icon: Calendar,
      label: "Dates",
      value: COURSE.dates,
    },
    {
      icon: MapPin,
      label: "Lieu",
      value: "Hôtel El Hani (4★), Mohammadia, Alger",
    },
    {
      icon: UserRound,
      label: "Formateur",
      value: COURSE.trainer,
    },
    {
      icon: Users,
      label: "Public",
      value: "Médecins & professionnels de santé",
    },
  ];

  return (
    <section aria-label="Informations clés de la formation" className="relative bg-navy-900">
      <div className="bg-fractal-dark absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-12 lg:px-8">
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 80}>
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold-500/40 bg-gold-500/10">
                  <item.icon className="h-5 w-5 text-gold-400" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-1">
                  <dt className="eyebrow-label text-[0.6rem] text-azure-300/80">
                    {item.label}
                  </dt>
                  <dd className="text-sm font-semibold leading-snug text-white">
                    {item.value}
                  </dd>
                </div>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" aria-hidden="true" />
    </section>
  );
}
