import { PageHero } from "@/components/korta/page-hero";
import { ProductCard } from "@/components/korta/product-card";
import { ProjectsBand } from "@/components/korta/projects-band";
import { SectionHeading } from "@/components/korta/section-heading";
import { asset, products } from "@/lib/korta-data";

export function CollectionsPage() {
  const zoneCopy = {
    AQUA: "A revitalizing retreat from everyday life, tailored around the calming advantages of water and outdoor serenity.",
    FUOCO: "A captivating zone where fire brings people together, fuels conversation and creates unforgettable moments.",
    ARIA: "An outdoor sanctuary where time slows down and carefully designed pieces support rest, reading and gathering.",
  } as const;

  return (
    <>
      <PageHero
        eyebrow="Collections"
        title="Outdoor Relaxation Zones"
        image={asset("2025/01/CAP-SPA-34-1024x819.jpg")}
        copy="Aqua, Fuoco and Aria transform outdoor spaces into havens of relaxation."
        meta={["Aqua", "Fuoco", "Aria"]}
      />

      <section className="grid grid-cols-[0.75fr_1fr] gap-[8%] px-[8%] py-[8%] max-lg:grid-cols-1 max-md:px-[4%]">
        <SectionHeading eyebrow="Elemental planning" title="Three ways to compose an outdoor sanctuary." />
        <div className="grid content-end gap-4">
          <p className="text-lg leading-8 text-[#5b554f]">
            Every outdoor space should be designed to provide tranquility, comfort and rejuvenation. With this philosophy in mind, KORTA developed Outdoor Relaxation Zones around three essential elements of life: water, fire and air.
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
          <SectionHeading title={`${zone} Zone`} copy={zoneCopy[zone]} />
          <div className="grid grid-cols-3 gap-7 max-xl:grid-cols-2 max-md:grid-cols-1">
            {products
              .filter((product) => product.zone === zone)
              .map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
          </div>
        </section>
      ))}

      <ProjectsBand />
    </>
  );
}
