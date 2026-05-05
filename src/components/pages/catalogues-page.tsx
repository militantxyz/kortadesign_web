import { FileText } from "lucide-react";

import { PageHero } from "@/components/korta/page-hero";
import { SectionHeading } from "@/components/korta/section-heading";
import { getDictionary, type Locale } from "@/lib/i18n";
import { asset } from "@/lib/korta-data";

export function CataloguesPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const docs: Array<{
    label: string;
    description: string;
    href: string;
    download?: boolean;
  }> = [
    {
      ...dict.catalogues.docs[0],
      href: asset("2025/01/KORTA-CATALOGUE.pdf"),
    },
    {
      ...dict.catalogues.docs[1],
      href: asset("2026/05/KORTA_2026_MATERIALS.pdf"),
      download: true,
    },
    {
      ...dict.catalogues.docs[2],
      href: asset("2025/11/SPEC.-SHEET-ODINO-REV3.pdf"),
    },
    {
      ...dict.catalogues.docs[3],
      href: asset("2025/11/SPEC.-SHEET-MARBELLA-REV3.pdf"),
    },
    {
      ...dict.catalogues.docs[4],
      href: asset("2025/11/SPEC.-SHEET-MINIMO-REV3.pdf"),
    },
    {
      ...dict.catalogues.docs[5],
      href: asset("2025/02/KORTA_Gardenzio-Product-specification_ENGV3.pdf"),
    },
  ];

  return (
    <>
      <PageHero
        title={dict.catalogues.heroTitle}
        eyebrow={dict.catalogues.heroEyebrow}
        copy={dict.catalogues.heroCopy}
        image={asset("2025/01/CAP-SPA-20-scaled-e1737646269147.jpg")}
      />
      <section className="px-[8%] py-[8%] max-md:px-[4%]">
        <SectionHeading
          eyebrow={dict.catalogues.resourcesEyebrow}
          title={dict.catalogues.resourcesTitle}
          copy={dict.catalogues.resourcesCopy}
        />
        <div className="grid grid-cols-3 gap-px bg-[#d8cec3] max-xl:grid-cols-2 max-md:grid-cols-1">
          {docs.map((doc) => (
            <a
              className="flex min-h-36 flex-col items-start gap-4 bg-[#f8f5ef] p-6 text-[#151411] transition hover:bg-white"
              download={doc.download}
              href={doc.href}
              key={doc.label}
              rel={doc.download ? undefined : "noreferrer"}
              target={doc.download ? undefined : "_blank"}
            >
              <FileText aria-hidden="true" size={22} />
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em]">
                  {doc.label}
                </p>
                <p className="mt-2 max-w-sm text-sm leading-6 text-[#5b554f]">
                  {doc.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
