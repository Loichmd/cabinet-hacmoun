import Link from "next/link";
import Reveal from "./Reveal";
import { Tooth, Aligner, Sparkle, ArrowUpRight } from "./icons";
import type { Specialty } from "@/lib/content";

const ICONS = { implant: Tooth, ortho: Aligner, esthetique: Sparkle } as const;

export default function Specialties({
  specialties,
}: {
  specialties: Specialty[];
}) {
  return (
    <section id="specialites" className="bg-linen py-28 lg:py-40">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-1.5 text-[0.62rem] uppercase tracking-eyebrow text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
              Nos Spécialités
            </span>
            <h2 className="font-display mt-6 text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.05] text-espresso text-balance">
              Trois expertises, une seule exigence&nbsp;: l&apos;excellence
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-xs text-sm leading-relaxed text-ink">
              Chaque discipline est portée par un praticien dédié, expert reconnu
              dans son domaine.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {specialties.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <Reveal key={s.slug} delay={i * 110}>
                <Link
                  href={`/specialites/${s.slug}`}
                  className="group relative flex h-full flex-col rounded-[1.8rem] border border-hairline bg-porcelain p-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:lift"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sand text-espresso transition-colors duration-500 group-hover:bg-espresso group-hover:text-cream">
                      <Icon className="h-7 w-7" />
                    </span>
                    <span className="font-display text-2xl text-greige">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="font-display mt-7 text-2xl leading-tight text-espresso">
                    {s.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink">
                    {s.shortText}
                  </p>

                  <div className="my-6 rule-gold opacity-60" />

                  <ul className="flex flex-col gap-2.5">
                    {s.cardItems.map((it) => (
                      <li
                        key={it}
                        className="flex items-center gap-2.5 text-[0.82rem] text-ink"
                      >
                        <span className="h-1 w-1 rotate-45 bg-champagne" />
                        {it}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-8 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-gold transition-colors group-hover:text-espresso">
                    Découvrir la spécialité
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
