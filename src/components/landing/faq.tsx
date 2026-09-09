import { FAQ_ITEMS } from "@/lib/course-data";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { WhatsAppCta } from "./whatsapp-cta";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * FAQ professionnelle — accordéon shadcn stylé marine/or.
 */
export function Faq() {
  return (
    <section
      id="faq"
      className="relative scroll-mt-24 bg-white py-20 md:py-28"
    >
      <div className="bg-fractal-light absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          aida="desire"
          eyebrow="Questions fréquentes"
          title="Tout ce qu'il faut savoir"
          highlight="avant de s'inscrire"
          description="Les réponses aux questions les plus courantes des professionnels de santé intéressés par la formation."
        />

        <Reveal delay={140}>
          <Accordion
            type="single"
            collapsible
            className="space-y-4"
            defaultValue="faq-0"
          >
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={item.question}
                value={`faq-${i}`}
                className="overflow-hidden rounded-2xl border border-navy-100 bg-ivory/60 px-6 transition-colors data-[state=open]:border-gold-400/50 data-[state=open]:bg-white data-[state=open]:shadow-lg data-[state=open]:shadow-navy-900/8"
              >
                <AccordionTrigger className="py-5 text-left font-display text-base font-bold text-navy-900 hover:no-underline hover:text-gold-700 md:text-lg [&[data-state=open]>svg]:text-gold-600 [&>svg]:h-5 [&>svg]:w-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-relaxed text-navy-700/85 md:text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-navy-700/70">
              Une autre question ? Écrivez-nous directement — nous répondons
              rapidement.
            </p>
            <WhatsAppCta
              size="md"
              variant="navy"
              label="Poser une question par WhatsApp"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
