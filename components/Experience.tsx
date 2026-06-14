import Reveal from "./Reveal";
import { Scan, Simulation, Calm, Wallet, Calendar, Shield } from "./icons";
import type { Feature } from "@/lib/content";

const ICONS = {
  scan: Scan,
  simulation: Simulation,
  calm: Calm,
  wallet: Wallet,
  calendar: Calendar,
  shield: Shield,
} as const;

export default function Experience({ features }: { features: Feature[] }) {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-espresso py-28 text-cream lg:py-40"
    >
      {/* Ambient gold glow */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[40rem] w-[40rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(194,163,107,0.5), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-1.5 text-[0.62rem] uppercase tracking-eyebrow text-gold-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
              L&apos;Expérience Hacmoun
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display mt-6 text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.05] text-cream text-balance">
              Tout est pensé pour votre{" "}
              <span className="italic text-gold-soft">confort</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-cream/70">
              De la première consultation au dernier rendez-vous, chaque détail
              est orchestré pour faire de votre venue une expérience apaisante et
              d&apos;exception.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3 md:grid-rows-2">
          {features.map((f, i) => {
            const Icon = ICONS[f.icon];
            return (
              <Reveal
                key={f.title}
                delay={i * 80}
                className={f.big ? "md:col-span-1 md:row-span-2" : ""}
              >
                <article
                  className={`group flex h-full flex-col rounded-[1.6rem] border border-cream/10 bg-cream/[0.04] p-7 backdrop-blur-sm transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-cream/25 hover:bg-cream/[0.07] ${
                    f.big ? "items-center justify-center text-center md:p-9" : ""
                  }`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cream/10 text-gold-soft transition-transform duration-500 group-hover:-translate-y-0.5">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className={f.big ? "mt-8" : "mt-6"}>
                    <h3
                      className={`font-display leading-tight text-cream ${
                        f.big ? "text-3xl" : "text-xl"
                      }`}
                    >
                      {f.title}
                    </h3>
                    <p
                      className={`mt-2.5 text-sm leading-relaxed text-cream/65 ${
                        f.big ? "mx-auto max-w-xs" : ""
                      }`}
                    >
                      {f.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
