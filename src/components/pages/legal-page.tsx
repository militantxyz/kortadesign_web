import { PageHero } from "@/components/korta/page-hero";
import { type Locale } from "@/lib/i18n";
import { asset } from "@/lib/korta-data";

export function LegalPage({ locale }: { locale: Locale }) {
  const copy =
    locale === "hr"
      ? {
          title: "Pravne napomene",
          body1:
            "Pravne napomene, pravila privatnosti i uvjeti korištenja web stranice mogu se održavati ovdje unutar nove Next.js stranice. Prethodni WordPress pravni URL vraćao je stranicu koja ne postoji, pa ova čista stranica održava footer rutu ispravnom.",
          body2: "Za opće upite kontaktirajte",
        }
      : {
          title: "Legal Notices",
          body1:
            "Legal notices, privacy policy and website terms can be maintained here in the new Next.js site. The previous WordPress legal URL was returning a not-found page, so this clean page keeps the footer route valid.",
          body2: "For general inquiries, contact",
        };

  return (
    <>
      <PageHero title={copy.title} eyebrow="KORTA" image={asset("2025/01/CAP-ACC-EXT-21-scaled.jpg")} />
      <section className="mx-auto max-w-5xl px-[8%] py-[8%] max-md:px-[4%]">
        <p className="mb-4 text-lg leading-8 text-[#5b554f]">{copy.body1}</p>
        <p className="text-lg leading-8 text-[#5b554f]">
          {copy.body2}{" "}
          <a className="font-bold text-[#8f6747]" href="mailto:info@kortadesign.com">
            info@kortadesign.com
          </a>
          .
        </p>
      </section>
    </>
  );
}
