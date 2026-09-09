"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS, COURSE, CONTACT } from "@/lib/course-data";
import { Logo, WhatsAppIcon } from "./brand";
import { whatsappUrl } from "@/lib/course-data";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, PenLine } from "lucide-react";

/**
 * Navigation sticky — transparente sur le hero, puis marine dense
 * avec flou au défilement. Menu mobile en panneau latéral.
 * CTA « Je m'inscris » → formulaire d'inscription (#inscription).
 */
export function Navbar({
  showVideosLink = true,
}: {
  /** false → masque le lien « Vidéos » (aucune vidéo enregistrée) */
  showVideosLink?: boolean;
}) {
  const links = showVideosLink
    ? NAV_LINKS
    : NAV_LINKS.filter((l) => l.href !== "#videos");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-gold-500/20 bg-navy-950/90 shadow-lg shadow-navy-950/40 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-navy-950/80 to-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 md:h-[4.5rem] lg:px-8"
        aria-label="Navigation principale"
      >
        <a
          href="#hero"
          className="flex shrink-0 items-center transition-opacity hover:opacity-90"
          aria-label="GO Healthy Academy — retour en haut"
        >
          <Logo dark />
        </a>

        {/* Liens — desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-azure-200/85 transition-colors hover:bg-white/5 hover:text-gold-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#inscription"
            className="btn-shine hidden min-h-10 items-center gap-2 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 px-5 py-2.5 text-xs font-semibold tracking-wide text-navy-950 shadow-md shadow-gold-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold-500/35 sm:inline-flex"
          >
            <PenLine className="h-4 w-4" />
            <span>Je m&apos;inscris</span>
          </a>

          {/* Menu mobile */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-azure-100 transition-colors hover:bg-white/5 hover:text-gold-300 lg:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[300px] flex-col border-l border-gold-500/25 bg-navy-950 [&>button]:text-azure-200"
            >
              <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
              <div className="mt-4 border-b border-white/10 pb-6 pt-2">
                <Logo dark />
              </div>
              <nav aria-label="Navigation mobile" className="mt-6">
                <ul className="flex flex-col gap-1">
                  {links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl px-4 py-3 text-base font-medium text-azure-100 transition-colors hover:bg-white/5 hover:text-gold-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto flex flex-col gap-4 border-t border-white/10 pt-6">
                <a
                  href="#inscription"
                  onClick={() => setOpen(false)}
                  className="btn-shine flex min-h-12 items-center justify-center gap-3 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 px-6 py-3 text-sm font-semibold text-navy-950 shadow-md shadow-gold-500/25"
                >
                  <PenLine className="h-5 w-5" />
                  <span>JE M&apos;INSCRIS</span>
                </a>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 text-sm text-azure-200/70 transition-colors hover:text-gold-300"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Ou par WhatsApp : {CONTACT.whatsappDisplay}
                </a>
                <p className="mt-1 text-center text-xs text-azure-200/60">
                  {COURSE.dates} — {COURSE.venue}
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
