"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "./icons";
import type { Settings } from "@/lib/content";

const HOURS = [
  ["Lun — Jeu", "8h30 — 19h30"],
  ["Vendredi", "8h30 — 18h00"],
  ["Samedi", "9h00 — 13h00"],
  ["Dimanche", "Fermé"],
];

const inputCls =
  "w-full rounded-2xl border border-hairline bg-porcelain px-5 py-3.5 text-sm text-espresso placeholder:text-mute/70 outline-none transition-all duration-500 focus:border-champagne focus:ring-2 focus:ring-champagne/20";

export default function Contact({ settings }: { settings: Settings }) {
  const [sent, setSent] = useState(false);

  const COORDS = [
    {
      icon: MapPin,
      label: "Adresse",
      lines: [settings.addressStreet, settings.addressCity],
      href: settings.addressMaps,
    },
    {
      icon: Phone,
      label: "Téléphone",
      lines: [settings.phoneDisplay],
      href: `tel:${settings.phone}`,
    },
    {
      icon: Mail,
      label: "Email",
      lines: [settings.email],
      href: `mailto:${settings.email}`,
    },
  ];

  return (
    <section id="contact" className="bg-cream py-28 lg:py-40">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Left — coordinates */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-1.5 text-[0.62rem] uppercase tracking-eyebrow text-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                Contact & Rendez-vous
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display mt-6 text-[clamp(2rem,4.4vw,3.2rem)] font-light leading-[1.05] text-espresso text-balance">
                Prenons rendez-vous
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-ink">
                Notre équipe vous recontacte sous 24h pour fixer votre première
                consultation, dans le respect de votre emploi du temps.
              </p>
            </Reveal>

            <div className="mt-10 flex flex-col gap-3">
              {COORDS.map((c, i) => {
                const Icon = c.icon;
                return (
                  <Reveal key={c.label} delay={180 + i * 70}>
                    <a
                      href={c.href}
                      className="group flex items-center gap-4 rounded-2xl border border-hairline bg-porcelain/60 p-4 transition-all duration-500 hover:bg-porcelain hover:lift-soft"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sand text-espresso">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-[0.6rem] uppercase tracking-[0.18em] text-mute">
                          {c.label}
                        </span>
                        {c.lines.map((l) => (
                          <span key={l} className="text-sm text-espresso">
                            {l}
                          </span>
                        ))}
                      </span>
                      <ArrowUpRight className="ml-auto h-4 w-4 text-greige transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                    </a>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={400}>
              <div className="mt-6 rounded-2xl border border-hairline bg-porcelain/60 p-5">
                <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.18em] text-mute">
                  <Clock className="h-4 w-4 text-gold" />
                  Horaires d&apos;ouverture
                </div>
                <dl className="mt-4 flex flex-col gap-2">
                  {HOURS.map(([d, h]) => (
                    <div
                      key={d}
                      className="flex items-center justify-between text-sm"
                    >
                      <dt className="text-ink">{d}</dt>
                      <dd className="font-medium text-espresso">{h}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal delay={120}>
            <div className="bezel bg-sand/30">
              <div className="bezel-core bg-porcelain p-7 sm:p-10">
                {sent ? (
                  <div className="flex min-h-[28rem] flex-col items-center justify-center text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sand text-gold">
                      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4.5 4.5L19 7" /></svg>
                    </span>
                    <h3 className="font-display mt-6 text-2xl text-espresso">
                      Merci pour votre confiance
                    </h3>
                    <p className="mt-3 max-w-sm text-sm text-ink">
                      Votre demande a bien été enregistrée. Nous vous
                      recontactons sous 24h pour confirmer votre rendez-vous.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                    className="flex flex-col gap-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input className={inputCls} placeholder="Prénom" required />
                      <input className={inputCls} placeholder="Nom" required />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        type="tel"
                        className={inputCls}
                        placeholder="Téléphone"
                        required
                      />
                      <input
                        type="email"
                        className={inputCls}
                        placeholder="Email"
                        required
                      />
                    </div>
                    <select className={`${inputCls} appearance-none`} defaultValue="">
                      <option value="" disabled>
                        Spécialité souhaitée
                      </option>
                      <option>Implantologie & Chirurgie</option>
                      <option>Orthodontie & Aligneurs</option>
                      <option>Esthétique du sourire</option>
                      <option>Consultation générale</option>
                    </select>
                    <textarea
                      className={`${inputCls} min-h-[8rem] resize-none`}
                      placeholder="Votre message (facultatif)"
                    />
                    <button
                      type="submit"
                      className="group mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-espresso py-4 text-[0.82rem] uppercase tracking-[0.16em] text-cream transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#2c241a] active:scale-[0.99]"
                    >
                      Envoyer ma demande
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/15 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </button>
                    <p className="text-center text-[0.68rem] leading-relaxed text-mute">
                      Vos données restent strictement confidentielles et ne
                      seront jamais transmises à des tiers.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
