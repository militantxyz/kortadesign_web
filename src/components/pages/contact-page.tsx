import { PageHero } from "@/components/korta/page-hero";
import { KortaButton } from "@/components/korta/korta-button";
import { Field } from "@/components/korta/quote-form";
import { asset } from "@/lib/korta-data";

export function ContactPage() {
  const contacts = [
    ["For General Inquiries", "Brajkovići 28b, 52000, Pazin", "+385 527 43776", "info@kortadesign.com"],
    ["Production Department", "+385 99 860 0511", "production@kortadesign.com"],
    ["Marketing Department", "marketing@kortadesign.com"],
    ["Sales Spain & Portugal", "+385 99 201 7306", "jasmina@kortadesign.com"],
    ["Sales Benelux", "+31 6 54159866", "albert@kortadesign.com"],
    ["Sales USA", "goran.s@kortadesign.com"],
    ["Sales UK & Greece", "+385 98 940 0705", "dino@kortadesign.com"],
    ["Sales MEA Region", "+385 91 720 0427", "+971 58 553 0620", "info@kortadesign.com"],
    ["Sales Croatia & EX-YU", "+385 99 406 2017", "paolo@kortadesign.com"],
  ];

  return (
    <>
      <PageHero title="General Contacts" eyebrow="Contact" copy="Tell us about the site, the atmosphere and the outdoor ritual you want to create." image={asset("2025/01/CAP-ACC-EXT-21-scaled.jpg")} />
      <section className="grid grid-cols-[0.8fr_1fr] gap-[7%] px-[8%] py-[8%] max-lg:grid-cols-1 max-md:px-[4%]">
        <div>
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#8f6747]">Project assistance</span>
          <h2 className="font-heading mb-6 text-[clamp(2.8rem,6vw,6.8rem)] font-normal leading-[0.88] tracking-normal text-[#151411]">Do you need assistance?</h2>
          <p className="mb-8 text-lg leading-8 text-[#5b554f]">If you need assistance or wish to request information, we invite you to fill out our contact form.</p>
          <form action="mailto:info@kortadesign.com" className="grid gap-3.5" method="post">
            <Field label="Name and Surname" />
            <Field label="Email" type="email" />
            <Field label="Message" as="textarea" />
            <KortaButton className="mt-4" type="submit">
              Send
            </KortaButton>
          </form>
        </div>
        <div className="grid grid-cols-2 gap-px bg-[#d8cec3] max-md:grid-cols-1">
          {contacts.map(([title, ...lines]) => (
            <article className="bg-[#f8f5ef] p-6" key={title}>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#8f6747]">{title}</h3>
              {lines.map((line) => (
                <p className="leading-7 text-[#5b554f]" key={line}>
                  {line}
                </p>
              ))}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
