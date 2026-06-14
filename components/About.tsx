import Image from "next/image";
import Reveal from "./Reveal";
import Button from "./Button";
import type { Home } from "@/lib/content";

export default function About({ home }: { home: Home }) {
  return (
    <section id="cabinet" className="relative bg-cream py-28 lg:py-40">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* Image column */}
          <Reveal className="order-2 lg:order-1">
            <div className="bezel bg-sand/40">
              <div className="bezel-core relative aspect-[4/5] overflow-hidden">
                <Image
                  src={home.aboutImage ?? "/assets/video/hero-poster.jpg"}
                  alt="Le cabinet dentaire Dr. Hacmoun"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent" />
              </div>
            </div>
            {/* Floating accolade */}
            <div className="-mt-16 ml-6 w-max rounded-[1.5rem] border border-hairline bg-porcelain px-7 py-5 lift-soft sm:ml-10">
              <div className="font-display text-3xl text-espresso">2 000+</div>
              <div className="text-[0.62rem] uppercase tracking-[0.2em] text-mute">
                Implants posés avec succès
              </div>
            </div>
          </Reveal>

          {/* Text column */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-1.5 text-[0.62rem] uppercase tracking-eyebrow text-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                Le Cabinet
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display mt-6 text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.05] text-espresso text-balance">
                {home.aboutHeading}
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-ink">
                {home.aboutParagraph}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <ul className="mt-9 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {home.aboutPoints.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-ink"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sand text-gold">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4.5 4.5L19 7" /></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-11 flex items-center gap-6">
                <Button href="#equipe" variant="outline">
                  Rencontrer l&apos;équipe
                </Button>
                <div className="flex flex-col leading-tight">
                  <span className="font-display text-xl italic text-espresso">
                    Dr. David Hacmoun
                  </span>
                  <span className="text-[0.62rem] uppercase tracking-[0.2em] text-mute">
                    Directeur médical
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
