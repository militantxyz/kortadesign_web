import { FileText } from "lucide-react";

import { DesignerSection } from "@/components/korta/designer-section";
import { KortaButton } from "@/components/korta/korta-button";
import { PageHero } from "@/components/korta/page-hero";
import { ProductConfigurator } from "@/components/korta/product-configurator";
import { ProductCard } from "@/components/korta/product-card";
import { QuoteForm } from "@/components/korta/quote-form";
import { SectionHeading } from "@/components/korta/section-heading";
import type { Product } from "@/lib/korta-data";
import { getFinishSwatch, products } from "@/lib/korta-data";

export function ProductPage({ product }: { product: Product }) {
  const pairs = products.filter((item) => ["cara", "dipinto", "ponte"].includes(item.slug) && item.slug !== product.slug);
  const showGallery = product.gallery.length > 0;
  const showMaterials = product.materials.length > 0 && !["gardenzio", "kada"].includes(product.slug);

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

      {showGallery ? (
        <section className="grid grid-cols-4 gap-px bg-[#d8cec3] max-lg:grid-cols-2 max-md:grid-cols-1">
          {product.gallery.map((image, index) => (
            <img className={`${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""} aspect-square size-full object-cover`} src={image} alt={`${product.title} view ${index + 1}`} key={image} />
          ))}
        </section>
      ) : null}

      {showMaterials ? (
        <section className="bg-[#e8ece6] px-[8%] py-[8%] max-md:px-[4%]">
        <div className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <div className="max-w-4xl">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#8f6747]">Configuration</span>
            <h2 className="font-heading text-[clamp(2.6rem,6vw,6.4rem)] font-normal leading-[0.88] tracking-normal text-[#151411]">Material & Finishes</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#5b554f] md:text-lg">
              Choose the surface language that belongs to the project: tactile stone, refined porcelain, or metallic details with architectural restraint.
            </p>
          </div>
          {product.configurator ? (
            <div className="lg:justify-self-end">
              <ProductConfigurator
                buttonClassName="mt-0 w-auto border-[#8f6747] bg-[#f8f5ef] px-7 text-[11px] tracking-[0.2em] text-[#8f6747] shadow-[0_10px_28px_rgba(143,103,71,0.18)] hover:bg-[#8f6747] hover:text-white hover:shadow-[0_14px_32px_rgba(143,103,71,0.28)]"
                product={product}
              />
            </div>
          ) : null}
        </div>
        <div className="grid grid-cols-3 gap-px bg-[#cfd6ca] max-xl:grid-cols-2 max-md:grid-cols-1">
          {product.materials.map((group) => (
            <div className="bg-[#f8f5ef] p-7" key={group.title}>
              <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-[#8f6747]">{group.title}</h3>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {group.items.map((item) => {
                  const swatch = getFinishSwatch(item);

                  return (
                    <figure className="group" key={item}>
                      <div className="relative aspect-[5/2] overflow-hidden border border-[#d8cec3] bg-white">
                        {swatch ? (
                          <img
                            alt={item}
                            className="size-full object-cover transition duration-300 group-hover:scale-[1.04]"
                            src={swatch}
                          />
                        ) : (
                          <div className="grid h-full place-items-center bg-[#f2ede8] px-2 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6f6962]">
                            {item}
                          </div>
                        )}
                      </div>
                      <figcaption className="mt-1.5 truncate text-[12px] text-[#5b554f]">
                        {item}
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        </section>
      ) : null}

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
