"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { Plus } from "./icons";
import type { Faq } from "@/lib/content";

function Item({
  q,
  a,
  open,
  onClick,
}: {
  q: string;
  a: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-hairline">
      <button
        onClick={onClick}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left"
        aria-expanded={open}
      >
        <span
          className={`font-display text-lg leading-snug transition-colors duration-300 sm:text-xl ${
            open ? "text-espresso" : "text-ink group-hover:text-espresso"
          }`}
        >
          {q}
        </span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open
              ? "rotate-45 bg-espresso text-cream"
              : "bg-sand/60 text-espresso group-hover:bg-sand"
          }`}
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <div
        className="grid overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="min-h-0">
          <p className="max-w-2xl pb-7 pr-12 text-[0.92rem] leading-relaxed text-ink">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section id="faq" className="bg-linen py-28 lg:py-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:h-max">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-1.5 text-[0.62rem] uppercase tracking-eyebrow text-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                Questions fréquentes
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display mt-6 text-[clamp(2rem,4.4vw,3.2rem)] font-light leading-[1.05] text-espresso text-balance">
                Vos questions, nos réponses
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink">
                Une interrogation qui ne figure pas ici ? Notre équipe y répond
                avec plaisir, sans engagement.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <a
                href="#contact"
                className="link-underline mt-6 inline-block text-[0.78rem] uppercase tracking-[0.16em] text-gold"
              >
                Nous contacter
              </a>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="rounded-[1.8rem] border border-hairline bg-porcelain px-7 py-2 sm:px-9">
              {faqs.map((f, i) => (
                <Item
                  key={f.question}
                  q={f.question}
                  a={f.answer}
                  open={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
