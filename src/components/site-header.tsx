"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { nav, productMap } from "@/lib/korta-data";

function itemLabel(slug: string) {
  if (slug === "our-story") return "Our Story";
  const product = productMap.get(slug);
  if (product) return product.title;
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function itemHref(slug: string) {
  if (slug === "our-story") return "/our-story";
  if (slug === "blog") return "/blog";
  if (slug === "contact") return "/contact";
  return `/${slug}`;
}

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileEntry, setOpenMobileEntry] = useState<string | null>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileEntry(null);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[86px] items-center justify-between border-b border-white/15 bg-[#151411]/35 px-[8%] text-white backdrop-blur-md transition-colors duration-200 hover:bg-[#151411]/85 max-md:px-[4%]">
      <Link
        aria-label="KORTA home"
        className="font-heading text-[2.35rem] font-light uppercase leading-none tracking-[0.22em] text-[#94582C]"
        href="/"
        onClick={closeMenus}
      >
        KORTA
      </Link>

      <nav
        aria-label="Primary navigation"
        className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-[0.16em] lg:flex"
      >
        <Link className="py-8 text-white/85 transition hover:text-white" href="/">
          Home
        </Link>
        {nav.map((entry) => (
          <div className="group relative" key={entry.label}>
            <Link
              className="block py-8 text-white/85 transition hover:text-white"
              href={entry.href}
            >
              {entry.label}
            </Link>
            <div className="pointer-events-none absolute left-1/2 top-full grid min-w-[290px] -translate-x-1/2 translate-y-2.5 gap-5 border border-[#d8cec3] bg-[#f8f5ef] p-6 text-[#151411] opacity-0 shadow-[0_24px_70px_rgba(21,20,17,0.18)] transition duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {entry.groups.map((group) => (
                <div key={group.label}>
                  <Link
                    className="mb-3 block text-[11px] font-bold uppercase tracking-[0.24em] text-[#8f6747]"
                    href={group.href}
                    onClick={closeMenus}
                  >
                    {group.label}
                  </Link>
                  <div className="grid gap-2 text-sm font-medium normal-case tracking-normal">
                    {group.items.map((item) => (
                      <Link
                        className="text-[#151411]/75 transition hover:text-[#151411]"
                        href={itemHref(item)}
                        key={item}
                        onClick={closeMenus}
                      >
                        {itemLabel(item)}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <Link className="py-8 text-white/85 transition hover:text-white" href="/blog">
          Blog
        </Link>
      </nav>

      <button
        aria-expanded={isMobileMenuOpen}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        className="lg:hidden"
        onClick={() => setIsMobileMenuOpen((current) => !current)}
        type="button"
      >
        {isMobileMenuOpen ? (
          <X aria-hidden="true" size={30} strokeWidth={1.6} />
        ) : (
          <Menu aria-hidden="true" size={30} strokeWidth={1.6} />
        )}
      </button>

      {isMobileMenuOpen ? (
        <>
          <button
            aria-label="Close mobile menu overlay"
            className="fixed inset-0 top-[86px] z-40 bg-[#151411]/25 lg:hidden"
            onClick={closeMenus}
            type="button"
          />
          <div className="fixed inset-x-0 top-[86px] z-50 max-h-[calc(100dvh-86px)] overflow-y-auto overscroll-contain bg-[#f8f5ef] px-[8%] pb-9 pt-6 text-[#151411] shadow-[0_24px_70px_rgba(21,20,17,0.18)] max-md:px-[4%] lg:hidden">
            <Link
              className="font-heading block py-2.5 text-4xl font-normal"
              href="/"
              onClick={closeMenus}
            >
              Home
            </Link>
            {nav.map((entry) => {
              const isOpen = openMobileEntry === entry.label;

              return (
                <div className="border-b border-[#d8cec3]" key={entry.label}>
                  <button
                    aria-expanded={isOpen}
                    className="font-heading flex w-full items-center justify-between py-2.5 text-left text-4xl font-normal"
                    onClick={() =>
                      setOpenMobileEntry((current) =>
                        current === entry.label ? null : entry.label
                      )
                    }
                    type="button"
                  >
                    <span>{entry.label}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`mt-1 size-7 shrink-0 transition ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={1.8}
                    />
                  </button>
                  {isOpen ? (
                    <div className="grid gap-1.5 pb-3 pl-5">
                      {entry.groups.map((group) => (
                        <div className="grid gap-1.5" key={group.label}>
                          <Link
                            className="block py-1 text-xs font-bold uppercase tracking-[0.24em] text-[#8f6747]"
                            href={group.href}
                            onClick={closeMenus}
                          >
                            {group.label}
                          </Link>
                          {group.items.map((item) => (
                            <Link
                              className="block py-1 text-base text-[#151411]/75"
                              href={itemHref(item)}
                              key={item}
                              onClick={closeMenus}
                            >
                              {itemLabel(item)}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
            <Link
              className="font-heading block py-2.5 text-4xl font-normal"
              href="/blog"
              onClick={closeMenus}
            >
              Blog
            </Link>
          </div>
        </>
      ) : null}
    </header>
  );
}
