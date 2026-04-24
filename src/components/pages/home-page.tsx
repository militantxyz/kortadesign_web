import Link from "next/link";
import { ArrowDownToLine, ArrowRight } from "lucide-react";

import { ClienteleBand } from "@/components/korta/clientele-band";
import { KortaButton } from "@/components/korta/korta-button";
import { ProductCard } from "@/components/korta/product-card";
import { SectionHeading } from "@/components/korta/section-heading";
import { asset, blogPosts, products } from "@/lib/korta-data";

export function HomePage() {
  const heroSlides = [
    asset("2025/01/17055609639361-1.jpg"),
    asset("2025/01/CAP-SPA-20-scaled-e1737646269147.jpg"),
    asset("2025/01/baoli231-min-scaled.jpg"),
  ];

  const zoneCards = [
    {
      label: "AQUA",
      title: "Water as ritual",
      href: "/collections#AQUA",
      image: asset("2025/01/DSC9674-min-1536x1025.jpg"),
      copy: "Outdoor showers and bathtubs made as sculptural moments for pool, spa and garden spaces.",
    },
    {
      label: "FUOCO",
      title: "Fire as gathering",
      href: "/collections#FUOCO",
      image: asset("2025/01/Capture2-min-1024x1013.png"),
      copy: "Outdoor kitchens and fireplaces that turn hospitality into an architectural experience.",
    },
    {
      label: "ARIA",
      title: "Air as pause",
      href: "/collections#ARIA",
      image: asset("2025/01/Capture22-768x756.png"),
      copy: "Planters and stone tables that complete calm, tactile outdoor living rooms.",
    },
  ];

  const metrics = [
    ["3", "Outdoor relaxation zones"],
    ["11", "Stone wellness objects"],
    ["75+", "Natural finishes and combinations"],
  ];

  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-[#151411] text-white">
        {heroSlides.map((image, index) => (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-0"
            key={image}
            style={{
              animation: "heroFade 18s infinite",
              animationDelay: `${index * 6}s`,
              backgroundImage: `url(${image})`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,20,17,.86),rgba(21,20,17,.44)_44%,rgba(21,20,17,.12))]" />
        <div className="absolute inset-x-[8%] top-[86px] h-px bg-white/20 max-md:inset-x-[4%]" />

        <div className="relative z-10 grid min-h-screen grid-cols-[1fr_340px] items-end gap-10 px-[8%] pb-[7vh] pt-32 max-xl:grid-cols-1 max-md:px-[4%]">
          <div className="max-w-6xl">
            <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.34em] text-[#d6b08b]">
              Handmade in natural stone
            </span>
            <h1 className="font-heading max-w-5xl text-[clamp(3.4rem,9vw,10rem)] font-normal leading-[0.84] tracking-normal">
              Outdoor wellness carved for stillness.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
              KORTA creates timeless outdoor showers, kitchens, fire pieces and
              objects for private villas, resorts and gardens where architecture
              meets open air.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <KortaButton href="/collections" variant="gold">
                Explore Collections
                <ArrowRight aria-hidden="true" size={16} />
              </KortaButton>
              <KortaButton href="/catalogues" variant="light">
                Download Catalogue
                <ArrowDownToLine aria-hidden="true" size={16} />
              </KortaButton>
            </div>
          </div>

          <div className="grid gap-px bg-white/20 max-xl:max-w-2xl">
            {metrics.map(([value, label]) => (
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
            eyebrow="Outdoor wellness design"
            title="A natural stone collection for water, fire and open air."
            copy="Every KORTA piece is designed as a quiet architectural object: precise in silhouette, tactile in material, and made to age with the landscape."
          />
        </div>
        <div className="flex flex-col gap-4 pb-4 text-base leading-8 text-[#5b554f] max-md:pb-8 md:text-lg">
          <p className="font-semibold text-[#151411]">Dear Client,</p>
          <p>
            Welcome to KORTA, where your search for the perfect outdoor shower
            ends. We understand the importance of finding a design that
            complements your space and meets your expectations.
          </p>
          <p>
            Our outdoor showers transform your outdoor space into a sanctuary of
            relaxation and enjoyment. Whether for family, friends, guests,
            clients or business partners, our showers are designed to elevate
            every moment spent outdoors.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-px bg-[#cfd6ca] max-lg:grid-cols-1">
        {zoneCards.map((card) => (
          <Link
            className="group relative min-h-[620px] overflow-hidden bg-[#151411] text-white max-md:min-h-[520px]"
            href={card.href}
            key={card.label}
          >
            <img
              className="absolute inset-0 size-full object-cover opacity-[.72] transition duration-700 group-hover:scale-105 group-hover:opacity-90"
              src={card.image}
              alt=""
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
                View zone
                <ArrowRight aria-hidden="true" size={16} />
              </span>
            </div>
          </Link>
        ))}
      </section>

      <section className="grid grid-cols-[1.05fr_0.95fr] bg-[#e8ece6] max-lg:grid-cols-1">
        <div
          className="min-h-[760px] bg-cover bg-center max-lg:min-h-[520px]"
          style={{
            backgroundImage: `url(${asset(
              "2025/02/Italiana-wellbeing-shower-Goldenwhite-LUx-4-scaled-1-e1739636924695.jpg"
            )})`,
          }}
        />
        <div className="self-center px-[10%] py-[10%] max-md:px-[4%]">
          <SectionHeading
            eyebrow="Material atelier"
            title="From quarry surface to outdoor ritual."
            copy="Natural stone, porcelain stoneware, PVD-coated fittings and custom additions allow every shower to be configured for its setting."
          />
          <div className="grid grid-cols-2 gap-px bg-[#cfd6ca]">
            {[
              "Kanfanar stone",
              "Marazzi porcelain",
              "PVD handles",
              "Custom engraving",
            ].map((item) => (
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
            eyebrow="The collection"
            title="Objects with the presence of architecture."
            copy="Explore KORTA across water, fire and air."
          />
          <KortaButton className="mb-12" href="/collections" variant="outline">
            See All
            <ArrowRight aria-hidden="true" size={16} />
          </KortaButton>
        </div>
        <div className="grid grid-cols-3 gap-7 max-xl:grid-cols-2 max-md:grid-cols-1">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-[0.92fr_1.08fr] bg-[#151411] text-white max-lg:grid-cols-1">
        <div className="self-end p-[8%] max-md:px-[4%]">
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] text-[#d6b08b]">
            Inspired by nature
          </span>
          <h2 className="font-heading text-[clamp(2.6rem,6.3vw,7rem)] font-normal leading-[0.9] tracking-normal">
            Designed for villas, resorts and garden sanctuaries.
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/68">
            The design language is deliberately quiet: monolithic forms, precise
            edges and stone surfaces that let water, light and landscape become
            the experience.
          </p>
          <KortaButton className="mt-8" href="/projects" variant="gold">
            View Projects
            <ArrowRight aria-hidden="true" size={16} />
          </KortaButton>
        </div>
        <img
          className="h-full min-h-[720px] w-full object-cover max-lg:min-h-[520px]"
          src={asset("2025/01/CAP-ACC-EXT-21-scaled.jpg")}
          alt="KORTA outdoor wellness architecture"
        />
      </section>

      <ClienteleBand />

      <section className="px-[8%] py-[8%] max-md:px-[4%]">
        <SectionHeading
          eyebrow="Journal"
          title="Ideas for outdoor wellness spaces."
          copy="Planning notes and design inspiration for showers, gardens, pool decks and outdoor living."
        />
        <div className="grid grid-cols-3 gap-px bg-[#d8cec3] max-lg:grid-cols-1">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              className="grid bg-[#f8f5ef] transition hover:bg-white"
              href={`/${post.slug}`}
              key={post.slug}
            >
              <img
                className="aspect-[1.25/1] w-full object-cover"
                src={post.image}
                alt=""
              />
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
