import { FileText } from "lucide-react";

import { DesignerSection } from "@/components/korta/designer-section";
import { KortaButton } from "@/components/korta/korta-button";
import { PageHero } from "@/components/korta/page-hero";
import { ProductConfigurator } from "@/components/korta/product-configurator";
import { ProductCard } from "@/components/korta/product-card";
import { QuoteForm } from "@/components/korta/quote-form";
import { SectionHeading } from "@/components/korta/section-heading";
import type { Product } from "@/lib/korta-data";
import { products } from "@/lib/korta-data";

export function ProductPage({ product }: { product: Product }) {
  const pairs = products.filter((item) => ["cara", "dipinto", "ponte"].includes(item.slug) && item.slug !== product.slug);

  return (
    <>
      <PageHero eyebrow={product.zone} title={product.title} copy={product.type} image={product.heroImage} meta={[product.zone, product.type, "Made to order"]} />

      <section className="grid grid-cols-[minmax(0,0.9fr)_minmax(300px,0.65fr)] items-center gap-[8%] px-[8%] py-[8%] max-lg:grid-cols-1 max-md:px-[4%]">
        <div className="max-w-3xl">
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#8f6747]">Product profile</span>
          <h2 className="font-heading mb-8 text-[clamp(2.8rem,6vw,6.8rem)] font-normal leading-[0.88] tracking-normal text-[#151411]">{product.title}</h2>
          {product.description.map((paragraph) => (
            <p className="mb-4 text-lg leading-8 text-[#5b554f]" key={paragraph}>
              {paragraph}
            </p>
          ))}
          <div className="mt-8 grid grid-cols-3 gap-px bg-[#d8cec3] max-md:grid-cols-1">
            {["Natural stone", product.zone, "Outdoor wellness"].map((item) => (
              <div className="bg-[#f8f5ef] p-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#151411]" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="border border-[#d8cec3] bg-white p-10">
          <img className="m-auto max-h-[620px] object-contain" src={product.cardImage} alt={product.title} />
        </div>
      </section>

      <section className="grid grid-cols-4 gap-px bg-[#d8cec3] max-lg:grid-cols-2 max-md:grid-cols-1">
        {product.gallery.map((image, index) => (
          <img className={`${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""} aspect-square size-full object-cover`} src={image} alt={`${product.title} view ${index + 1}`} key={image} />
        ))}
      </section>

      <section className="bg-[#e8ece6] px-[8%] py-[8%] max-md:px-[4%]">
        <SectionHeading eyebrow="Configuration" title="Material & Finishes" copy="Choose the surface language that belongs to the project: tactile stone, refined porcelain, or metallic details with architectural restraint." />
        <div className="grid grid-cols-3 gap-px bg-[#cfd6ca] max-xl:grid-cols-2 max-md:grid-cols-1">
          {product.materials.map((group) => (
            <div className="bg-[#f8f5ef] p-7" key={group.title}>
              <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-[#8f6747]">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span className="border border-[#d8cec3] bg-white px-3 py-2 text-sm text-[#312b27]" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <ProductConfigurator product={product} />
      </section>

      <QuoteForm product={product} />

      {pairs.length ? (
        <section className="px-[8%] py-[8%] max-md:px-[4%]">
          <SectionHeading title={`Pair ${product.title} With`} />
          <div className="grid grid-cols-3 gap-7 max-xl:grid-cols-2 max-md:grid-cols-1">
            {pairs.map((pair) => (
              <ProductCard compact key={pair.slug} product={pair} />
            ))}
          </div>
        </section>
      ) : null}

      {product.docs?.length ? (
        <section className="border-t border-[#d8cec3] px-[8%] py-[8%] max-md:px-[4%]">
          <SectionHeading eyebrow="Architect resources" title="Documentation" />
          <div className="grid grid-cols-3 gap-px bg-[#d8cec3] max-xl:grid-cols-2 max-md:grid-cols-1">
            {product.docs.map((doc) => (
              <a className="flex min-h-28 items-center gap-3 bg-[#f8f5ef] p-6 text-sm font-bold uppercase tracking-[0.14em] text-[#151411] transition hover:bg-white" href={doc.href} key={doc.label} target="_blank">
                <FileText aria-hidden="true" size={22} />
                {doc.label}
              </a>
            ))}
          </div>
          <KortaButton className="mt-8" href="/catalogues" variant="outline">
            All Catalogues
          </KortaButton>
        </section>
      ) : null}

      {product.designedBy ? <DesignerSection /> : null}
    </>
  );
}
