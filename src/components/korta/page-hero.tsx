export function PageHero({
  eyebrow,
  title,
  copy,
  image,
  meta,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  image: string;
  meta?: string[];
}) {
  return (
    <section
      className="relative grid min-h-[88vh] overflow-hidden bg-cover bg-center text-white max-md:min-h-[70vh]"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(21,20,17,.72), rgba(21,20,17,.24) 48%, rgba(21,20,17,.08)), url(${image})`,
      }}
    >
      <div className="absolute inset-x-[8%] top-24 h-px bg-white/25 max-md:inset-x-[4%]" />
      <div className="relative z-10 flex items-end px-[8%] pb-[8vh] pt-32 max-md:px-[4%]">
        <div className="max-w-5xl">
          {eyebrow ? <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.32em] text-[#d6b08b]">{eyebrow}</span> : null}
          <h1 className="font-heading max-w-4xl text-[clamp(3.2rem,8vw,9.8rem)] font-normal leading-[0.82] tracking-normal">{title}</h1>
          {copy ? <p className="mt-7 max-w-2xl text-lg leading-8 text-white/85 md:text-xl">{copy}</p> : null}
          {meta?.length ? (
            <div className="mt-10 flex flex-wrap gap-3">
              {meta.map((item) => (
                <span className="border border-white/35 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/85" key={item}>
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
