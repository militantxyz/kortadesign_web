import { getDictionary, type Locale } from "@/lib/i18n";
import type { Product } from "@/lib/korta-data";
import { SpamProtection } from "@/components/korta/spam-protection";

function fieldName(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function Field({
  label,
  type = "text",
  as = "input",
  tone = "dark",
  options,
  required = false,
}: {
  label: string;
  type?: string;
  as?: "input" | "textarea" | "select";
  tone?: "dark" | "light";
  options?: string[];
  required?: boolean;
}) {
  const name = fieldName(label);
  const controlClass =
    tone === "light"
      ? "min-h-12 w-full border-b border-white/35 bg-transparent px-0 py-3 text-white outline-none placeholder:text-white/55 focus:border-[#d6b08b]"
      : "min-h-12 w-full border-b border-[#151411]/35 bg-transparent px-0 py-3 text-[#151411] outline-none placeholder:text-[#151411]/55 focus:border-[#8f6747]";

  if (as === "select") {
    const values = options ?? [];

    return (
      <select aria-label={label} className={controlClass} defaultValue="" name={name} required={required}>
        <option value="" disabled>
          {label}
        </option>
        {values.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    );
  }

  if (as === "textarea") {
    return <textarea aria-label={label} className={controlClass} name={name} placeholder={label} required={required} rows={5} />;
  }

  return <input aria-label={label} className={controlClass} name={name} placeholder={label} required={required} type={type} />;
}

export function QuoteForm({ product, locale }: { product: Product; locale: Locale }) {
  const dict = getDictionary(locale);
  const formId = `quote-${product.slug}`;

  return (
    <>
      {product.zone === "AQUA" ? (
        <section className="bg-[#f1ece5] px-[8%] py-[8%] max-md:px-[4%]">
          <div className="grid gap-10 md:gap-14">
            <div>
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#8f6747]">
                {dict.product.tailoredProject.eyebrow}
              </span>
              <h2 className="font-heading max-w-[14ch] text-[clamp(2.8rem,6vw,6.8rem)] font-normal leading-[0.88] tracking-normal text-[#151411]">
                {dict.product.tailoredProject.title}
              </h2>
            </div>
            <div className="max-w-5xl">
              {dict.product.tailoredProject.intro.map((paragraph, index) => (
                <p
                  className={index === 0 ? "text-xl leading-8 text-[#151411]" : "mt-4 text-base leading-8 text-[#5b554f] md:text-lg"}
                  key={paragraph}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-px bg-[#cfc3b7] max-lg:grid-cols-1">
            {dict.product.tailoredProject.categories.map((category, categoryIndex) => (
              <div className="bg-[#faf8f4] p-7 md:p-9" key={category.title}>
                <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8f6747]">
                  {String(categoryIndex + 1).padStart(2, "0")} — {category.title}
                </p>
                <div className="grid gap-2">
                  {category.items.map((item) => (
                    <label
                      className="group flex cursor-pointer items-center justify-between gap-4 border-b border-[#d8cec3] py-3 text-sm text-[#35312d]"
                      key={item}
                    >
                      <span>{item}</span>
                      <input
                        className="peer sr-only"
                        form={formId}
                        name="additions"
                        type="checkbox"
                        value={item}
                      />
                      <span className="grid size-5 shrink-0 place-items-center border border-[#a28c79] text-[12px] text-transparent transition after:content-['✓'] peer-checked:border-[#8f6747] peer-checked:bg-[#8f6747] peer-checked:text-white group-hover:border-[#8f6747]" />
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-6 border-t border-[#cfc3b7] pt-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-[8%]">
            <h3 className="font-heading text-[clamp(2rem,4vw,4.4rem)] font-normal leading-[0.92] text-[#151411]">
              {dict.product.tailoredProject.visionTitle}
            </h3>
            <div>
              {dict.product.tailoredProject.visionCopy.map((paragraph) => (
                <p className="mb-4 text-base leading-8 text-[#5b554f] md:text-lg" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="grid grid-cols-[0.85fr_1fr] gap-[8%] bg-[#151411] px-[8%] py-[8%] text-white max-md:grid-cols-1 max-md:px-[4%] max-md:pb-16">
      <div>
        <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#d6b08b]">{product.type}</span>
        <h2 className="font-heading text-[clamp(2.8rem,6vw,6.8rem)] font-normal leading-[0.88] tracking-normal">{product.formTitle}</h2>
        <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
          {dict.quoteForm.copy}
        </p>
      </div>
      <form action="/api/forms" className="relative grid gap-4" id={formId} method="post">
        <input type="hidden" name="form-type" value="quote" />
        <input type="hidden" name="product" value={product.slug} />
        <Field label={dict.quoteForm.name} required tone="light" />
        <Field label={dict.quoteForm.email} required type="email" tone="light" />
        <Field label={dict.quoteForm.phone} tone="light" />
        <Field label={dict.quoteForm.location} tone="light" />
        <Field label={dict.quoteForm.quantity} type="number" tone="light" />
        <Field
          label={dict.quoteForm.materialFinishes}
          as="select"
          options={[
            dict.product.finishOptions.naturalStone,
            dict.product.finishOptions.porcelain,
            dict.product.finishOptions.customRequest,
          ]}
          tone="light"
        />
        {product.zone !== "AQUA" && product.additions?.length ? (
          <div className="my-2 flex flex-wrap gap-2.5">
            <p className="basis-full text-sm font-bold uppercase tracking-[0.18em] text-[#d6b08b]">{dict.product.additionsTitle}</p>
            {product.additions.map((addition) => (
              <label className="border border-white/20 px-3 py-2 text-sm text-white/80" key={addition}>
                <input className="mr-1.5 size-3" name="additions" type="checkbox" value={addition} />
                {addition}
              </label>
            ))}
          </div>
        ) : null}
        <SpamProtection action="quote" theme="dark" />
        <button className="mt-3 min-h-12 bg-[#d6b08b] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#151411] transition hover:bg-white" type="submit">
          {dict.quoteForm.submit}
        </button>
      </form>
      </section>
    </>
  );
}
