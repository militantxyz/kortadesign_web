import { ArrowRight, MapPin } from "lucide-react";

import { KortaButton } from "@/components/korta/korta-button";
import { PageHero } from "@/components/korta/page-hero";
import { StoreLocatorMap } from "@/components/korta/store-locator-map";
import { asset } from "@/lib/korta-data";

export function StoreLocatorPage() {
  return (
    <>
      <PageHero title="Store Locator" eyebrow="Contact" copy="For distributors, showrooms and project partners." image={asset("2025/02/RoomService-CapJuluca7.jpg")} />
      <section aria-labelledby="store-locator-map-heading" className="bg-[#ebe6df] py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1600px] px-[4%]">
          <div className="mb-6 text-center">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.32em] text-[#8f6747]">Global Partners</p>
            <h2 id="store-locator-map-heading" className="font-heading text-[clamp(2rem,5vw,3.8rem)] font-normal leading-[0.95] text-[#151411]">
              Discover your closest distributor
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-[#5b554f] md:text-lg">Tap any marker to view store details, contact information, and website links.</p>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.26em] text-[#8f6747]/85">Filter by region</p>
          </div>
          <StoreLocatorMap />
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-[8%] py-[8%] text-center max-md:px-[4%]">
        <MapPin aria-hidden="true" className="mx-auto mb-6 text-[#8f6747]" size={34} />
        <h2 className="font-heading mb-6 text-[clamp(2.8rem,6vw,6.8rem)] font-normal leading-[0.88] tracking-normal text-[#151411]">Interested in becoming a distributor?</h2>
        <p className="mb-8 text-lg leading-8 text-[#5b554f]">Contact us at info@kortadesign.com</p>
        <KortaButton href="/contact">
          Contact Us
          <ArrowRight aria-hidden="true" size={17} />
        </KortaButton>
      </section>
    </>
  );
}
