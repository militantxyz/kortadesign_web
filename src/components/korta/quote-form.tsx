import type { Product } from "@/lib/korta-data";

function fieldName(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function Field({
  label,
  type = "text",
  as = "input",
  tone = "dark",
}: {
  label: string;
  type?: string;
  as?: "input" | "textarea" | "select";
  tone?: "dark" | "light";
}) {
  const name = fieldName(label);
  const controlClass =
    tone === "light"
      ? "min-h-12 w-full border-b border-white/35 bg-transparent px-0 py-3 text-white outline-none placeholder:text-white/55 focus:border-[#d6b08b]"
      : "min-h-12 w-full border-b border-[#151411]/35 bg-transparent px-0 py-3 text-[#151411] outline-none placeholder:text-[#151411]/55 focus:border-[#8f6747]";

  if (as === "textarea") {
    return <textarea aria-label={label} className={controlClass} name={name} placeholder={label} rows={5} />;
  }

  if (as === "select") {
    return (
      <select aria-label={label} className={controlClass} defaultValue="" name={name}>
        <option value="" disabled>
          {label}
        </option>
        <option>Natural Stone Kanfanar</option>
        <option>Marazzi Porcelain Stoneware</option>
        <option>Custom Request</option>
      </select>
    );
  }

  return <input aria-label={label} className={controlClass} name={name} placeholder={label} type={type} />;
}

export function QuoteForm({ product }: { product: Product }) {
  return (
    <section className="grid grid-cols-[0.85fr_1fr] gap-[8%] bg-[#151411] px-[8%] py-[8%] text-white max-md:grid-cols-1 max-md:px-[4%]">
      <div>
        <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#d6b08b]">{product.type}</span>
        <h2 className="font-heading text-[clamp(2.8rem,6vw,6.8rem)] font-normal leading-[0.88] tracking-normal">{product.formTitle}</h2>
        <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
          Tell us what you are planning and the KORTA team will help define the right finish, configuration and next steps.
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
        <Field label="Name" tone="light" />
        <Field label="Email" type="email" tone="light" />
        <Field label="Phone Number" tone="light" />
        <Field label="Delivery Location" tone="light" />
        <Field label="Quantity" type="number" tone="light" />
        <Field label="Material & Finishes" as="select" tone="light" />
        {product.additions?.length ? (
          <div className="my-2 flex flex-wrap gap-2.5">
            <p className="basis-full text-sm font-bold uppercase tracking-[0.18em] text-[#d6b08b]">Additions</p>
            {product.additions.map((addition) => (
              <label className="border border-white/20 px-3 py-2 text-sm text-white/80" key={addition}>
                <input className="mr-1.5 size-3" name="additions" type="checkbox" value={addition} />
                {addition}
              </label>
            ))}
          </div>
        ) : null}
        <button className="mt-3 min-h-12 bg-[#d6b08b] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#151411] transition hover:bg-white" type="submit">
          Ask for a Quote
        </button>
      </form>
    </section>
  );
}
