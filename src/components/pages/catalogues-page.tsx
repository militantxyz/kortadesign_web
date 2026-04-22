import { FileText } from "lucide-react";

import { PageHero } from "@/components/korta/page-hero";
import { SectionHeading } from "@/components/korta/section-heading";
import { asset } from "@/lib/korta-data";

export function CataloguesPage() {
  const docs = [
    { label: "KORTA Catalogue", href: asset("2025/01/KORTA-CATALOGUE.pdf") },
    { label: "ODINO Spec Sheet", href: asset("2025/11/SPEC.-SHEET-ODINO-REV3.pdf") },
    { label: "MARBELLA Spec Sheet", href: asset("2025/11/SPEC.-SHEET-MARBELLA-REV3.pdf") },
    { label: "MINIMO Spec Sheet", href: asset("2025/11/SPEC.-SHEET-MINIMO-REV3.pdf") },
    { label: "GARDENZIO Product Specification", href: asset("2025/02/KORTA_Gardenzio-Product-specification_ENGV3.pdf") },
  ];

  return (
    <>
      <PageHero title="Catalogues" eyebrow="Downloads" copy="Product documentation for owners, architects and project partners." image={asset("2025/01/CAP-SPA-20-scaled-e1737646269147.jpg")} />
      <section className="px-[8%] py-[8%] max-md:px-[4%]">
        <SectionHeading eyebrow="Resources" title="Documentation" copy="Download the current KORTA catalogue and product specification sheets." />
        <div className="grid grid-cols-3 gap-px bg-[#d8cec3] max-xl:grid-cols-2 max-md:grid-cols-1">
          {docs.map((doc) => (
            <a className="flex min-h-28 items-center gap-3 bg-[#f8f5ef] p-6 text-sm font-bold uppercase tracking-[0.14em] text-[#151411] transition hover:bg-white" href={doc.href} key={doc.label} target="_blank">
              <FileText aria-hidden="true" size={22} />
              {doc.label}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
