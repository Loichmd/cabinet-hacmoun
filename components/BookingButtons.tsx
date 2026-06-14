import type { Settings } from "@/lib/content";
import { ArrowUpRight, Phone } from "./icons";

type Props = {
  settings: Pick<Settings, "phone" | "phoneDisplay" | "doctolib">;
  tone?: "light" | "dark";
  align?: "start" | "center";
};

/** Doctolib (primaire) + appel téléphonique (secondaire). */
export default function BookingButtons({
  settings,
  tone = "light",
  align = "start",
}: Props) {
  const dark = tone === "dark";

  return (
    <div
      className={`flex flex-wrap items-center gap-4 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      {/* Primary — Doctolib */}
      <a
        href={settings.doctolib}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-3 rounded-full py-2 pl-7 pr-2 text-[0.82rem] uppercase tracking-[0.16em] font-medium transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] ${
          dark
            ? "bg-cream text-espresso hover:bg-porcelain"
            : "bg-espresso text-cream hover:bg-[#2c241a]"
        }`}
      >
        Prendre RDV sur Doctolib
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105 ${
            dark ? "bg-espresso/[0.08] text-espresso" : "bg-cream/15 text-cream"
          }`}
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </a>

      {/* Secondary — phone */}
      <a
        href={`tel:${settings.phone}`}
        className={`group inline-flex items-center gap-3 rounded-full border py-2 pl-6 pr-2 text-[0.82rem] uppercase tracking-[0.16em] transition-colors duration-500 ${
          dark
            ? "border-cream/25 text-cream hover:border-cream/50"
            : "border-espresso/25 text-espresso hover:border-espresso/50"
        }`}
      >
        {settings.phoneDisplay}
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-105 ${
            dark ? "bg-cream/10" : "bg-espresso/[0.06]"
          }`}
        >
          <Phone className="h-4 w-4" />
        </span>
      </a>
    </div>
  );
}
