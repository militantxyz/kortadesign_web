import { PageHero } from "@/components/korta/page-hero";
import { KortaButton } from "@/components/korta/korta-button";
import { Field } from "@/components/korta/quote-form";
import { getDictionary, type Locale } from "@/lib/i18n";
import { asset } from "@/lib/korta-data";

export function ContactPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const contacts = [
    [dict.contact.contactTitles[0], "Brajkovići 28b, 52000, Pazin", "+385 527 43776", "info@kortadesign.com"],
    [dict.contact.contactTitles[1], "+385 99 860 0511", "production@kortadesign.com"],
    [dict.contact.contactTitles[2], "marketing@kortadesign.com"],
    [dict.contact.contactTitles[3], "+385 99 201 7306", "jasmina@kortadesign.com"],
    [dict.contact.contactTitles[4], "+31 6 54159866", "albert@kortadesign.com"],
    [dict.contact.contactTitles[5], "goran.s@kortadesign.com"],
    [dict.contact.contactTitles[6], "+385 98 940 0705", "dino@kortadesign.com"],
    [dict.contact.contactTitles[7], "+385 91 720 0427", "+971 58 553 0620", "info@kortadesign.com"],
    [dict.contact.contactTitles[8], "+385 99 406 2017", "paolo@kortadesign.com"],
  ];

  return (
    <>
      <PageHero
        title={dict.contact.heroTitle}
        eyebrow={dict.contact.heroEyebrow}
        copy={dict.contact.heroCopy}
        image={asset("2025/01/CAP-ACC-EXT-21-scaled.jpg")}
      />
      <section className="bg-[#f8f5ef] px-[8%] py-[8%] max-md:px-[4%] max-md:pb-16 lg:grid lg:grid-cols-[0.8fr_1fr] lg:gap-[7%]">
        <div>
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#8f6747]">{dict.contact.assistanceEyebrow}</span>
          <h2 className="font-heading mb-6 text-[clamp(2.8rem,6vw,6.8rem)] font-normal leading-[0.88] tracking-normal text-[#151411]">{dict.contact.assistanceTitle}</h2>
          <p className="mb-8 text-lg leading-8 text-[#5b554f]">{dict.contact.assistanceCopy}</p>
          <form action="/api/forms" className="relative grid gap-3.5" method="post">
            <input type="hidden" name="form-type" value="contact" />
            <input
              aria-hidden="true"
              autoComplete="off"
              className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
              name="website"
              tabIndex={-1}
              type="text"
            />
            <Field label={dict.contact.fields.nameAndSurname} />
            <Field label={dict.contact.fields.email} type="email" />
            <Field label={dict.contact.fields.message} as="textarea" />
            <KortaButton className="mt-4" type="submit">
              {dict.contact.fields.send}
            </KortaButton>
          </form>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-px bg-[#d8cec3] max-md:grid-cols-1 lg:mt-0">
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
