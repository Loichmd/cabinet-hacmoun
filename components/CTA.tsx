import Image from "next/image";
import Reveal from "./Reveal";
import BookingButtons from "./BookingButtons";
import type { Settings } from "@/lib/content";

export default function CTA({ settings }: { settings: Settings }) {
  return (
    <section className="bg-cream px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.4rem] px-8 py-20 text-center lg:px-16 lg:py-28">
            <Image
              src="/assets/video/hero-poster.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-espresso/75" />
            <div
              className="pointer-events-none absolute inset-0 opacity-50 mix-blend-soft-light"
              style={{
                background:
                  "radial-gradient(90% 70% at 50% 110%, rgba(194,163,107,0.6), transparent 60%)",
              }}
            />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-1.5 text-[0.62rem] uppercase tracking-eyebrow text-cream/90">
                <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                Votre nouveau sourire commence ici
              </span>
              <h2 className="font-display mx-auto mt-7 max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.04] text-cream text-balance">
                Prêt à transformer votre sourire&nbsp;?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/75">
                Offrez-vous une première consultation et découvrez ce que la
                dentisterie d&apos;exception peut faire pour vous.
              </p>
              <div className="mt-11 flex justify-center">
                <BookingButtons settings={settings} tone="dark" align="center" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
