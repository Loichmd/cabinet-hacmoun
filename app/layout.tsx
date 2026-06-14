import type { Metadata } from "next";
import { Fraunces, Jost } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cabinet-hacmoun.vercel.app"),
  title: {
    default: "Dr. Hacmoun · Cabinet Dentaire d'Exception — Nice",
    template: "%s · Dr. Hacmoun",
  },
  description:
    "Cabinet dentaire haut de gamme à Nice. Implantologie, orthodontie invisible et esthétique du sourire dans un écrin de luxe. Une expérience dentaire repensée par le Dr. David Hacmoun.",
  keywords: [
    "dentiste Nice",
    "implant dentaire Nice",
    "esthétique dentaire",
    "Invisalign Nice",
    "cabinet dentaire luxe",
    "facettes dentaires",
  ],
  openGraph: {
    title: "Dr. Hacmoun · Cabinet Dentaire d'Exception",
    description:
      "Une expérience dentaire d'exception, alliant technologie de pointe et raffinement absolu.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${jost.variable}`}>
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
