import { PageHero } from "@/components/korta/page-hero";
import { asset } from "@/lib/korta-data";

export function LegalPage() {
  return (
    <>
      <PageHero title="Legal Notices" eyebrow="KORTA" image={asset("2025/01/CAP-ACC-EXT-21-scaled.jpg")} />
      <section className="mx-auto max-w-5xl px-[8%] py-[8%] max-md:px-[4%]">
        <p className="mb-4 text-lg leading-8 text-[#5b554f]">
          Legal notices, privacy policy and website terms can be maintained here in the new Next.js site. The previous WordPress legal URL was returning a not-found page, so this clean page keeps the footer route valid.
        </p>
        <p className="text-lg leading-8 text-[#5b554f]">
          For general inquiries, contact{" "}
          <a className="font-bold text-[#8f6747]" href="mailto:info@kortadesign.com">
            info@kortadesign.com
          </a>
          .
        </p>
      </section>
    </>
  );
}
