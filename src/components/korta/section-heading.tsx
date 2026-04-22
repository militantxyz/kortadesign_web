export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} mb-12 max-w-4xl ${className}`}>
      {eyebrow ? <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#8f6747]">{eyebrow}</span> : null}
      <h2 className="font-heading text-[clamp(2.6rem,6vw,6.4rem)] font-normal leading-[0.88] tracking-normal text-[#151411]">{title}</h2>
      {copy ? <p className="mt-6 max-w-2xl text-base leading-8 text-[#5b554f] md:text-lg">{copy}</p> : null}
    </div>
  );
}
