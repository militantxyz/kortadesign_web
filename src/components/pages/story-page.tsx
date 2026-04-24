import { DesignerSection } from "@/components/korta/designer-section";
import { PageHero } from "@/components/korta/page-hero";
import { asset, localAsset } from "@/lib/korta-data";

const whatWeDo = [
  {
    title: "Architects, Interior and Landscape Designers",
    copy: "A wide selection of materials to customize each product and adapt every solution to local site conditions.",
  },
  {
    title: "Retail Partners",
    copy: "Unique designer products that open new markets, increase revenue and create demand for premium outdoor solutions.",
  },
  {
    title: "Hospitality Projects",
    copy: "Eco-friendly water-saving systems made for high-traffic locations while preserving impeccable design standards.",
  },
];

const philosophyPillars = [
  "Design products that connect people to place and elevate everyday rituals.",
  "Stay true to natural materials, timeless forms and long-lasting craftsmanship.",
  "Create spaces where harmony, comfort and aesthetic pleasure coexist.",
];

export function StoryPage() {
  return (
    <>
      <PageHero
        copy="We believe the outdoors should be an extension of your personal sanctuary."
        eyebrow="KORTA Lifestyle"
        image={asset("2025/01/baoli231-min-scaled.jpg")}
        title="Our Story"
      />

      <section className="relative overflow-hidden bg-[#e8ece6] px-[8%] py-[8%] max-md:px-[4%]">
        <div className="pointer-events-none absolute -right-28 top-8 size-80 rounded-full bg-[radial-gradient(circle,_rgba(152,118,86,0.22)_0%,_rgba(152,118,86,0)_72%)]" />
        <div className="relative">
          <div className="grid gap-10 lg:grid-cols-[0.74fr_1fr]">
            <div>
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#8f6747]">
                Our Story
              </span>
              <h2 className="font-heading text-[clamp(2.6rem,6vw,6.4rem)] font-normal leading-[0.9] tracking-normal text-[#151411]">
                A Brand Rooted In Outdoor Living
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-[#5b554f]">
              <p>
                As an international leader in the design, production and marketing of
                outdoor designer products, KORTA is present in more than 35 countries
                worldwide. We embody the best of European style and craftsmanship in
                outdoor decor and design.
              </p>
              <p>
                For those seeking tranquility in their own outdoor spaces, KORTA creates
                aesthetic showers and accessories in premium natural materials. By
                combining timeless design and high-end craftsmanship, we elevate the way
                people enjoy their outdoor environments.
              </p>
            </div>
          </div>
          <div className="mt-12 grid gap-px bg-[#cfd6ca] md:grid-cols-3">
            {whatWeDo.map((item) => (
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
                Definition
              </p>
              <p className="mt-2 text-lg leading-7">
                A fenced outdoor area, backyard or patio.
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f6747]">
                Etymology
              </p>
              <p className="mt-2 text-lg leading-7">Italian: corte.</p>
            </div>
          </div>
        </article>
        <div className="space-y-7">
          <img
            alt="KORTA lifestyle by the pool"
            className="w-full border border-[#d8cec3] object-cover"
            src={localAsset("story/aaa2-min.png")}
          />
          <div className="space-y-4 text-lg leading-8 text-[#5b554f]">
            <p>
              KORTA is based on Mediterranean heritage and the joy of outdoor living. It
              is a place for gathering, celebrating special moments and unwinding.
            </p>
            <p>
              We believe everyone deserves a personal outdoor sanctuary filled with
              products that create comfort and connection. Our mission is to bring the
              Istrian-inspired lifestyle to projects around the world.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-[8%] py-[8%] max-md:px-[4%]">
        <div className="mb-10 max-w-4xl">
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#8f6747]">
            Heritage
          </span>
          <h2 className="font-heading text-[clamp(2.4rem,5.6vw,5.8rem)] font-normal leading-[0.9] text-[#151411]">
            From Stone Family Legacy To Global Outdoor Design
          </h2>
        </div>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="space-y-4 text-lg leading-8 text-[#5b554f]">
            <p>
              Stone and similar materials are deeply rooted in our family history. Our
              legacy dates back to 1995, when Stefano&apos;s grandfather and father started
              a business processing natural stone.
            </p>
            <p>
              In 2017, Stefano realized his vision by creating the first outdoor shower
              made of stone. From that moment, KORTA continued to push the boundaries of
              what is possible with natural materials.
            </p>
            <p>
              Today, Stefano&apos;s father serves as our manufacturing advisor. Every product
              is engineered and tested in-house to ensure premium performance and quality.
            </p>
            <div className="mt-7 grid gap-px bg-[#d8cec3] sm:grid-cols-3">
              {["1995 - stone processing roots", "2017 - first stone shower", "Today - global KORTA presence"].map((milestone) => (
                <div className="bg-[#f8f5ef] p-4 text-sm uppercase tracking-[0.1em] text-[#6f6962]" key={milestone}>
                  {milestone}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px bg-[#d8cec3]">
            <img
              alt="KORTA heritage landscape"
              className="col-span-2 aspect-[16/10] size-full object-cover"
              src={localAsset("story/nautre3.png")}
            />
            <img
              alt="Mediterranean nature texture"
              className="aspect-[4/5] size-full object-cover"
              src={localAsset("story/nature1.png")}
            />
            <img
              alt="Istrian stone tones"
              className="aspect-[4/5] size-full object-cover"
              src={localAsset("story/nature2.png")}
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#151411] px-[8%] py-[8%] text-white max-md:px-[4%]">
        <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-[radial-gradient(circle,_rgba(185,138,99,0.28)_0%,_rgba(185,138,99,0)_72%)]" />
        <div className="pointer-events-none absolute -right-20 bottom-10 size-72 rounded-full bg-[radial-gradient(circle,_rgba(95,130,123,0.2)_0%,_rgba(95,130,123,0)_72%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div>
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#d6b08b]">
              Philosophy And Inspiration
            </span>
            <h2 className="font-heading text-[clamp(2.3rem,5.4vw,5.2rem)] font-normal leading-[0.9] text-white">
              Designing Meaningful Outdoor Experiences
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/75">
              We built an international reputation for creating inspiring products that
              connect people to place, elevate human experience and strengthen community
              through design.
            </p>
          </div>
          <div className="grid gap-px bg-white/20 lg:self-center">
            {philosophyPillars.map((item, index) => (
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
              A Word From Our CEO
            </span>
            <h2 className="font-heading text-[clamp(2.1rem,5vw,4.4rem)] font-normal leading-[0.92] text-[#151411]">
              Innovation, Integrity And Craftsmanship
            </h2>
            <div className="mt-8 border-l-2 border-[#d6b08b] pl-6 text-lg leading-8 text-[#5b554f]">
              <p className="mb-4">
                Welcome to our world of innovation and excellence. At KORTA, our values
                are the foundation of everything we do. We believe in creativity,
                integrity and the persistent pursuit of quality.
              </p>
              <p className="mb-6">
                I am proud to lead a team that challenges the status quo and adopts new
                ideas. Every individual contribution matters, and every innovation fuels
                our journey forward.
              </p>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#151411]">
                Stefano Ladavac
              </p>
              <p className="text-sm uppercase tracking-[0.14em] text-[#8f6747]">
                Co-founder & CEO
              </p>
            </div>
          </article>
          <img
            alt="KORTA project image"
            className="w-full border border-[#d8cec3] object-cover"
            src={localAsset("gallery/marbella/korta-baoli-dubai-marbella.jpg")}
          />
        </div>
      </section>

      <DesignerSection />
    </>
  );
}
