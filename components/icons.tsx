import type { SVGProps } from "react";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

type P = SVGProps<SVGSVGElement>;

export const Tooth = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3.2c-2-1.4-4.6-1.5-6.1.2C4 5.4 4.4 8 5 11c.5 2.4.6 4.2 1.1 6.3.3 1.4.7 3 1.7 3 1.2 0 1.3-2 1.7-3.6.3-1.2.6-2 1.5-2s1.2.8 1.5 2c.4 1.6.5 3.6 1.7 3.6 1 0 1.4-1.6 1.7-3 .5-2.1.6-3.9 1.1-6.3.6-3 1-5.6-.9-7.6-1.5-1.7-4.1-1.6-6.1-.2Z" />
  </svg>
);

export const Aligner = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 8.5C5 6.6 6.4 5.5 8 5.7c1.4.2 2.4 1 4 1s2.6-.8 4-1c1.6-.2 3 .9 3 2.8 0 2.3-.7 4-1.7 5.6-1.1 1.8-2 3.4-3 3.9-.6.3-1.5.3-2.3 0-.5-.2-.9-.2-1.4 0-.8.3-1.7.3-2.3 0-1-.5-1.9-2.1-3-3.9C5.7 12.5 5 10.8 5 8.5Z" />
    <path d="M8.5 9.2c2.2.9 4.8.9 7 0" opacity=".6" />
  </svg>
);

export const Sparkle = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3.5c.4 3.6 1.9 5.1 5.5 5.5-3.6.4-5.1 1.9-5.5 5.5-.4-3.6-1.9-5.1-5.5-5.5C10.1 8.6 11.6 7.1 12 3.5Z" />
    <path d="M18 14.5c.2 1.6.8 2.2 2.4 2.4-1.6.2-2.2.8-2.4 2.4-.2-1.6-.8-2.2-2.4-2.4 1.6-.2 2.2-.8 2.4-2.4Z" />
  </svg>
);

export const Scan = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 8V6.5A2.5 2.5 0 0 1 6.5 4H8M16 4h1.5A2.5 2.5 0 0 1 20 6.5V8M20 16v1.5a2.5 2.5 0 0 1-2.5 2.5H16M8 20H6.5A2.5 2.5 0 0 1 4 17.5V16" />
    <path d="M7.5 12h9" opacity=".55" />
    <path d="M12 8.2c1.6 0 2.6 1.5 2.6 3.8S13.6 15.8 12 15.8 9.4 14.3 9.4 12 10.4 8.2 12 8.2Z" opacity=".55" />
  </svg>
);

export const Simulation = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5" width="17" height="12" rx="2" />
    <path d="M3.5 14.5c2.2-2.6 3.6-2.6 5.5-.4 1.6 1.8 2.6 1.6 4-.4 1.6-2.3 3-2.2 4 .1" opacity=".6" />
    <path d="M9 20h6M12 17v3" />
  </svg>
);

export const Calm = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21c5-3.2 7.5-6.4 7.5-10.1A4.4 4.4 0 0 0 12 7.8a4.4 4.4 0 0 0-7.5 3.1C4.5 14.6 7 17.8 12 21Z" />
    <path d="M8.5 11.5c1.2 1.4 5.8 1.4 7 0" opacity=".55" />
  </svg>
);

export const Shield = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3.5 19 6v5c0 4.2-2.9 7.7-7 9.5-4.1-1.8-7-5.3-7-9.5V6l7-2.5Z" />
    <path d="m9 11.5 2 2 4-4.2" opacity=".7" />
  </svg>
);

export const Wallet = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="6" width="17" height="12" rx="2.5" />
    <path d="M3.5 10h17" opacity=".55" />
    <circle cx="16.5" cy="14" r="1.1" opacity=".7" />
  </svg>
);

export const Calendar = (p: P) => (
  <svg {...base} {...p}>
    <rect x="4" y="5.5" width="16" height="15" rx="2.5" />
    <path d="M4 10h16M8 3.5v4M16 3.5v4" opacity=".7" />
    <path d="M8.5 14h2M13.5 14h2M8.5 17h2" opacity=".5" />
  </svg>
);

export const Phone = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6.5 4.5h2.6l1.3 3.2-1.9 1.4a10 10 0 0 0 4.7 4.7l1.4-1.9 3.2 1.3v2.6c0 1-.8 1.8-1.9 1.7A14 14 0 0 1 4.8 6.4 1.7 1.7 0 0 1 6.5 4.5Z" />
  </svg>
);

export const MapPin = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21c4-4 6-7.1 6-10a6 6 0 1 0-12 0c0 2.9 2 6 6 10Z" />
    <circle cx="12" cy="11" r="2.3" />
  </svg>
);

export const Mail = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
    <path d="m4.5 7.5 7.5 5 7.5-5" opacity=".7" />
  </svg>
);

export const Clock = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 7.8V12l3 1.8" opacity=".75" />
  </svg>
);

export const ArrowUpRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7.5 16.5 16.5 7.5M9 7.5h7.5V15" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4.5 12h15M13 5.5 19.5 12 13 18.5" />
  </svg>
);

export const Star = (p: P) => (
  <svg {...base} {...p} fill="currentColor" stroke="none">
    <path d="M12 3.5l2.4 5 5.5.7-4 3.8 1 5.4-4.9-2.7-4.9 2.7 1-5.4-4-3.8 5.5-.7Z" />
  </svg>
);

export const Quote = (p: P) => (
  <svg {...base} {...p} fill="currentColor" stroke="none">
    <path d="M9.5 6c-2.7 1-4.3 3.4-4.3 6.6V18h5.4v-5.4H7.9c0-1.7.8-2.9 2.4-3.6L9.5 6Zm9 0c-2.7 1-4.3 3.4-4.3 6.6V18h5.4v-5.4h-2.7c0-1.7.8-2.9 2.4-3.6L18.5 6Z" />
  </svg>
);

export const Plus = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
