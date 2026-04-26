import Image from "next/image";

import { PageHero } from "@/components/korta/page-hero";
import { SectionHeading } from "@/components/korta/section-heading";
import { asset } from "@/lib/korta-data";

export function SustainabilityPage() {
  return (
    <>
      <PageHero title="Sustainability" eyebrow="KORTA Lifestyle" copy="Luxury through materials that last, age and belong to place." image={asset("2025/02/pexels-jakkel-418831-min-2048x1365.jpg")} />
      <section className="grid grid-cols-[0.78fr_1fr] gap-[8%] px-[8%] py-[8%] max-lg:grid-cols-1 max-md:px-[4%]">
        <SectionHeading eyebrow="Responsibility" title="Sustainability" />
        <div className="text-lg leading-8 text-[#5b554f]">
          <p className="mb-4">At KORTA, we believe that true luxury is not only about exquisite design and exceptional quality but also about being mindful of our planet. Our commitment to sustainability is integrated into every aspect of our work.</p>
          <p className="mb-4">Each KORTA product presents the perfect balance of elegance and sustainability. Our natural stone is sourced locally, reducing carbon footprints while ensuring durability and timeless aesthetics.</p>
          <p>From KORTA&apos;s outdoor showers, like MINIMO and MARBELLA, to the stonework used in our designs, we create luxury products with an eco-conscious mindset.</p>
        </div>
      </section>
      <section className="grid grid-cols-[1fr_0.9fr] bg-[#e8ece6] max-lg:grid-cols-1">
        <div className="relative min-h-[620px] max-lg:min-h-[420px]">
          <Image
            alt="Natural stone outdoor environment"
            className="object-cover"
            fill
            sizes="(max-width: 1024px) 100vw, 54vw"
            src={asset("2025/01/DSC9674-min-1536x1025.jpg")}
          />
        </div>
        <div className="self-center px-[10%] py-[10%] max-md:px-[4%]">
          <SectionHeading eyebrow="Natural stone" title="Made to endure." />
          <p className="mb-4 text-lg leading-8 text-[#5b554f]">Drawing inspiration from the materials that surround us and guided by the wisdom of our ancestors in stone craftsmanship, we embarked on our journey with Istrian stone at its heart.</p>
          <p className="text-lg leading-8 text-[#5b554f]">Natural stone has excellent technical and mechanical properties in terms of absorption, freezing and wear. It is incredibly durable and available in polished, sandblasted, burnt or rigato finishes.</p>
        </div>
      </section>
    </>
  );
}
