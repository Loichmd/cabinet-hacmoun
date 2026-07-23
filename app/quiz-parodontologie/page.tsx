import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Quiz from "@/components/Quiz";
import { getQuiz, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Quiz — Connaissez-vous vos gencives ?",
  description:
    "12 affirmations, vrai ou faux, pour tester vos connaissances sur la parodontologie : gingivite, parodontite, contamination, diagnostic et traitements. Une explication à chaque réponse.",
  openGraph: {
    title: "Quiz — Connaissez-vous vos gencives ?",
    description:
      "Testez en 3 minutes ce que vous savez vraiment de la santé de vos gencives. Explication détaillée à chaque question.",
    type: "website",
    locale: "fr_FR",
  },
};

export default async function QuizPage() {
  const [questions, settings] = await Promise.all([getQuiz(), getSettings()]);

  return (
    <main className="bg-cream">
      <Nav settings={settings} />
      <Quiz questions={questions} settings={settings} />
      <Footer settings={settings} />
    </main>
  );
}
