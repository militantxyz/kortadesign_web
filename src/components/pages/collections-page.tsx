import { PageHero } from "@/components/korta/page-hero";
import { ProductCard } from "@/components/korta/product-card";
import { ProjectsBand } from "@/components/korta/projects-band";
import { SectionHeading } from "@/components/korta/section-heading";
import { getDictionary, type Locale } from "@/lib/i18n";
import { asset, getLocalizedProduct, products } from "@/lib/korta-data";

export function CollectionsPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const zoneCopy = dict.collections.zoneCopy;

  return (
    <>
      <PageHero
        eyebrow={dict.collections.eyebrow}
        title={dict.collections.title}
        image={asset("2025/01/CAP-SPA-34-1024x819.jpg")}
        copy={dict.collections.copy}
        meta={dict.collections.meta}
      />

      <section className="grid grid-cols-[0.75fr_1fr] gap-[8%] px-[8%] py-[8%] max-lg:grid-cols-1 max-md:px-[4%]">
        <SectionHeading
          eyebrow={dict.collections.planningEyebrow}
          title={dict.collections.planningTitle}
        />
        <div className="grid content-end gap-4">
          <p className="text-lg leading-8 text-[#5b554f]">
            {dict.collections.planningCopy}
          </p>
          <div className="grid grid-cols-3 gap-px bg-[#d8cec3] max-md:grid-cols-1">
            {Object.entries(zoneCopy).map(([zone, copy]) => (
              <a className="bg-[#f8f5ef] p-5 transition hover:bg-white" href={`#${zone}`} key={zone}>
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8f6747]">{zone}</span>
                <p className="mt-3 text-sm leading-6 text-[#5b554f]">{copy}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {(["AQUA", "FUOCO", "ARIA"] as const).map((zone) => (
        <section className="border-t border-[#d8cec3] px-[8%] py-[8%] max-md:px-[4%]" id={zone} key={zone}>
          <SectionHeading
            title={`${zone} ${dict.collections.zoneLabel}`}
            copy={zoneCopy[zone]}
          />
          <div className="grid grid-cols-3 gap-7 max-xl:grid-cols-2 max-md:grid-cols-1">
            {products
              .filter((product) => product.zone === zone)
              .map((product) => (
                <ProductCard
                  key={product.slug}
                  locale={locale}
                  product={getLocalizedProduct(product, locale)}
                />
              ))}
          </div>
        </section>
      ))}

      <ProjectsBand locale={locale} />
    </>
  );
}
