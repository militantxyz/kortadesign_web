import { getDictionary, type Locale } from "@/lib/i18n";
import type { Product } from "@/lib/korta-data";

function fieldName(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function Field({
  label,
  type = "text",
  as = "input",
  tone = "dark",
  options,
}: {
  label: string;
  type?: string;
  as?: "input" | "textarea" | "select";
  tone?: "dark" | "light";
  options?: string[];
}) {
  const name = fieldName(label);
  const controlClass =
    tone === "light"
      ? "min-h-12 w-full border-b border-white/35 bg-transparent px-0 py-3 text-white outline-none placeholder:text-white/55 focus:border-[#d6b08b]"
      : "min-h-12 w-full border-b border-[#151411]/35 bg-transparent px-0 py-3 text-[#151411] outline-none placeholder:text-[#151411]/55 focus:border-[#8f6747]";

  if (as === "select") {
    const values = options ?? [];

    return (
      <select aria-label={label} className={controlClass} defaultValue="" name={name}>
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
    return <textarea aria-label={label} className={controlClass} name={name} placeholder={label} rows={5} />;
  }

  return <input aria-label={label} className={controlClass} name={name} placeholder={label} type={type} />;
}

export function QuoteForm({ product, locale }: { product: Product; locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section className="grid grid-cols-[0.85fr_1fr] gap-[8%] bg-[#151411] px-[8%] py-[8%] text-white max-md:grid-cols-1 max-md:px-[4%] max-md:pb-16">
      <div>
        <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#d6b08b]">{product.type}</span>
        <h2 className="font-heading text-[clamp(2.8rem,6vw,6.8rem)] font-normal leading-[0.88] tracking-normal">{product.formTitle}</h2>
        <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
          {dict.quoteForm.copy}
        </p>
      </div>
      <form action="/api/forms" className="relative grid gap-4" method="post">
        <input type="hidden" name="form-type" value="quote" />
        <input type="hidden" name="product" value={product.slug} />
        <input
          aria-hidden="true"
          autoComplete="off"
          className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
          name="website"
          tabIndex={-1}
          type="text"
        />
        <Field label={dict.quoteForm.name} tone="light" />
        <Field label={dict.quoteForm.email} type="email" tone="light" />
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
        {product.additions?.length ? (
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
        <button className="mt-3 min-h-12 bg-[#d6b08b] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#151411] transition hover:bg-white" type="submit">
          {dict.quoteForm.submit}
        </button>
      </form>
    </section>
  );
}
