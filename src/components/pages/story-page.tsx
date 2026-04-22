import { DesignerSection } from "@/components/korta/designer-section";
import { PageHero } from "@/components/korta/page-hero";
import { SectionHeading } from "@/components/korta/section-heading";
import { asset } from "@/lib/korta-data";

export function StoryPage() {
  return (
    <>
      <PageHero title="Our Story" eyebrow="KORTA Lifestyle" copy="Inspired by nature, designed for you." image={asset("2025/01/baoli231-min-scaled.jpg")} />
      <section className="grid grid-cols-[0.78fr_1fr] gap-[8%] px-[8%] py-[8%] max-lg:grid-cols-1 max-md:px-[4%]">
        <SectionHeading eyebrow="Brand" title="Welcome to KORTA" />
        <div className="text-lg leading-8 text-[#5b554f]">
          <p className="mb-4">
            KORTA creates outdoor wellness pieces for spaces where architecture, landscape and daily rituals meet. The collection is centered around natural stone, precise lines and the feeling of calm that comes from being outdoors.
          </p>
          <p>Our products are made to complement luxury properties, private gardens, resorts and hospitality environments while remaining quietly timeless.</p>
        </div>
      </section>
      <DesignerSection />
    </>
  );
}
