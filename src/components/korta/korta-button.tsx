import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

const baseClass =
  "inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] transition duration-200";

const variantClasses = {
  dark: "bg-[#151411] text-white hover:bg-[#3a332d]",
  light: "bg-white text-[#151411] hover:bg-[#e8dfd8]",
  outline: "border border-current bg-transparent text-current hover:bg-current hover:text-white",
  gold: "bg-[#b98a63] text-[#151411] hover:bg-[#d0a57f]",
};

type KortaButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: keyof typeof variantClasses;
} & Omit<ComponentPropsWithoutRef<"button">, "children" | "className">;

export function KortaButton({ children, className, href, variant = "dark", ...props }: KortaButtonProps) {
  const classes = cn(baseClass, variantClasses[variant], className);

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
