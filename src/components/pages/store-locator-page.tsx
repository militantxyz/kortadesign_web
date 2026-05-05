import { ArrowRight, MapPin } from "lucide-react";

import { KortaButton } from "@/components/korta/korta-button";
import { PageHero } from "@/components/korta/page-hero";
import { StoreLocatorMap } from "@/components/korta/store-locator-map";
import { getDictionary, localizePath, type Locale } from "@/lib/i18n";
import { asset } from "@/lib/korta-data";

export function StoreLocatorPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero title={dict.storeLocator.heroTitle} eyebrow={dict.storeLocator.heroEyebrow} copy={dict.storeLocator.heroCopy} image={asset("2025/02/RoomService-CapJuluca7.jpg")} />
      <section aria-labelledby="store-locator-map-heading" className="bg-[#ebe6df] py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1600px] px-[4%]">
          <div className="mb-6 text-center">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.32em] text-[#8f6747]">{dict.storeLocator.partnersEyebrow}</p>
            <h2 id="store-locator-map-heading" className="font-heading text-[clamp(2rem,5vw,3.8rem)] font-normal leading-[0.95] text-[#151411]">
              {dict.storeLocator.partnersTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-[#5b554f] md:text-lg">{dict.storeLocator.partnersCopy}</p>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.26em] text-[#8f6747]/85">{dict.storeLocator.filterByRegion}</p>
          </div>
          <StoreLocatorMap locale={locale} />
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-[8%] py-[8%] text-center max-md:px-[4%]">
        <MapPin aria-hidden="true" className="mx-auto mb-6 text-[#8f6747]" size={34} />
        <h2 className="font-heading mb-6 text-[clamp(2.8rem,6vw,6.8rem)] font-normal leading-[0.88] tracking-normal text-[#151411]">{dict.storeLocator.distributorTitle}</h2>
        <p className="mb-8 text-lg leading-8 text-[#5b554f]">{dict.storeLocator.distributorCopy}</p>
        <KortaButton href={localizePath(locale, "/contact")}>
          {dict.storeLocator.contactUs}
          <ArrowRight aria-hidden="true" size={17} />
        </KortaButton>
      </section>
    </>
  );
}
