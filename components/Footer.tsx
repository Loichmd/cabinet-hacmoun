import { ArrowUpRight } from "./icons";
import type { Settings } from "@/lib/content";

const COLS = [
  {
    title: "Cabinet",
    links: [
      { label: "Accueil", href: "/#accueil" },
      { label: "Le cabinet", href: "/#cabinet" },
      { label: "L'expérience", href: "/#experience" },
      { label: "Notre équipe", href: "/#equipe" },
      { label: "Quiz gencives", href: "/quiz-parodontologie" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Spécialités",
    links: [
      { label: "Implantologie", href: "/specialites/implantologie" },
      { label: "Orthodontie", href: "/specialites/orthodontie" },
      { label: "Esthétique", href: "/specialites/esthetique" },
    ],
  },
];

export default function Footer({ settings }: { settings: Settings }) {
  return (
    <footer className="bg-espresso px-6 pt-20 pb-10 text-cream lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream font-display text-espresso">
                DH
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl">Dr. Hacmoun</span>
                <span className="text-[0.6rem] uppercase tracking-eyebrow text-cream/50">
                  Cabinet d&apos;exception · Nice
                </span>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/60">
              Une médecine dentaire de précision, alliant technologie de pointe
              et raffinement, au service de votre plus beau sourire.
            </p>
            <a
              href={settings.doctolib}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex items-center gap-3 rounded-full border border-cream/20 py-2 pl-6 pr-2 text-[0.78rem] uppercase tracking-[0.16em] transition-colors hover:border-cream/45"
            >
              Prendre rendez-vous
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>

          {/* Link columns */}
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[0.62rem] uppercase tracking-[0.22em] text-cream/40">
                {col.title}
              </h4>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="link-underline text-sm text-cream/75 hover:text-cream"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-7 text-[0.72rem] text-cream/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Cabinet Dr. Hacmoun. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="link-underline hover:text-cream/70">
              Mentions légales
            </a>
            <a href="#" className="link-underline hover:text-cream/70">
              Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
