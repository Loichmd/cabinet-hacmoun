import Image from "next/image";
import Reveal from "./Reveal";
import type { TeamMember } from "@/lib/content";

export default function Team({ team }: { team: TeamMember[] }) {
  return (
    <section id="equipe" className="bg-linen py-28 lg:py-40">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-1.5 text-[0.62rem] uppercase tracking-eyebrow text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
              Notre Équipe
            </span>
            <h2 className="font-display mt-6 text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.05] text-espresso text-balance">
              Des praticiens d&apos;exception, réunis pour votre sourire
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-xs text-sm leading-relaxed text-ink">
              Trois spécialistes certifiés, animés par la même quête de
              perfection et de bienveillance.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 110}>
              <article className="group flex h-full flex-col rounded-[1.8rem] border border-hairline bg-porcelain p-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:lift">
                <div className="relative w-max">
                  <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-sand font-display text-2xl text-espresso ring-1 ring-champagne/40 transition-transform duration-500 group-hover:scale-105">
                    {m.photo ? (
                      <Image
                        src={m.photo}
                        alt={m.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      m.initials
                    )}
                  </div>
                  <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-espresso text-cream">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4.5 4.5L19 7" /></svg>
                  </span>
                </div>

                <h3 className="font-display mt-7 text-2xl text-espresso">
                  {m.name}
                </h3>
                <div className="mt-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-gold">
                  {m.role}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink">
                  {m.bio}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {m.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-sand/60 px-3 py-1 text-[0.62rem] uppercase tracking-[0.12em] text-ink"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
