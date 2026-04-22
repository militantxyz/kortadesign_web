import { Mail, Phone } from "lucide-react";

import { socials } from "@/lib/korta-data";

export function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-40 grid gap-2 max-md:bottom-3.5 max-md:right-3.5" aria-label="Quick contact links">
      <a className="flex size-11 items-center justify-center border border-white/25 bg-[#151411]/85 text-xs font-bold text-white shadow-[0_14px_35px_rgba(21,20,17,0.25)] backdrop-blur transition hover:bg-[#b98a63] hover:text-[#151411]" href="mailto:info@kortadesign.com" aria-label="Email KORTA">
        <Mail aria-hidden="true" size={18} />
      </a>
      <a className="flex size-11 items-center justify-center border border-white/25 bg-[#151411]/85 text-xs font-bold text-white shadow-[0_14px_35px_rgba(21,20,17,0.25)] backdrop-blur transition hover:bg-[#b98a63] hover:text-[#151411]" href="tel:+38552743776" aria-label="Call KORTA">
        <Phone aria-hidden="true" size={18} />
      </a>
      {socials.slice(1, 2).map((social) => (
        <a className="flex size-11 items-center justify-center border border-white/25 bg-[#151411]/85 text-xs font-bold text-white shadow-[0_14px_35px_rgba(21,20,17,0.25)] backdrop-blur transition hover:bg-[#b98a63] hover:text-[#151411]" href={social.href} key={social.label} aria-label={social.label} target="_blank" rel="noreferrer">
          IG
        </a>
      ))}
    </div>
  );
}
