import Image from "next/image";
import Link from "next/link";
import { ArrowDownToLine, ArrowRight } from "lucide-react";

import { ClienteleBand } from "@/components/korta/clientele-band";
import { KortaButton } from "@/components/korta/korta-button";
import { ProductCard } from "@/components/korta/product-card";
import { SectionHeading } from "@/components/korta/section-heading";
import { getDictionary, localizePath, type Locale } from "@/lib/i18n";
import { asset, blogPosts, getLocalizedProduct, products } from "@/lib/korta-data";

export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const heroSlides = [
    asset("2025/01/17055609639361-1.jpg"),
    asset("2025/01/CAP-SPA-20-scaled-e1737646269147.jpg"),
    asset("2025/01/baoli231-min-scaled.jpg"),
  ];

  const zoneCards = [
    {
      ...dict.home.zoneCards[0],
      href: localizePath(locale, "/collections#AQUA"),
      image: asset("2025/01/DSC9674-min-1536x1025.jpg"),
    },
    {
      ...dict.home.zoneCards[1],
      href: localizePath(locale, "/collections#FUOCO"),
      image: asset("2025/01/Capture2-min-1024x1013.png"),
    },
    {
      ...dict.home.zoneCards[2],
      href: localizePath(locale, "/collections#ARIA"),
      image: asset("2025/01/Capture22-768x756.png"),
    },
  ];

  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-[#151411] text-white">
        {heroSlides.map((image, index) => (
          <Image
            alt=""
            aria-hidden
            className="absolute inset-0 size-full object-cover opacity-0"
            fill
            key={image}
            preload={index === 0}
            sizes="100vw"
            src={image}
            style={{
              animation: "heroFade 18s infinite",
              animationDelay: `${index * 6}s`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,20,17,.86),rgba(21,20,17,.44)_44%,rgba(21,20,17,.12))]" />
        <div className="absolute inset-x-[8%] top-[86px] h-px bg-white/20 max-md:inset-x-[4%]" />

        <div className="relative z-10 grid min-h-screen grid-cols-[1fr_340px] items-end gap-10 px-[8%] pb-[7vh] pt-32 max-xl:grid-cols-1 max-md:px-[4%]">
          <div className="max-w-6xl">
            <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.34em] text-[#d6b08b]">
              {dict.home.heroEyebrow}
            </span>
            <h1 className="font-heading max-w-5xl text-[clamp(3.4rem,9vw,10rem)] font-normal leading-[0.84] tracking-normal">
              {dict.home.heroTitle}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
              {dict.home.heroCopy}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <KortaButton href={localizePath(locale, "/collections")} variant="gold">
                {dict.home.exploreCollections}
                <ArrowRight aria-hidden="true" size={16} />
              </KortaButton>
              <KortaButton href={localizePath(locale, "/catalogues")} variant="light">
                {dict.home.downloadCatalogue}
                <ArrowDownToLine aria-hidden="true" size={16} />
              </KortaButton>
            </div>
          </div>

          <div className="grid gap-px bg-white/20 max-xl:max-w-2xl">
            {dict.home.metrics.map(([value, label]) => (
              <div className="bg-[#151411]/72 p-5 backdrop-blur" key={label}>
                <p className="font-heading text-5xl leading-none text-[#d6b08b]">
                  {value}
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white/65">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-[0.85fr_1fr] gap-[8%] px-[8%] py-[8%] max-lg:grid-cols-1 max-md:px-[4%] max-md:pb-12">
        <div>
          <SectionHeading
            eyebrow={dict.home.introEyebrow}
            title={dict.home.introTitle}
            copy={dict.home.introCopy}
          />
        </div>
        <div className="flex flex-col gap-4 pb-4 text-base leading-8 text-[#5b554f] max-md:pb-8 md:text-lg">
          <p className="font-semibold text-[#151411]">{dict.home.dearClient}</p>
          {dict.home.introParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-3 gap-px bg-[#cfd6ca] max-lg:grid-cols-1">
        {zoneCards.map((card) => (
          <Link
            className="group relative min-h-[620px] overflow-hidden bg-[#151411] text-white max-md:min-h-[520px]"
            href={card.href}
            key={card.label}
          >
            <Image
              alt={card.title}
              className="absolute inset-0 size-full object-cover opacity-[.72] transition duration-700 group-hover:scale-105 group-hover:opacity-90"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              src={card.image}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,20,17,.05),rgba(21,20,17,.84))]" />
            <div className="relative z-10 flex h-full flex-col justify-end p-8">
              <span className="mb-4 text-[11px] font-bold uppercase tracking-[0.34em] text-[#d6b08b]">
                {card.label}
              </span>
              <h2 className="font-heading text-5xl font-normal leading-[0.9] tracking-normal">
                {card.title}
              </h2>
              <p className="mt-5 max-w-sm leading-7 text-white/74">
                {card.copy}
              </p>
              <span className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]">
                {dict.home.viewZone}
                <ArrowRight aria-hidden="true" size={16} />
              </span>
            </div>
          </Link>
        ))}
      </section>

      <section className="grid grid-cols-[1.05fr_0.95fr] bg-[#e8ece6] max-lg:grid-cols-1">
        <div className="relative min-h-[760px] max-lg:min-h-[520px]">
          <Image
            alt=""
            aria-hidden
            className="object-cover"
            fill
            sizes="(max-width: 1024px) 100vw, 52vw"
            src={asset(
              "2025/02/Italiana-wellbeing-shower-Goldenwhite-LUx-4-scaled-1-e1739636924695.jpg"
            )}
          />
        </div>
        <div className="self-center px-[10%] py-[10%] max-md:px-[4%]">
          <SectionHeading
            eyebrow={dict.home.materialEyebrow}
            title={dict.home.materialTitle}
            copy={dict.home.materialCopy}
          />
          <a
            className="mb-6 inline-flex min-h-12 items-center justify-center gap-2 bg-[#151411] px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#3a332d]"
            download
            href={asset("2026/05/KORTA_2026_MATERIALS.pdf")}
          >
            {dict.home.downloadMaterialBook}
            <ArrowDownToLine aria-hidden="true" size={16} />
          </a>
          <div className="grid grid-cols-2 gap-px bg-[#cfd6ca]">
            {dict.home.materialItems.map((item) => (
              <div
                className="bg-[#f8f5ef] p-5 text-sm font-bold uppercase tracking-[0.16em] text-[#151411]"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-[8%] py-[8%] max-md:px-[4%]">
        <div className="flex items-end justify-between gap-8 max-md:flex-col max-md:items-start">
          <SectionHeading
            eyebrow={dict.home.collectionEyebrow}
            title={dict.home.collectionTitle}
            copy={dict.home.collectionCopy}
          />
          <KortaButton
            className="mb-12"
            href={localizePath(locale, "/collections")}
            variant="outline"
          >
            {dict.home.seeAll}
            <ArrowRight aria-hidden="true" size={16} />
          </KortaButton>
        </div>
        <div className="grid grid-cols-3 gap-7 max-xl:grid-cols-2 max-md:grid-cols-1">
          {products.slice(0, 6).map((product) => (
            <ProductCard
              key={product.slug}
              locale={locale}
              product={getLocalizedProduct(product, locale)}
            />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-[0.92fr_1.08fr] bg-[#151411] text-white max-lg:grid-cols-1">
        <div className="self-end p-[8%] max-md:px-[4%]">
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] text-[#d6b08b]">
            {dict.home.inspiredEyebrow}
          </span>
          <h2 className="font-heading text-[clamp(2.6rem,6.3vw,7rem)] font-normal leading-[0.9] tracking-normal">
            {dict.home.inspiredTitle}
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/68">
            {dict.home.inspiredCopy}
          </p>
          <KortaButton className="mt-8" href={localizePath(locale, "/projects")} variant="gold">
            {dict.home.viewProjects}
            <ArrowRight aria-hidden="true" size={16} />
          </KortaButton>
        </div>
        <div className="relative min-h-[720px] max-lg:min-h-[520px]">
          <Image
            alt="KORTA outdoor wellness architecture"
            className="object-cover"
            fill
            sizes="(max-width: 1024px) 100vw, 52vw"
            src={asset("2025/01/CAP-ACC-EXT-21-scaled.jpg")}
          />
        </div>
      </section>

      <ClienteleBand locale={locale} />

      <section className="px-[8%] py-[8%] max-md:px-[4%]">
        <SectionHeading
          eyebrow={dict.home.journalEyebrow}
          title={dict.home.journalTitle}
          copy={dict.home.journalCopy}
        />
        <div className="grid grid-cols-3 gap-px bg-[#d8cec3] max-lg:grid-cols-1">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              className="grid bg-[#f8f5ef] transition hover:bg-white"
              href={localizePath(locale, `/${post.slug}`)}
              key={post.slug}
            >
              <div className="relative aspect-[1.25/1]">
                <Image
                  alt={post.title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  src={post.image}
                />
              </div>
              <div className="p-6">
                <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#8f6747]">
                  {post.date}
                </span>
                <h3 className="font-heading text-4xl font-normal leading-[0.95] tracking-normal text-[#151411]">
                  {post.title}
                </h3>
                <p className="mt-4 leading-7 text-[#5b554f]">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
