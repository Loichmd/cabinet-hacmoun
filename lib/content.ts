import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

/* ---------- Types ---------- */
export type Settings = {
  phone: string;
  phoneDisplay: string;
  doctolib: string;
  email: string;
  addressStreet: string;
  addressCity: string;
  addressMaps: string;
};

export type Stat = { value: string; label: string };

export type Home = {
  heroEyebrow: string;
  heroTitleLine1: string;
  heroTitleEmphasis: string;
  heroTitleLine3: string;
  heroSubtitle: string;
  heroStats: Stat[];
  aboutHeading: string;
  aboutParagraph: string;
  aboutPoints: string[];
  aboutImage: string | null;
};

export type Specialty = {
  slug: string;
  name: string;
  order: number;
  icon: "implant" | "ortho" | "esthetique";
  shortText: string;
  image: string | null;
  cardItems: string[];
  title: string;
  intro: string;
  overview: string[];
  treatments: { title: string; text: string }[];
  process: { title: string; text: string }[];
  cabinet: { title: string; text: string }[];
  practitionerInitials: string;
  practitionerName: string;
  practitionerRole: string;
  practitionerNote: string;
  stats: Stat[];
};

export type TeamMember = {
  name: string;
  order: number;
  photo: string | null;
  initials: string;
  role: string;
  bio: string;
  tags: string[];
};

export type Testimonial = {
  name: string;
  order: number;
  initials: string;
  treatment: string;
  text: string;
};

export type Faq = { question: string; order: number; answer: string };

export type Technology = {
  name: string;
  order: number;
  icon: "scan" | "simulation" | "aligner" | "sparkle" | "calm" | "tooth";
  text: string;
};

export type Feature = {
  title: string;
  order: number;
  icon: "scan" | "simulation" | "calm" | "wallet" | "calendar" | "shield";
  big: boolean;
  text: string;
};

export type QuizQuestion = {
  question: string;
  order: number;
  theme: string;
  answer: "vrai" | "faux";
  explanationCorrect: string;
  explanationWrong: string;
};

const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

/* ---------- Readers ---------- */
export async function getSettings(): Promise<Settings> {
  return (await reader.singletons.settings.read()) as Settings;
}

export async function getHome(): Promise<Home> {
  const h = await reader.singletons.home.read();
  return {
    ...h,
    heroStats: [...(h?.heroStats ?? [])],
    aboutPoints: [...(h?.aboutPoints ?? [])],
  } as Home;
}

export async function getSpecialties(): Promise<Specialty[]> {
  const items = await reader.collections.specialties.all();
  return items
    .map((i) => normalizeSpecialty(i.slug, i.entry))
    .sort(byOrder);
}

export async function getSpecialty(
  slug: string,
): Promise<Specialty | null> {
  const entry = await reader.collections.specialties.read(slug);
  return entry ? normalizeSpecialty(slug, entry) : null;
}

export async function listSpecialtySlugs(): Promise<string[]> {
  return [...(await reader.collections.specialties.list())];
}

function normalizeSpecialty(
  slug: string,
  e: Awaited<ReturnType<typeof reader.collections.specialties.read>> &
    object,
): Specialty {
  return {
    slug,
    name: e.name,
    order: e.order ?? 0,
    icon: e.icon,
    shortText: e.shortText,
    image: e.image ?? null,
    cardItems: [...e.cardItems],
    title: e.title,
    intro: e.intro,
    overview: [...e.overview],
    treatments: e.treatments.map((t) => ({ ...t })),
    process: e.process.map((t) => ({ ...t })),
    cabinet: e.cabinet.map((t) => ({ ...t })),
    practitionerInitials: e.practitionerInitials,
    practitionerName: e.practitionerName,
    practitionerRole: e.practitionerRole,
    practitionerNote: e.practitionerNote,
    stats: e.stats.map((t) => ({ ...t })),
  };
}

export async function getTeam(): Promise<TeamMember[]> {
  const items = await reader.collections.team.all();
  return items
    .map((i) => ({ ...i.entry, tags: [...i.entry.tags] }) as TeamMember)
    .sort(byOrder);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const items = await reader.collections.testimonials.all();
  return items.map((i) => ({ ...i.entry }) as Testimonial).sort(byOrder);
}

export async function getFaq(): Promise<Faq[]> {
  const items = await reader.collections.faq.all();
  return items.map((i) => ({ ...i.entry }) as Faq).sort(byOrder);
}

export async function getTechnologies(): Promise<Technology[]> {
  const items = await reader.collections.technologies.all();
  return items.map((i) => ({ ...i.entry }) as Technology).sort(byOrder);
}

export async function getFeatures(): Promise<Feature[]> {
  const items = await reader.collections.features.all();
  return items.map((i) => ({ ...i.entry }) as Feature).sort(byOrder);
}

export async function getQuiz(): Promise<QuizQuestion[]> {
  const items = await reader.collections.quiz.all();
  return items.map((i) => ({ ...i.entry }) as QuizQuestion).sort(byOrder);
}
