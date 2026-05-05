import Image from "next/image";

import { DesignerSection } from "@/components/korta/designer-section";
import { PageHero } from "@/components/korta/page-hero";
import { getDictionary, type Locale } from "@/lib/i18n";
import { asset, localAsset } from "@/lib/korta-data";

export function StoryPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        copy={dict.story.heroCopy}
        eyebrow={dict.story.heroEyebrow}
        image={asset("2025/01/baoli231-min-scaled.jpg")}
        title={dict.story.heroTitle}
      />

      <section className="relative overflow-hidden bg-[#e8ece6] px-[8%] py-[8%] max-md:px-[4%]">
        <div className="pointer-events-none absolute -right-28 top-8 size-80 rounded-full bg-[radial-gradient(circle,_rgba(152,118,86,0.22)_0%,_rgba(152,118,86,0)_72%)]" />
        <div className="relative">
          <div className="grid gap-10 lg:grid-cols-[0.74fr_1fr]">
            <div>
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#8f6747]">
                {dict.story.introEyebrow}
              </span>
              <h2 className="font-heading text-[clamp(2.6rem,6vw,6.4rem)] font-normal leading-[0.9] tracking-normal text-[#151411]">
                {dict.story.introTitle}
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-[#5b554f]">
              {dict.story.introParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="mt-12 grid gap-px bg-[#cfd6ca] md:grid-cols-3">
            {dict.story.whatWeDo.map((item) => (
              <article className="bg-[#f8f5ef] p-7" key={item.title}>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#8f6747]">
                  {item.title}
                </h3>
                <p className="text-base leading-7 text-[#5b554f]">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-10 bg-[#f8f5ef] px-[8%] py-[8%] lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.2fr)] max-md:px-[4%]">
        <article className="border border-[#d8cec3] bg-white p-7 md:p-10">
          <h3 className="font-heading text-[clamp(2rem,4vw,3rem)] leading-none text-[#151411]">
            KORTA
          </h3>
          <p className="mt-3 text-sm uppercase tracking-[0.16em] text-[#8f6747]">
            korta (noun)
          </p>
          <div className="mt-7 space-y-6 border-t border-[#eee6dc] pt-6 text-[#5b554f]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f6747]">
                {dict.story.definitionLabel}
              </p>
              <p className="mt-2 text-lg leading-7">
                {dict.story.definitionText}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f6747]">
                {dict.story.etymologyLabel}
              </p>
              <p className="mt-2 text-lg leading-7">Italian: corte.</p>
            </div>
          </div>
        </article>
        <div className="space-y-7">
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#d8cec3]">
            <Image
              alt="KORTA lifestyle by the pool"
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              src={localAsset("story/aaa2-min.png")}
            />
          </div>
          <div className="space-y-4 text-lg leading-8 text-[#5b554f]">
            {dict.story.lifestyleParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-[8%] py-[8%] max-md:px-[4%]">
        <div className="mb-10 max-w-4xl">
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#8f6747]">
            {dict.story.heritageEyebrow}
          </span>
          <h2 className="font-heading text-[clamp(2.4rem,5.6vw,5.8rem)] font-normal leading-[0.9] text-[#151411]">
            {dict.story.heritageTitle}
          </h2>
        </div>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="space-y-4 text-lg leading-8 text-[#5b554f]">
            {dict.story.heritageParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="mt-7 grid gap-px bg-[#d8cec3] sm:grid-cols-3">
              {dict.story.heritageMilestones.map((milestone) => (
                <div className="bg-[#f8f5ef] p-4 text-sm uppercase tracking-[0.1em] text-[#6f6962]" key={milestone}>
                  {milestone}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px bg-[#d8cec3]">
            <div className="relative col-span-2 aspect-[16/10] size-full">
              <Image
                alt="KORTA heritage landscape"
                className="object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                src={localAsset("story/nautre3.png")}
              />
            </div>
            <div className="relative aspect-[4/5] size-full">
              <Image
                alt="Mediterranean nature texture"
                className="object-cover"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                src={localAsset("story/nature1.png")}
              />
            </div>
            <div className="relative aspect-[4/5] size-full">
              <Image
                alt="Istrian stone tones"
                className="object-cover"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                src={localAsset("story/nature2.png")}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#151411] px-[8%] py-[8%] text-white max-md:px-[4%]">
        <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-[radial-gradient(circle,_rgba(185,138,99,0.28)_0%,_rgba(185,138,99,0)_72%)]" />
        <div className="pointer-events-none absolute -right-20 bottom-10 size-72 rounded-full bg-[radial-gradient(circle,_rgba(95,130,123,0.2)_0%,_rgba(95,130,123,0)_72%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div>
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#d6b08b]">
              {dict.story.philosophyEyebrow}
            </span>
            <h2 className="font-heading text-[clamp(2.3rem,5.4vw,5.2rem)] font-normal leading-[0.9] text-white">
              {dict.story.philosophyTitle}
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/75">
              {dict.story.philosophyCopy}
            </p>
          </div>
          <div className="grid gap-px bg-white/20 lg:self-center">
            {dict.story.philosophyPillars.map((item, index) => (
              <article className="grid grid-cols-[auto_1fr] gap-4 bg-white/5 p-6" key={item}>
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#d6b08b]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-7 text-white/85">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8f5ef] px-[8%] py-[8%] max-md:px-[4%]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
          <article>
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#8f6747]">
              {dict.story.ceoEyebrow}
            </span>
            <h2 className="font-heading text-[clamp(2.1rem,5vw,4.4rem)] font-normal leading-[0.92] text-[#151411]">
              {dict.story.ceoTitle}
            </h2>
            <div className="mt-8 border-l-2 border-[#d6b08b] pl-6 text-lg leading-8 text-[#5b554f]">
              {dict.story.ceoParagraphs.map((paragraph, index) => (
                <p className={index === dict.story.ceoParagraphs.length - 1 ? "mb-6" : "mb-4"} key={paragraph}>
                  {paragraph}
                </p>
              ))}
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#151411]">
                Stefano Ladavac
              </p>
              <p className="text-sm uppercase tracking-[0.14em] text-[#8f6747]">
                {dict.story.ceoRole}
              </p>
            </div>
          </article>
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#d8cec3]">
            <Image
              alt="KORTA project image"
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 54vw"
              src={localAsset("gallery/marbella/korta-baoli-dubai-marbella.jpg")}
            />
          </div>
        </div>
      </section>

      <DesignerSection locale={locale} />
    </>
  );
}
