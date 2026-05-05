import { PageHero } from "@/components/korta/page-hero";
import { KortaButton } from "@/components/korta/korta-button";
import { Field } from "@/components/korta/quote-form";
import { getDictionary, type Locale } from "@/lib/i18n";
import { asset } from "@/lib/korta-data";

export function JoinPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const copy = locale === "hr"
    ? {
        heroTitle: "Pridružite se KORTA obitelji",
        heroEyebrow: "Karijere",
        heroCopy: "Rad u kojem se susreću izrada, dizajn i hospitality pristup za ljude kojima su detalji važni.",
        title: "Pridružite se KORTA obitelji",
        paragraphs: [
          "Ako dijelite našu težnju prema izvrsnosti i strast prema stvaranju jedinstvenih rješenja, pozivamo vas da nam se pridružite.",
          "U KORTI ne preuzimate samo posao - postajete dio nasljeđa.",
          "Veselimo se što ćemo vas poželjeti dobrodošlim u naš tim.",
        ],
        department: "Odjel",
        departments: ["Marketing", "Proizvodnja", "Prodaja", "Ostalo"],
        send: "Pošalji",
      }
    : {
        heroTitle: "Join the KORTA Family",
        heroEyebrow: "Careers",
        heroCopy: "Craft, design and hospitality-minded work for people who care about details.",
        title: "Join the KORTA family",
        paragraphs: [
          "If you share our drive for excellence and our passion for creating one-of-a-kind solutions, we invite you to join us.",
          "At KORTA, you are not just taking on a job - you are becoming part of a legacy.",
          "We look forward to welcoming you to our team.",
        ],
        department: "Department",
        departments: ["Marketing", "Production", "Sales", "Other"],
        send: "Send",
      };

  return (
    <>
      <PageHero title={copy.heroTitle} eyebrow={copy.heroEyebrow} copy={copy.heroCopy} image={asset("2025/01/DSC9012-scaled.jpg")} />
      <section className="grid grid-cols-[0.8fr_1fr] gap-[7%] px-[8%] py-[8%] max-lg:grid-cols-1 max-md:px-[4%]">
        <div>
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#8f6747]">{copy.heroEyebrow}</span>
          <h2 className="font-heading mb-6 text-[clamp(2.8rem,6vw,6.8rem)] font-normal leading-[0.88] tracking-normal text-[#151411]">{copy.title}</h2>
          {copy.paragraphs.map((paragraph) => (
            <p className="mb-4 last:mb-0 text-lg leading-8 text-[#5b554f]" key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <form action="/api/forms" className="relative grid gap-3.5" method="post">
          <input type="hidden" name="form-type" value="join" />
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
          <select aria-label={copy.department} className="min-h-12 w-full border-b border-[#151411]/35 bg-transparent px-0 py-3 text-[#151411] outline-none focus:border-[#8f6747]" defaultValue="" name="department">
            <option value="" disabled>
              {copy.department}
            </option>
            {copy.departments.map((department) => (
              <option key={department}>{department}</option>
            ))}
          </select>
          <Field label={dict.contact.fields.message} as="textarea" />
          <KortaButton className="mt-4" type="submit">
            {copy.send}
          </KortaButton>
        </form>
      </section>
    </>
  );
}
