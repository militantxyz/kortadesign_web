import { getDictionary, type Locale } from "@/lib/i18n";
import { getLocalizedDesignerCopy } from "@/lib/korta-data";

export function DesignerSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const designerCopy = getLocalizedDesignerCopy(locale);

  return (
    <section className="grid grid-cols-[0.7fr_1fr] gap-[8%] bg-[#151411] px-[8%] py-[8%] text-white max-md:grid-cols-1 max-md:px-[4%]">
      <div>
        <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#d6b08b]">{dict.designer.eyebrow}</span>
        <h2 className="font-heading text-[clamp(2.8rem,6vw,6.8rem)] font-normal leading-[0.88] tracking-normal">{dict.designer.title}</h2>
      </div>
      <div>
        {designerCopy.map((paragraph) => (
          <p className="mb-4 text-lg leading-8 text-white/70" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
