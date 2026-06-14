import type { ReactNode } from "react";
import { ArrowUpRight } from "./icons";

type Variant = "solid" | "outline" | "ghost";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  icon?: boolean;
  className?: string;
  type?: "button" | "submit";
};

const variants: Record<Variant, string> = {
  solid: "bg-espresso text-cream hover:bg-[#2c241a]",
  outline:
    "bg-transparent text-espresso ring-1 ring-espresso/25 hover:ring-espresso/50 hover:bg-espresso/[0.03]",
  ghost: "bg-porcelain/70 text-espresso ring-1 ring-hairline hover:bg-porcelain",
};

const iconBg: Record<Variant, string> = {
  solid: "bg-cream/15 text-cream",
  outline: "bg-espresso/[0.06] text-espresso",
  ghost: "bg-espresso/[0.06] text-espresso",
};

export default function Button({
  children,
  href,
  variant = "solid",
  icon = true,
  className = "",
  type = "button",
}: ButtonProps) {
  const cls = `group inline-flex items-center gap-3 rounded-full pl-7 pr-2 py-2 text-[0.82rem] uppercase tracking-[0.16em] font-medium transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] ${variants[variant]} ${className}`;

  const inner = (
    <>
      <span className="pb-px">{children}</span>
      {icon && (
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105 ${iconBg[variant]}`}
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={cls}>
      {inner}
    </button>
  );
}
