import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import BookingButtons from "@/components/BookingButtons";
import CTA from "@/components/CTA";
import { Tooth, Aligner, Sparkle, ArrowUpRight } from "@/components/icons";
import {
  getSpecialty,
  getSpecialties,
  listSpecialtySlugs,
  getSettings,
} from "@/lib/content";

const ICONS = { implant: Tooth, ortho: Aligner, esthetique: Sparkle } as const;

export async function generateStaticParams() {
  return (await listSpecialtySlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = await getSpecialty(slug);
  if (!s) return {};
  return {
    title: s.name,
    description: s.intro,
  };
}

export default async function SpecialtyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [s, all, settings] = await Promise.all([
    getSpecialty(slug),
    getSpecialties(),
    getSettings(),
  ]);
  if (!s) notFound();

  const Icon = ICONS[s.icon];
  const others = all.filter((x) => x.slug !== s.slug);

  return (
    <main className="bg-cream">
      <Nav settings={settings} />

      {/* Hero ---------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-espresso pt-36 pb-20 text-cream lg:pt-44 lg:pb-28">
        <div
          className="pointer-events-none absolute -top-40 right-0 h-[40rem] w-[40rem] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(194,163,107,0.5), transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal>
            <nav className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-cream/50">
              <Link href="/" className="transition-colors hover:text-cream">
                Accueil
              </Link>
              <span>/</span>
              <Link
                href="/#specialites"
                className="transition-colors hover:text-cream"
              >
                Spécialités
              </Link>
              <span>/</span>
              <span className="text-gold-soft">{s.name}</span>
            </nav>
          </Reveal>

          <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-1.5 text-[0.62rem] uppercase tracking-eyebrow text-gold-soft">
                  <Icon className="h-4 w-4" />
                  {s.name}
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="font-display mt-6 text-[clamp(2.4rem,5.5vw,4.4rem)] font-light leading-[1.02] text-cream text-balance">
                  {s.title}
                </h1>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/75">
                  {s.intro}
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-9">
                  <BookingButtons settings={settings} tone="dark" />
                </div>
              </Reveal>
            </div>

            {/* Stats */}
            <Reveal delay={160}>
              <div className="flex flex-col gap-px overflow-hidden rounded-[1.6rem] border border-cream/10">
                {s.stats.map((st) => (
                  <div
                    key={st.label}
                    className="flex items-baseline justify-between gap-4 bg-cream/[0.04] px-6 py-5"
                  >
                    <span className="font-display text-3xl text-cream">
                      {st.value}
                    </span>
                    <span className="text-right text-[0.62rem] uppercase tracking-[0.16em] text-cream/60">
                      {st.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Overview ------------------------------------------------------ */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <div className="bezel bg-sand/40">
                <div className="bezel-core relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={s.image ?? "/assets/video/hero-poster.jpg"}
                    alt={`${s.name} — Cabinet Dr. Hacmoun`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent" />
                </div>
              </div>
            </Reveal>
            <div className="flex flex-col justify-center">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-1.5 text-[0.62rem] uppercase tracking-eyebrow text-gold">
                  <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                  Comprendre
                </span>
              </Reveal>
              {s.overview.map((p, i) => (
                <Reveal key={i} delay={80 + i * 80}>
                  <p
                    className={`max-w-xl text-base leading-relaxed text-ink ${
                      i === 0 ? "mt-6" : "mt-5"
                    }`}
                  >
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Treatments ---------------------------------------------------- */}
      <section className="bg-linen py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-1.5 text-[0.62rem] uppercase tracking-eyebrow text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
              Nos traitements
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display mt-6 max-w-2xl text-[clamp(1.8rem,4vw,3rem)] font-light leading-[1.06] text-espresso text-balance">
              Des solutions sur-mesure, pour chaque situation
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {s.treatments.map((t, i) => (
              <Reveal key={t.title} delay={i * 90}>
                <article className="group flex h-full gap-5 rounded-[1.6rem] border border-hairline bg-porcelain p-7 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:lift">
                  <span className="font-display text-2xl text-greige">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-espresso">
                      {t.title}
                    </h3>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-ink">
                      {t.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process ------------------------------------------------------- */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <Reveal className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-1.5 text-[0.62rem] uppercase tracking-eyebrow text-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                Le déroulé
              </span>
              <h2 className="font-display mt-6 text-[clamp(1.8rem,4vw,3rem)] font-light leading-[1.06] text-espresso text-balance">
                Votre parcours, étape par étape
              </h2>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {s.process.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="flex h-full flex-col rounded-[1.6rem] border border-hairline bg-porcelain p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-espresso font-display text-base text-cream">
                    {i + 1}
                  </span>
                  <h3 className="font-display mt-6 text-lg leading-snug text-espresso">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink">
                    {p.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The cabinet --------------------------------------------------- */}
      <section className="bg-linen py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-1.5 text-[0.62rem] uppercase tracking-eyebrow text-gold">
                  <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                  Au cabinet
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="font-display mt-6 text-[clamp(1.8rem,4vw,3rem)] font-light leading-[1.06] text-espresso text-balance">
                  Un écrin pensé pour l&apos;excellence
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-ink">
                  Parce qu&apos;un soin d&apos;exception se vit autant qu&apos;il
                  se reçoit, nous avons réuni les conditions d&apos;une prise en
                  charge irréprochable, dans un environnement à la hauteur de vos
                  attentes.
                </p>
              </Reveal>

              {/* Practitioner */}
              <Reveal delay={200}>
                <div className="mt-9 flex items-center gap-4 rounded-[1.4rem] border border-hairline bg-porcelain p-5">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sand font-display text-lg text-espresso ring-1 ring-champagne/40">
                    {s.practitionerInitials}
                  </span>
                  <div>
                    <div className="font-display text-lg text-espresso">
                      {s.practitionerName}
                    </div>
                    <div className="text-[0.62rem] uppercase tracking-[0.16em] text-gold">
                      {s.practitionerRole}
                    </div>
                    <p className="mt-1.5 text-[0.82rem] leading-relaxed text-ink">
                      {s.practitionerNote}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col gap-4">
              {s.cabinet.map((c, i) => (
                <Reveal key={c.title} delay={i * 90}>
                  <div className="group flex items-start gap-5 rounded-[1.6rem] border border-hairline bg-porcelain p-7 transition-all duration-500 hover:lift-soft">
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sand text-gold">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4.5 4.5L19 7" /></svg>
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-espresso">
                        {c.title}
                      </h3>
                      <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink">
                        {c.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking band -------------------------------------------------- */}
      <CTA settings={settings} />

      {/* Other specialties --------------------------------------------- */}
      <section className="bg-cream pb-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal>
            <div className="mb-10 rule-gold max-w-xs opacity-70" />
            <h2 className="font-display text-2xl text-espresso">
              Explorer nos autres spécialités
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {others.map((o, i) => {
              const OIcon = ICONS[o.icon];
              return (
                <Reveal key={o.slug} delay={i * 100}>
                  <Link
                    href={`/specialites/${o.slug}`}
                    className="group flex items-center gap-5 rounded-[1.6rem] border border-hairline bg-porcelain p-7 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:lift"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sand text-espresso transition-colors duration-500 group-hover:bg-espresso group-hover:text-cream">
                      <OIcon className="h-7 w-7" />
                    </span>
                    <div className="flex-1">
                      <h3 className="font-display text-xl text-espresso">
                        {o.name}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink">
                        {o.shortText}
                      </p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-greige transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Footer settings={settings} />
    </main>
  );
}
