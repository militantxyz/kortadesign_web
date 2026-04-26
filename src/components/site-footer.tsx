import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { asset, socials } from "@/lib/korta-data";

const footerGroups = [
  {
    title: "Collections",
    links: [
      { label: "See All", href: "/collections" },
      { label: "AQUA", href: "/collections#AQUA" },
      { label: "FUOCO", href: "/collections#FUOCO" },
      { label: "ARIA", href: "/collections#ARIA" },
    ],
  },
  {
    title: "KORTA Lifestyle",
    links: [
      { label: "Our Story", href: "/our-story" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Projects", href: "/projects" },
      { label: "Join KORTA Family", href: "/join" },
    ],
  },
  {
    title: "Do You Need Help?",
    links: [
      { label: "Store Locator", href: "/store-locator" },
      { label: "General Contacts", href: "/contact" },
      { label: "Catalogues", href: "/catalogues" },
      { label: "Legal Notices", href: "/legal" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#151411] text-white">
      <section className="grid min-h-80 grid-cols-[1fr_auto] items-end gap-8 border-y border-white/12 px-[8%] py-[7%] max-md:grid-cols-1 max-md:px-[4%] max-md:pt-14">
        <div>
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#d6b08b]">Visit the atelier</span>
          <p className="font-heading max-w-5xl text-[clamp(3rem,7vw,8rem)] font-normal leading-[0.84] tracking-normal">Discover your closest distributor.</p>
        </div>
        <Link className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#151411] transition hover:bg-[#d6b08b]" href="/contact">
          Contact Us
          <ArrowUpRight aria-hidden="true" size={18} />
        </Link>
      </section>

      <div className="grid grid-cols-[1.15fr_repeat(4,1fr)] gap-9 px-[8%] py-[6%] max-xl:grid-cols-2 max-md:grid-cols-1 max-md:px-[4%]">
        <div>
          <Link href="/" className="font-heading text-5xl font-light uppercase leading-none tracking-[0.2em] text-[#94582C]">
            KORTA
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">Handmade outdoor wellness objects in natural stone, designed for villas, resorts and architectural gardens.</p>
          <div className="mt-7 flex flex-wrap gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">
            {socials.map((social) => (
              <a className="transition hover:text-[#d6b08b]" href={social.href} key={social.label} rel="noreferrer" target="_blank">
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {footerGroups.map((group) => (
          <nav className="grid content-start gap-2.5" key={group.title} aria-label={group.title}>
            <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#d6b08b]">{group.title}</h3>
            {group.links.map((link) => (
              <Link className="text-sm leading-7 text-white/65 transition hover:text-white" href={link.href} key={link.label}>
                {link.label}
              </Link>
            ))}
          </nav>
        ))}

        <form action="/api/forms" className="relative grid content-start gap-3.5" method="post">
          <input type="hidden" name="form-type" value="newsletter" />
          <input
            aria-hidden="true"
            autoComplete="off"
            className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
            name="website"
            tabIndex={-1}
            type="text"
          />
          <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#d6b08b]">Newsletter</h3>
          <input className="min-h-12 border-b border-white/30 bg-transparent px-0 py-3 text-white outline-none placeholder:text-white/45 focus:border-[#d6b08b]" aria-label="Name and Surname" name="name" placeholder="Name and Surname" />
          <input className="min-h-12 border-b border-white/30 bg-transparent px-0 py-3 text-white outline-none placeholder:text-white/45 focus:border-[#d6b08b]" aria-label="Email" name="email" placeholder="Email" type="email" />
          <button className="mt-2 min-h-12 bg-[#d6b08b] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#151411] transition hover:bg-white" type="submit">
            Apply
          </button>
        </form>
      </div>

      <Link className="block border-t border-white/12 bg-[#f8f5ef] px-[8%] py-6 max-md:px-[4%]" href="/eu">
        <Image
          alt="European Union co-financing"
          className="mx-auto h-auto max-h-20 w-auto object-contain"
          height={271}
          sizes="(max-width: 768px) 96vw, 1024px"
          src={asset("2025/01/HR-Sufinancira-EUROPSKA-UNIJA_POS_POS-1024x271-1.png")}
          width={1024}
        />
      </Link>
    </footer>
  );
}
