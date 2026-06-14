"use client";

import { useEffect, useState } from "react";
import { Phone } from "./icons";
import type { Settings } from "@/lib/content";

const LINKS = [
  { label: "Accueil", href: "/#accueil" },
  { label: "Spécialités", href: "/#specialites" },
  { label: "L'Expérience", href: "/#experience" },
  { label: "Équipe", href: "/#equipe" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav({ settings }: { settings: Settings }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4">
        <nav
          className={`mt-5 flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border border-hairline px-3 py-2 pl-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled
              ? "bg-porcelain/80 backdrop-blur-xl shadow-[0_18px_50px_-30px_rgba(33,27,19,0.5)]"
              : "bg-porcelain/40 backdrop-blur-md"
          }`}
        >
          {/* Brand */}
          <a href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-espresso text-cream font-display text-sm">
              DH
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-base text-espresso">
                Dr. Hacmoun
              </span>
              <span className="text-[0.6rem] uppercase tracking-eyebrow text-mute">
                Cabinet d&apos;exception · Nice
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link-underline text-[0.78rem] uppercase tracking-[0.14em] text-ink transition-colors hover:text-espresso"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${settings.phone}`}
              className="hidden h-10 w-10 items-center justify-center rounded-full text-espresso ring-1 ring-hairline transition-colors hover:bg-espresso hover:text-cream md:flex"
              aria-label="Appeler le cabinet"
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href={settings.doctolib}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-espresso px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.16em] text-cream transition-colors hover:bg-[#2c241a] sm:inline-block"
            >
              Prendre RDV
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="relative flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-hairline lg:hidden"
            >
              <span
                className={`absolute h-px w-4 bg-espresso transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                className={`absolute h-px w-4 bg-espresso transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "-rotate-45" : "translate-y-1"
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-cream/90 px-8 backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex flex-col gap-2">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`font-display text-4xl text-espresso transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div
          className={`mt-12 flex flex-col gap-3 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: open ? "520ms" : "0ms" }}
        >
          <div className="rule-gold" />
          <a
            href={`tel:${settings.phone}`}
            className="text-sm uppercase tracking-[0.16em] text-ink"
          >
            {settings.phoneDisplay}
          </a>
          <a
            href={settings.doctolib}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 w-max rounded-full bg-espresso px-7 py-3 text-[0.78rem] uppercase tracking-[0.16em] text-cream"
          >
            Prendre RDV sur Doctolib
          </a>
        </div>
      </div>
    </>
  );
}
