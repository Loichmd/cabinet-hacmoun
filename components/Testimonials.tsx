import Reveal from "./Reveal";
import { Star, Quote } from "./icons";
import type { Testimonial } from "@/lib/content";

export default function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <section className="bg-cream py-28 lg:py-40">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-1.5 text-[0.62rem] uppercase tracking-eyebrow text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
              Ils nous ont confié leur sourire
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display mt-6 max-w-2xl text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.05] text-espresso text-balance">
              L&apos;excellence se mesure à la confiance qu&apos;elle inspire
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-6 flex items-center gap-3 text-sm text-ink">
              <span className="flex gap-0.5 text-champagne">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4" />
                ))}
              </span>
              <span className="tracking-wide">
                4,9/5 · plus de 4 800 patients accompagnés
              </span>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {testimonials.map((r, i) => (
            <Reveal key={r.name} delay={i * 110}>
              <figure className="flex h-full flex-col rounded-[1.8rem] border border-hairline bg-porcelain p-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:lift">
                <Quote className="h-8 w-8 text-sand" />
                <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-ink">
                  “{r.text}”
                </blockquote>
                <div className="my-6 rule-gold opacity-60" />
                <figcaption className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sand font-display text-sm text-espresso">
                    {r.initials}
                  </span>
                  <div>
                    <div className="font-medium text-espresso">{r.name}</div>
                    <div className="text-[0.7rem] uppercase tracking-[0.16em] text-mute">
                      {r.treatment}
                    </div>
                  </div>
                  <span className="ml-auto flex gap-0.5 text-champagne">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-3.5 w-3.5" />
                    ))}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
