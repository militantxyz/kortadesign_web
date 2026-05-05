import Image from "next/image";

import { PageHero } from "@/components/korta/page-hero";
import { SectionHeading } from "@/components/korta/section-heading";
import { getDictionary, type Locale } from "@/lib/i18n";
import { asset } from "@/lib/korta-data";

export function SustainabilityPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero title={dict.sustainability.heroTitle} eyebrow={dict.sustainability.heroEyebrow} copy={dict.sustainability.heroCopy} image={asset("2025/02/pexels-jakkel-418831-min-2048x1365.jpg")} />
      <section className="grid grid-cols-[0.78fr_1fr] gap-[8%] px-[8%] py-[8%] max-lg:grid-cols-1 max-md:px-[4%]">
        <SectionHeading eyebrow={dict.sustainability.responsibilityEyebrow} title={dict.sustainability.responsibilityTitle} />
        <div className="text-lg leading-8 text-[#5b554f]">
          {dict.sustainability.responsibilityParagraphs.map((paragraph) => (
            <p className="mb-4 last:mb-0" key={paragraph}>{paragraph}</p>
          ))}
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
          <SectionHeading eyebrow={dict.sustainability.stoneEyebrow} title={dict.sustainability.stoneTitle} />
          {dict.sustainability.stoneParagraphs.map((paragraph) => (
            <p className="mb-4 last:mb-0 text-lg leading-8 text-[#5b554f]" key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </>
  );
}
