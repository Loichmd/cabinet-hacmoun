import Reveal from "./Reveal";
import { Scan, Simulation, Aligner, Sparkle, Calm, Tooth } from "./icons";
import type { Technology } from "@/lib/content";

const ICONS = {
  scan: Scan,
  simulation: Simulation,
  aligner: Aligner,
  sparkle: Sparkle,
  calm: Calm,
  tooth: Tooth,
} as const;

export default function Technologies({
  technologies,
}: {
  technologies: Technology[];
}) {
  return (
    <section id="plateau" className="bg-cream py-28 lg:py-40">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Sticky intro */}
          <div className="lg:sticky lg:top-28 lg:h-max">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-1.5 text-[0.62rem] uppercase tracking-eyebrow text-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                Plateau technique
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display mt-6 text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.05] text-espresso text-balance">
                La technologie au service de votre sourire
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink">
                Derrière chaque traitement se cache un équipement de dernière
                génération. Voici, en détail, les technologies qui font la
                différence — et tout ce qu&apos;elles changent pour vous.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-9 rule-gold max-w-xs opacity-70" />
            </Reveal>
          </div>

          {/* Detailed list */}
          <div className="flex flex-col">
            {technologies.map((t, i) => {
              const Icon = ICONS[t.icon];
              return (
                <Reveal key={t.name} delay={i * 70}>
                  <article className="group flex gap-6 border-b border-hairline py-8 first:pt-0 last:border-b-0 transition-colors duration-500 hover:bg-linen/40 hover:px-5 hover:-mx-5 hover:rounded-2xl">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sand text-espresso transition-colors duration-500 group-hover:bg-espresso group-hover:text-cream">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-espresso">
                        {t.name}
                      </h3>
                      <p className="mt-2 text-[0.92rem] leading-relaxed text-ink">
                        {t.text}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
