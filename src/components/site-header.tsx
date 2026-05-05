"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { getDictionary, localizePath, switchLocalePath, type Locale } from "@/lib/i18n";
import { nav, productMap } from "@/lib/korta-data";

function itemLabel(slug: string, locale: Locale) {
  const dict = getDictionary(locale);
  if (dict.nav.slugLabels[slug]) return dict.nav.slugLabels[slug];
  const product = productMap.get(slug);
  if (product) return product.title;
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function itemHref(slug: string, locale: Locale) {
  if (slug === "our-story") return localizePath(locale, "/our-story");
  if (slug === "blog") return localizePath(locale, "/blog");
  if (slug === "contact") return localizePath(locale, "/contact");
  return localizePath(locale, `/${slug}`);
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
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

  const switchHref = switchLocalePath(pathname ?? localizePath(locale, "/"), locale === "en" ? "hr" : "en");

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[86px] items-center justify-between border-b border-white/15 bg-[#151411]/35 px-[8%] text-white backdrop-blur-md transition-colors duration-200 hover:bg-[#151411]/85 max-md:px-[4%]">
      <Link
        aria-label={dict.header.ariaHome}
        className="font-heading text-[2.35rem] font-light uppercase leading-none tracking-[0.22em] text-[#94582C]"
        href={localizePath(locale, "/")}
        onClick={closeMenus}
      >
        KORTA
      </Link>

      <nav
        aria-label={dict.header.primaryNav}
        className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-[0.16em] lg:flex"
      >
        <Link className="py-8 text-white/85 transition hover:text-white" href={localizePath(locale, "/")}>
          {dict.header.home}
        </Link>
        {nav.map((entry) => (
          <div className="group relative" key={entry.label}>
            <Link
              className="block py-8 text-white/85 transition hover:text-white"
              href={localizePath(locale, entry.href)}
            >
              {entry.label === "Collections"
                ? dict.nav.collections
                : entry.label === "KORTA Lifestyle"
                  ? dict.nav.lifestyle
                  : dict.nav.contact}
            </Link>
            <div className="pointer-events-none absolute left-1/2 top-full grid min-w-[290px] -translate-x-1/2 translate-y-2.5 gap-5 border border-[#d8cec3] bg-[#f8f5ef] p-6 text-[#151411] opacity-0 shadow-[0_24px_70px_rgba(21,20,17,0.18)] transition duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {entry.groups.map((group) => (
                <div key={group.label}>
                  <Link
                    className="mb-3 block text-[11px] font-bold uppercase tracking-[0.24em] text-[#8f6747]"
                    href={localizePath(locale, group.href)}
                    onClick={closeMenus}
                  >
                    {group.label === "Stories"
                      ? dict.nav.stories
                      : group.label === "Help"
                        ? dict.nav.help
                        : group.label}
                  </Link>
                  <div className="grid gap-2 text-sm font-medium normal-case tracking-normal">
                    {group.items.map((item) => (
                      <Link
                        className="text-[#151411]/75 transition hover:text-[#151411]"
                        href={itemHref(item, locale)}
                        key={item}
                        onClick={closeMenus}
                      >
                        {itemLabel(item, locale)}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <Link className="py-8 text-white/85 transition hover:text-white" href={localizePath(locale, "/blog")}>
          {dict.header.blog}
        </Link>
        <Link
          aria-label={locale === "en" ? dict.header.switchToCroatian : dict.header.switchToEnglish}
          className="rounded-full border border-white/25 px-3 py-1.5 text-[11px] tracking-[0.2em] text-white/88 transition hover:border-white hover:text-white"
          href={switchHref}
        >
          {locale === "en" ? "HR" : "EN"}
        </Link>
      </nav>

      <button
        aria-expanded={isMobileMenuOpen}
        aria-label={isMobileMenuOpen ? dict.header.closeMenu : dict.header.openMenu}
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
            aria-label={dict.header.closeOverlay}
            className="fixed inset-0 top-[86px] z-40 bg-[#151411]/25 lg:hidden"
            onClick={closeMenus}
            type="button"
          />
          <div className="fixed inset-x-0 top-[86px] z-50 max-h-[calc(100dvh-86px)] overflow-y-auto overscroll-contain bg-[#f8f5ef] px-[8%] pb-9 pt-6 text-[#151411] shadow-[0_24px_70px_rgba(21,20,17,0.18)] max-md:px-[4%] lg:hidden">
            <Link
              className="font-heading block py-2.5 text-4xl font-normal"
              href={localizePath(locale, "/")}
              onClick={closeMenus}
            >
              {dict.header.home}
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
                    <span>
                      {entry.label === "Collections"
                        ? dict.nav.collections
                        : entry.label === "KORTA Lifestyle"
                          ? dict.nav.lifestyle
                          : dict.nav.contact}
                    </span>
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
                            href={localizePath(locale, group.href)}
                            onClick={closeMenus}
                          >
                            {group.label === "Stories"
                              ? dict.nav.stories
                              : group.label === "Help"
                                ? dict.nav.help
                                : group.label}
                          </Link>
                          {group.items.map((item) => (
                            <Link
                              className="block py-1 text-base text-[#151411]/75"
                              href={itemHref(item, locale)}
                              key={item}
                              onClick={closeMenus}
                            >
                              {itemLabel(item, locale)}
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
              href={localizePath(locale, "/blog")}
              onClick={closeMenus}
            >
              {dict.header.blog}
            </Link>
            <Link
              className="mt-4 inline-flex min-h-12 items-center justify-center border border-[#151411]/20 px-5 text-xs font-bold uppercase tracking-[0.16em] text-[#151411]"
              href={switchHref}
              onClick={closeMenus}
            >
              {locale === "en" ? "Hrvatski" : "English"}
            </Link>
          </div>
        </>
      ) : null}
    </header>
  );
}
