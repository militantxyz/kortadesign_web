import { ArrowRight, MapPin } from "lucide-react";

import { KortaButton } from "@/components/korta/korta-button";
import { PageHero } from "@/components/korta/page-hero";
import { asset } from "@/lib/korta-data";

export function StoreLocatorPage() {
  return (
    <>
      <PageHero title="Store Locator" eyebrow="Contact" copy="For distributors, showrooms and project partners." image={asset("2025/02/RoomService-CapJuluca7.jpg")} />
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
