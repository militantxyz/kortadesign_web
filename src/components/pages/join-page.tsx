import { PageHero } from "@/components/korta/page-hero";
import { KortaButton } from "@/components/korta/korta-button";
import { Field } from "@/components/korta/quote-form";
import { asset } from "@/lib/korta-data";

export function JoinPage() {
  return (
    <>
      <PageHero title="Join the KORTA Family" eyebrow="Careers" copy="Craft, design and hospitality-minded work for people who care about details." image={asset("2025/01/DSC9012-scaled.jpg")} />
      <section className="grid grid-cols-[0.8fr_1fr] gap-[7%] px-[8%] py-[8%] max-lg:grid-cols-1 max-md:px-[4%]">
        <div>
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#8f6747]">Careers</span>
          <h2 className="font-heading mb-6 text-[clamp(2.8rem,6vw,6.8rem)] font-normal leading-[0.88] tracking-normal text-[#151411]">Join the KORTA family</h2>
          <p className="mb-4 text-lg leading-8 text-[#5b554f]">If you share our drive for excellence and our passion for creating one-of-a-kind solutions, we invite you to join us.</p>
          <p className="mb-4 text-lg leading-8 text-[#5b554f]">At KORTA, you are not just taking on a job - you are becoming part of a legacy.</p>
          <p className="text-lg leading-8 text-[#5b554f]">We look forward to welcoming you to our team.</p>
        </div>
        <form action="mailto:info@kortadesign.com" className="grid gap-3.5" method="post">
          <Field label="Name and Surname" />
          <Field label="Email" type="email" />
          <select aria-label="Department" className="min-h-12 w-full border-b border-[#151411]/35 bg-transparent px-0 py-3 text-[#151411] outline-none focus:border-[#8f6747]" defaultValue="" name="department">
            <option value="" disabled>
              Department
            </option>
            <option>Marketing</option>
            <option>Production</option>
            <option>Sales</option>
            <option>Other</option>
          </select>
          <Field label="Message" as="textarea" />
          <KortaButton className="mt-4" type="submit">
            Send
          </KortaButton>
        </form>
      </section>
    </>
  );
}
