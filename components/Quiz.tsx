"use client";

import {
  useCallback,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { ArrowUpRight } from "./icons";
import type { QuizQuestion, Settings } from "@/lib/content";

/* ------------------------------------------------------------------ */
/*  Icônes locales                                                     */
/* ------------------------------------------------------------------ */
type P = { className?: string };

const Check = (p: P) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    <path d="m5 12 4.5 4.5L19 7" />
  </svg>
);

const Cross = (p: P) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

const Restart = (p: P) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    <path d="M3 12a9 9 0 1 1 2.64 6.36" />
    <path d="M3 20v-6h6" />
  </svg>
);

const Arrow = (p: P) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const Trophy = (p: P) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
    <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
    <path d="M12 14v3m-3 3h6" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Sauvegarde locale (localStorage)                                   */
/* ------------------------------------------------------------------ */
type Choice = "vrai" | "faux";
type Stage = "intro" | "quiz" | "result";

const STORE_KEY = "hacmoun-quiz-v1";

type Session = {
  sig: string;
  stage: Stage;
  index: number;
  answers: (Choice | null)[];
  best: number | null;
};

/** Empreinte du questionnaire : si le cabinet modifie les questions
 *  depuis le CMS, la sauvegarde devenue périmée est ignorée. */
function signature(qs: QuizQuestion[]) {
  const s = qs.map((q) => `${q.question}#${q.answer}`).join("|");
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return `${qs.length}.${h}`;
}

/* -- Micro-store branché sur localStorage --------------------------
   La sauvegarde est la source de vérité : le composant la lit via
   useSyncExternalStore, ce qui restitue la progression au rechargement
   sans décalage d'hydratation. Repli en mémoire si le stockage est
   indisponible (navigation privée, quota). ------------------------- */
const listeners = new Set<() => void>();
let memoryFallback: string | null = null;
let useMemory = false;

function getRaw(): string | null {
  if (useMemory) return memoryFallback;
  try {
    return window.localStorage.getItem(STORE_KEY);
  } catch {
    useMemory = true;
    return memoryFallback;
  }
}

function setRaw(value: string) {
  if (!useMemory) {
    try {
      window.localStorage.setItem(STORE_KEY, value);
    } catch {
      useMemory = true;
    }
  }
  if (useMemory) memoryFallback = value;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function parseSession(
  raw: string | null,
  sig: string,
  total: number,
): Session {
  const fresh: Session = {
    sig,
    stage: "intro",
    index: 0,
    answers: Array(total).fill(null),
    best: null,
  };
  if (!raw) return fresh;
  try {
    const p = JSON.parse(raw) as Session;
    if (p.sig !== sig || !Array.isArray(p.answers) || p.answers.length !== total)
      return fresh;
    return {
      sig,
      stage: p.stage === "quiz" || p.stage === "result" ? p.stage : "intro",
      index: Math.min(Math.max(p.index ?? 0, 0), total - 1),
      answers: p.answers.map((a) => (a === "vrai" || a === "faux" ? a : null)),
      best: typeof p.best === "number" ? p.best : null,
    };
  } catch {
    return fresh;
  }
}

/* ------------------------------------------------------------------ */
/*  Typographie française                                              */
/*  Les textes saisis dans le CMS s'écrivent normalement ; on insère   */
/*  ici les espaces insécables pour qu'aucune ponctuation double ne    */
/*  se retrouve seule en début de ligne sur mobile.                    */
/* ------------------------------------------------------------------ */
function fr(text: string) {
  return text
    .replace(/ :/g, " :")
    .replace(/ ([;!?%])/g, " $1")
    .replace(/« /g, "« ")
    .replace(/ »/g, " »");
}

/* ------------------------------------------------------------------ */
/*  Paliers de score                                                   */
/* ------------------------------------------------------------------ */
const BANDS = [
  {
    min: 0.9,
    title: "Sourire d'expert",
    line: "Impressionnant. Vous maîtrisez les mécanismes de la maladie parodontale mieux que la grande majorité des patients. Reste l'essentiel : un suivi régulier pour transformer ce savoir en résultats durables.",
  },
  {
    min: 0.7,
    title: "Très belles bases",
    line: "Vous avez de solides réflexes et vous savez repérer les signaux d'alerte. Quelques subtilités vous ont échappé — précisément celles que nous prenons le temps d'expliquer lors du bilan parodontal.",
  },
  {
    min: 0.45,
    title: "Sur la bonne voie",
    line: "Vous connaissez les grandes lignes, mais plusieurs idées reçues persistent. C'est le cas de la plupart des patients : la parodontologie reste la discipline la moins bien connue de la dentisterie.",
  },
  {
    min: 0,
    title: "Tout reste à découvrir",
    line: "Et c'est une excellente nouvelle : la maladie parodontale se soigne d'autant mieux qu'elle est comprise et prise tôt. Un bilan parodontal complet est le meilleur point de départ.",
  },
];

const bandFor = (ratio: number) =>
  BANDS.find((b) => ratio >= b.min) ?? BANDS[BANDS.length - 1];

const SIGNALS = [
  {
    title: "Vos gencives saignent",
    text: "Au brossage, au fil dentaire ou spontanément. Une gencive saine ne saigne jamais : c'est le tout premier signal d'alerte, et le plus facile à ignorer.",
  },
  {
    title: "Vos dents bougent ou se déchaussent",
    text: "Mobilité dentaire, rétraction des gencives, apparition de triangles noirs, bourrage alimentaire : autant de signes d'une perte d'attache déjà engagée.",
  },
  {
    title: "Une haleine qui persiste",
    text: "L'halitose accompagne fréquemment la parodontite. Elle est provoquée par les bactéries logées sous la gencive, qu'aucun bain de bouche ne peut atteindre seul.",
  },
];

/* ------------------------------------------------------------------ */
/*  Composant                                                          */
/* ------------------------------------------------------------------ */
export default function Quiz({
  questions,
  settings,
}: {
  questions: QuizQuestion[];
  settings: Settings;
}) {
  const total = questions.length;
  const sig = useMemo(() => signature(questions), [questions]);

  /* La progression vit dans le stockage local, pas dans un état React :
     un rechargement de page remet donc toutes les questions à jour. */
  const raw = useSyncExternalStore(subscribe, getRaw, () => null);
  const session = useMemo(
    () => parseSession(raw, sig, total),
    [raw, sig, total],
  );
  const { stage, index, answers, best } = session;

  /* Purement visuel, volontairement non sauvegardé. */
  const [isRecord, setIsRecord] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  const score = useMemo(
    () =>
      answers.filter((a, i) => a !== null && a === questions[i]?.answer).length,
    [answers, questions],
  );

  const commit = useCallback(
    (patch: Partial<Session>) => {
      setRaw(JSON.stringify({ ...session, ...patch, sig }));
    },
    [session, sig],
  );

  /* -- Navigation -------------------------------------------------- */
  const scrollTop = useCallback((delay = 60) => {
    window.setTimeout(
      () =>
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      delay,
    );
  }, []);

  const start = useCallback(() => {
    setIsRecord(false);
    commit({ stage: "quiz", index: 0, answers: Array(total).fill(null) });
    scrollTop();
  }, [commit, total, scrollTop]);

  const pick = useCallback(
    (choice: Choice) => {
      if (answers[index] !== null) return;
      const nextAnswers = [...answers];
      nextAnswers[index] = choice;
      commit({ answers: nextAnswers });
      window.setTimeout(
        () =>
          feedbackRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          }),
        120,
      );
    },
    [answers, index, commit],
  );

  const next = useCallback(() => {
    if (index + 1 >= total) {
      const finalScore = answers.filter(
        (a, i) => a !== null && a === questions[i].answer,
      ).length;
      const beaten = best !== null && finalScore > best;
      setIsRecord(beaten);
      commit({
        stage: "result",
        best: best === null || finalScore > best ? finalScore : best,
      });
      scrollTop();
      return;
    }
    commit({ index: index + 1 });
    scrollTop();
  }, [index, total, answers, questions, best, commit, scrollTop]);

  if (total === 0) return null;

  /* ================================================================ */
  /*  1. Page de garde                                                */
  /* ================================================================ */
  if (stage === "intro") {
    return (
      <section
        ref={topRef}
        className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-espresso px-5 pt-28 pb-14 text-cream sm:px-6 sm:pt-32 sm:pb-16 lg:px-10"
      >
        <div
          className="pointer-events-none absolute -top-40 right-0 h-[36rem] w-[36rem] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(194,163,107,0.5), transparent 65%)",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-52 -left-32 h-[32rem] w-[32rem] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(194,163,107,0.45), transparent 65%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-3xl">
          <Reveal>
            <nav className="flex flex-wrap items-center gap-2 text-[0.66rem] uppercase tracking-[0.18em] text-cream/50">
              <Link href="/" className="transition-colors hover:text-cream">
                Accueil
              </Link>
              <span>/</span>
              <span className="text-gold-soft">Quiz gencives</span>
            </nav>
          </Reveal>

          <Reveal delay={60}>
            <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-1.5 text-[0.6rem] uppercase tracking-eyebrow text-gold-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
              Parodontologie · Vrai ou Faux
            </span>
          </Reveal>

          <Reveal delay={110}>
            <h1 className="font-display mt-6 text-[clamp(2.1rem,9vw,4rem)] font-light leading-[1.05] text-cream text-balance">
              Connaissez-vous vraiment vos gencives&nbsp;?
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-cream/70 sm:text-base">
              La maladie parodontale touche près d&apos;un adulte sur deux, et
              reste pourtant la moins bien connue. {total}&nbsp;affirmations, deux
              réponses possibles, et une explication à chaque fois&nbsp;— que
              vous ayez juste ou faux.
            </p>
          </Reveal>

          {/* Bouton de démarrage -------------------------------------- */}
          <Reveal delay={220}>
            <div className="mt-9 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
              <button
                type="button"
                onClick={start}
                className="group flex items-center justify-between gap-4 rounded-full bg-cream py-2 pl-7 pr-2 text-[0.78rem] uppercase tracking-[0.16em] text-espresso transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-porcelain active:scale-[0.985] sm:justify-start"
              >
                Commencer le quiz
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-espresso text-cream transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">
                  <Arrow className="h-4 w-4" />
                </span>
              </button>

              {best !== null && (
                <span className="inline-flex items-center justify-center gap-2.5 rounded-full border border-cream/15 px-5 py-3 text-[0.68rem] uppercase tracking-[0.16em] text-gold-soft">
                  <Trophy className="h-4 w-4" />
                  Meilleur score&nbsp;: {best}/{total}
                </span>
              )}
            </div>
          </Reveal>

          {/* Repères -------------------------------------------------- */}
          <Reveal delay={280}>
            <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-[1.4rem] border border-cream/10 sm:mt-12">
              {[
                { value: String(total), label: "affirmations" },
                { value: "3", label: "minutes" },
                { value: "100%", label: "expliqué" },
              ].map((h) => (
                <div
                  key={h.label}
                  className="bg-cream/[0.04] px-3 py-5 text-center sm:px-6"
                >
                  <div className="font-display text-2xl leading-none text-cream sm:text-3xl">
                    {h.value}
                  </div>
                  <div className="mt-2 text-[0.58rem] uppercase tracking-[0.16em] text-cream/55 sm:text-[0.62rem]">
                    {h.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={330}>
            <p className="mt-6 text-[0.72rem] leading-relaxed text-cream/40">
              Votre progression est conservée sur cet appareil&nbsp;: vous
              pouvez fermer la page et reprendre plus tard.
            </p>
          </Reveal>
        </div>
      </section>
    );
  }

  /* ================================================================ */
  /*  3. Résultat                                                      */
  /* ================================================================ */
  if (stage === "result") {
    const ratio = score / total;
    const band = bandFor(ratio);
    const R = 52;
    const C = 2 * Math.PI * R;

    return (
      <>
        <section
          ref={topRef}
          className="scroll-mt-24 bg-cream px-5 pt-28 pb-12 sm:px-6 sm:pt-32 sm:pb-16 lg:px-10 lg:pb-20"
        >
          <div className="mx-auto max-w-3xl">
            <div className="overflow-hidden rounded-[1.75rem] border border-hairline bg-porcelain sm:rounded-[2.25rem]">
              {/* Bandeau score ------------------------------------- */}
              <div className="relative overflow-hidden bg-espresso px-6 py-12 text-center sm:px-10 sm:py-16">
                <div
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{
                    background:
                      "radial-gradient(80% 60% at 50% 0%, rgba(194,163,107,0.35), transparent 65%)",
                  }}
                />
                <div className="relative">
                  <span className="text-[0.6rem] uppercase tracking-eyebrow text-gold-soft">
                    Votre résultat
                  </span>

                  <div className="relative mx-auto mt-7 h-32 w-32 sm:h-36 sm:w-36">
                    <svg
                      viewBox="0 0 120 120"
                      className="h-full w-full -rotate-90"
                    >
                      <circle
                        cx="60"
                        cy="60"
                        r={R}
                        fill="none"
                        stroke="rgba(250,246,238,0.14)"
                        strokeWidth="5"
                      />
                      <circle
                        className="quiz-ring"
                        cx="60"
                        cy="60"
                        r={R}
                        fill="none"
                        stroke="var(--color-champagne)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={C}
                        strokeDashoffset={C * (1 - ratio)}
                        style={{ ["--ring-len" as string]: `${C}` }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display text-4xl leading-none text-cream sm:text-5xl">
                        {score}
                      </span>
                      <span className="mt-1.5 text-[0.65rem] uppercase tracking-[0.18em] text-cream/50">
                        sur {total}
                      </span>
                    </div>
                  </div>

                  {isRecord && (
                    <span className="quiz-in mt-7 inline-flex items-center gap-2 rounded-full border border-champagne/40 bg-champagne/10 px-4 py-1.5 text-[0.6rem] uppercase tracking-eyebrow text-gold-soft">
                      <Trophy className="h-3.5 w-3.5" />
                      Nouveau record
                    </span>
                  )}

                  <h2 className="font-display mt-7 text-[clamp(1.7rem,7vw,2.75rem)] font-light leading-tight text-cream text-balance">
                    {band.title}
                  </h2>
                  <p className="mx-auto mt-5 max-w-xl text-[0.95rem] leading-relaxed text-cream/70">
                    {fr(band.line)}
                  </p>

                  {best !== null && !isRecord && best > score && (
                    <p className="mt-5 text-[0.66rem] uppercase tracking-[0.16em] text-cream/45">
                      Votre meilleur score&nbsp;: {best}/{total}
                    </p>
                  )}
                </div>
              </div>

              {/* Récapitulatif ------------------------------------- */}
              <div className="px-5 py-9 sm:px-10 sm:py-12">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl text-espresso sm:text-2xl">
                    Le détail de vos réponses
                  </h3>
                  <span className="shrink-0 text-[0.62rem] uppercase tracking-[0.16em] text-mute">
                    {score}/{total}
                  </span>
                </div>

                <ul className="mt-6 flex flex-col gap-2.5">
                  {questions.map((item, i) => {
                    const ok = answers[i] === item.answer;
                    return (
                      <li
                        key={item.question}
                        className={`flex gap-3.5 rounded-2xl border p-4 sm:gap-4 sm:p-5 ${
                          ok
                            ? "border-sage/25 bg-sage-soft/50"
                            : "border-clay/25 bg-clay-soft/50"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white ${
                            ok ? "bg-sage" : "bg-clay"
                          }`}
                        >
                          {ok ? (
                            <Check className="h-3.5 w-3.5" />
                          ) : (
                            <Cross className="h-3.5 w-3.5" />
                          )}
                        </span>
                        <div className="min-w-0">
                          <p className="text-[0.9rem] leading-snug text-espresso">
                            {fr(item.question)}
                          </p>
                          <p className="mt-1.5 text-[0.68rem] uppercase tracking-[0.14em] text-mute">
                            {ok ? (
                              <>Bonne réponse&nbsp;: {item.answer}</>
                            ) : (
                              <>
                                Vous avez répondu {answers[i]}
                                <span className="mx-1.5 text-greige">·</span>
                                <span className="text-clay">
                                  réponse&nbsp;: {item.answer}
                                </span>
                              </>
                            )}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* Actions ---------------------------------------- */}
                <div className="mt-9 flex flex-col gap-3">
                  <a
                    href={settings.doctolib}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-full bg-espresso py-2 pl-7 pr-2 text-[0.76rem] uppercase tracking-[0.16em] text-cream transition-colors hover:bg-[#2c241a]"
                  >
                    Demander un bilan parodontal
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream/15 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={start}
                    className="flex items-center justify-center gap-2.5 rounded-full py-3.5 text-[0.76rem] uppercase tracking-[0.16em] text-espresso ring-1 ring-espresso/20 transition-colors hover:bg-espresso/[0.04] hover:ring-espresso/40"
                  >
                    <Restart className="h-4 w-4" />
                    Refaire le quiz
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      commit({ stage: "intro" });
                      scrollTop();
                    }}
                    className="link-underline mx-auto mt-1 w-max text-[0.72rem] uppercase tracking-[0.16em] text-mute transition-colors hover:text-espresso"
                  >
                    Revenir à la présentation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rappel pédagogique ------------------------------------- */}
        <section className="bg-linen px-5 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-1.5 text-[0.6rem] uppercase tracking-eyebrow text-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                Ce qu&apos;il faut retenir
              </span>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="font-display mt-6 text-[clamp(1.7rem,6.5vw,2.6rem)] font-light leading-[1.08] text-espresso text-balance">
                Trois signaux qui méritent un avis
              </h2>
            </Reveal>

            <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:gap-4">
              {SIGNALS.map((item, i) => (
                <Reveal key={item.title} delay={i * 90}>
                  <div className="flex gap-4 rounded-[1.4rem] border border-hairline bg-porcelain p-5 sm:gap-5 sm:rounded-[1.6rem] sm:p-7">
                    <span className="font-display text-xl text-greige sm:text-2xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-espresso sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[0.92rem] leading-relaxed text-ink">
                        {fr(item.text)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={280}>
              <p className="mt-10 text-[0.85rem] leading-relaxed text-mute">
                Ce quiz a une vocation informative et ne remplace en aucun cas un
                examen clinique. Seul un bilan parodontal réalisé au cabinet
                permet d&apos;établir un diagnostic.
              </p>
            </Reveal>
          </div>
        </section>
      </>
    );
  }

  /* ================================================================ */
  /*  2. Question en cours                                             */
  /* ================================================================ */
  const q = questions[index];
  const picked = answers[index];
  const answered = picked !== null;
  const isCorrect = answered && picked === q.answer;
  const progress = ((index + (answered ? 1 : 0)) / total) * 100;

  /* Série de bonnes réponses consécutives, jusqu'à la question en cours */
  let streak = 0;
  for (let i = index; i >= 0; i--) {
    if (answers[i] !== null && answers[i] === questions[i].answer) streak++;
    else break;
  }

  return (
    <section
      ref={topRef}
      className="scroll-mt-24 bg-cream px-5 pt-28 pb-14 sm:px-6 sm:pt-32 sm:pb-20 lg:px-10 lg:pb-24"
    >
      <div className="mx-auto max-w-3xl">
        {/* Progression -------------------------------------------- */}
        <div className="mb-5 sm:mb-7">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[0.62rem] uppercase tracking-eyebrow text-gold">
              {q.theme}
            </span>
            <span className="font-display text-sm text-mute">
              <span className="text-espresso">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mx-1 text-greige">/</span>
              {String(total).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-espresso/[0.08]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-soft to-champagne transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {questions.map((item, i) => {
                const a = answers[i];
                const state =
                  a === null
                    ? i === index
                      ? "now"
                      : "todo"
                    : a === item.answer
                      ? "ok"
                      : "ko";
                return (
                  <span
                    key={item.question}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      state === "ok"
                        ? "w-5 bg-sage"
                        : state === "ko"
                          ? "w-5 bg-clay"
                          : state === "now"
                            ? "w-7 bg-champagne"
                            : "w-2.5 bg-espresso/10"
                    }`}
                  />
                );
              })}
            </div>

            {streak >= 2 && (
              <span className="quiz-in shrink-0 whitespace-nowrap text-[0.6rem] uppercase tracking-[0.16em] text-sage">
                Série de {streak}
              </span>
            )}
          </div>
        </div>

        {/* Carte question ----------------------------------------- */}
        <div className="overflow-hidden rounded-[1.75rem] border border-hairline bg-porcelain sm:rounded-[2.25rem]">
          <div className="px-5 pt-8 pb-6 sm:px-10 sm:pt-12 sm:pb-9">
            <p
              key={q.question}
              className="quiz-in font-display text-[clamp(1.45rem,6.2vw,2.35rem)] font-light leading-[1.18] text-espresso text-balance"
            >
              {fr(q.question)}
            </p>

            <div className="mt-7 grid gap-3 sm:mt-9 sm:grid-cols-2 sm:gap-4">
              {(["vrai", "faux"] as const).map((choice) => {
                const isPicked = picked === choice;
                const isRight = q.answer === choice;

                let tone =
                  "border-hairline bg-cream text-espresso active:scale-[0.985] hover:border-champagne/60 hover:bg-linen";
                if (answered) {
                  if (isRight) tone = "border-sage/45 bg-sage-soft text-sage";
                  else if (isPicked)
                    tone = "border-clay/45 bg-clay-soft text-clay";
                  else tone = "border-hairline bg-cream/60 text-mute opacity-60";
                }

                return (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => pick(choice)}
                    disabled={answered}
                    aria-label={
                      choice === "vrai" ? "Répondre Vrai" : "Répondre Faux"
                    }
                    className={`${isPicked ? "quiz-pop " : ""}flex min-h-[4.5rem] items-center justify-between gap-3 rounded-[1.15rem] border px-6 py-5 text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:min-h-[5.5rem] sm:rounded-[1.35rem] ${tone}`}
                  >
                    <span className="font-display text-2xl leading-none sm:text-[1.75rem]">
                      {choice === "vrai" ? "Vrai" : "Faux"}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                        answered && isRight
                          ? "bg-sage text-white"
                          : answered && isPicked
                            ? "bg-clay text-white"
                            : "bg-espresso/[0.06] text-greige"
                      }`}
                    >
                      {answered && isRight ? (
                        <Check className="h-4 w-4" />
                      ) : answered && isPicked ? (
                        <Cross className="h-4 w-4" />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explication — affichée dans les deux cas -------------- */}
          {answered && (
            <div
              ref={feedbackRef}
              className={`quiz-in scroll-mt-24 border-t px-5 py-7 sm:px-10 sm:py-9 ${
                isCorrect
                  ? "border-sage/20 bg-sage-soft/45"
                  : "border-clay/20 bg-clay-soft/45"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white ${
                    isCorrect ? "bg-sage" : "bg-clay"
                  }`}
                >
                  {isCorrect ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Cross className="h-4 w-4" />
                  )}
                </span>
                <span
                  className={`text-[0.66rem] uppercase tracking-eyebrow ${
                    isCorrect ? "text-sage" : "text-clay"
                  }`}
                >
                  {isCorrect ? "Bonne réponse" : `Réponse : ${q.answer}`}
                </span>
              </div>

              <p className="mt-4 text-[0.95rem] leading-relaxed text-ink sm:text-base">
                {fr(isCorrect ? q.explanationCorrect : q.explanationWrong)}
              </p>

              <button
                type="button"
                onClick={next}
                className="group mt-7 flex w-full items-center justify-between gap-3 rounded-full bg-espresso py-2 pl-7 pr-2 text-[0.74rem] uppercase tracking-[0.16em] text-cream transition-colors hover:bg-[#2c241a] active:scale-[0.99] sm:w-auto"
              >
                {index + 1 >= total ? "Voir mon résultat" : "Question suivante"}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream/15 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">
                  <Arrow className="h-4 w-4" />
                </span>
              </button>
            </div>
          )}
        </div>

        {!answered && (
          <p className="mt-5 text-center text-[0.78rem] leading-relaxed text-mute">
            Choisissez une réponse — l&apos;explication s&apos;affiche dans tous
            les cas.
          </p>
        )}
      </div>
    </section>
  );
}
