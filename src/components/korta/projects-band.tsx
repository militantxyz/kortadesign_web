import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { KortaButton } from "@/components/korta/korta-button";
import { SectionHeading } from "@/components/korta/section-heading";
import { projects } from "@/lib/projects-data";

export function ProjectsBand() {
  return (
    <section className="bg-[#e8ece6] px-[8%] py-[8%] text-center max-md:px-[4%]">
      <SectionHeading align="center" eyebrow="Selected references" title="Placed in villas, resorts and quiet private retreats." />
      <div className="mb-9 mt-10 grid grid-cols-3 gap-3 max-xl:grid-cols-2 max-md:grid-cols-1">
        {projects.slice(0, 6).map((project) => (
          <Link className="group relative block aspect-[16/10] overflow-hidden bg-[#151411]" href={`/projects/${project.slug}`} key={project.slug}>
            <img
              className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
              src={project.cardImage}
              alt={project.name}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#15141114] via-[#15141129] to-[#151411c2]" />
            <div className="absolute inset-x-4 bottom-4 text-left">
              {project.logo ? (
                <img className="max-h-12 object-contain" src={project.logo} alt={project.name} />
              ) : (
                <p className="text-lg font-semibold uppercase tracking-[0.08em] text-white">{project.name}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
      <KortaButton href="/projects">
        Read More
        <ArrowRight aria-hidden="true" size={17} />
      </KortaButton>
    </section>
  );
}
