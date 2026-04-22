import Link from "next/link";

import { PageHero } from "@/components/korta/page-hero";
import { SectionHeading } from "@/components/korta/section-heading";
import { asset, projects } from "@/lib/korta-data";

export function ProjectsPage() {
  return (
    <>
      <PageHero title="Projects" eyebrow="KORTA Lifestyle" copy="Stone wellness objects for private residences, destination hospitality and outdoor retreats." image={asset("2025/02/Pool-Area-1024x576.jpg")} meta={["Residential", "Hospitality", "Wellness"]} />
      <section className="px-[8%] py-[8%] text-center max-md:px-[4%]">
        <SectionHeading align="center" eyebrow="References" title="Some of Our Iconic Projects" />
        <div className="grid grid-cols-4 gap-px bg-[#d8cec3] max-xl:grid-cols-2 max-md:grid-cols-1">
          {projects.map((project) => (
            <div className="grid min-h-56 place-items-center bg-[#f8f5ef] p-8 transition hover:bg-white" key={project.name}>
              <img className="max-h-20 object-contain opacity-75 grayscale transition hover:opacity-100 hover:grayscale-0" src={project.image} alt={project.name} />
              <Link className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8f6747]" href="/contact">
                Read More
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
