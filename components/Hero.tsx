"use client";

import BookingButtons from "./BookingButtons";
import type { Home, Settings } from "@/lib/content";

export default function Hero({
  home,
  settings,
}: {
  home: Home;
  settings: Settings;
}) {
  return (
    <section id="accueil" className="relative min-h-[100dvh] w-full overflow-hidden">
      {/* Video */}
      <div className="absolute inset-0">
        <video
          className="kenburns h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/video/hero-poster.jpg"
        >
          <source src="/assets/video/hero.mp4" type="video/mp4" />
        </video>
        {/* Warm cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/55 via-espresso/35 to-espresso/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/40 to-transparent" />
        <div
          className="absolute inset-0 mix-blend-soft-light opacity-40"
          style={{
            background:
              "radial-gradient(120% 80% at 20% 90%, rgba(194,163,107,0.45), transparent 60%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-center px-6 pt-28 pb-44 lg:px-10">
        <div className="max-w-3xl">
          <span
            className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/5 px-4 py-1.5 text-[0.62rem] uppercase tracking-eyebrow text-cream/90 backdrop-blur-sm opacity-0"
            style={{ animation: "fadeUp 0.9s var(--ease-lux) 0.1s forwards" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
            {home.heroEyebrow}
          </span>

          <h1
            className="font-display mt-7 text-[clamp(2.7rem,7vw,5.6rem)] font-light leading-[0.98] text-cream text-balance opacity-0"
            style={{ animation: "fadeUp 1s var(--ease-lux) 0.22s forwards" }}
          >
            {home.heroTitleLine1}
            <br />
            <span className="italic text-gold-soft">
              {home.heroTitleEmphasis}
            </span>{" "}
            {home.heroTitleLine3}
          </h1>

          <p
            className="mt-7 max-w-xl text-base leading-relaxed text-cream/80 opacity-0 sm:text-lg"
            style={{ animation: "fadeUp 1s var(--ease-lux) 0.36s forwards" }}
          >
            {home.heroSubtitle}
          </p>

          <div
            className="mt-10 flex flex-col gap-5 opacity-0"
            style={{ animation: "fadeUp 1s var(--ease-lux) 0.5s forwards" }}
          >
            <BookingButtons settings={settings} tone="dark" />
            <a
              href="#specialites"
              className="link-underline w-max text-[0.82rem] uppercase tracking-[0.16em] text-cream/80"
            >
              Découvrir nos spécialités
            </a>
          </div>
        </div>
      </div>

      {/* Floating stats bezel */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="bezel border-cream/15 bg-cream/10 backdrop-blur-xl">
            <div className="bezel-core grid grid-cols-2 gap-y-6 px-6 py-7 sm:px-10 md:grid-cols-4">
              {home.heroStats.map((s) => (
                <div key={s.label} className="text-center md:text-left">
                  <div className="font-display text-3xl text-cream sm:text-4xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[0.62rem] uppercase tracking-[0.2em] text-cream/65">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>
    </section>
  );
}
