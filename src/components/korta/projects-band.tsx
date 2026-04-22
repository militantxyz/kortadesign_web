import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { KortaButton } from "@/components/korta/korta-button";
import { SectionHeading } from "@/components/korta/section-heading";
import { projects } from "@/lib/korta-data";

export function ProjectsBand() {
  return (
    <section className="bg-[#e8ece6] px-[8%] py-[8%] text-center max-md:px-[4%]">
      <SectionHeading align="center" eyebrow="Selected references" title="Placed in villas, resorts and quiet private retreats." />
      <div className="mb-9 grid grid-cols-4 gap-px bg-[#cfd6ca] max-xl:grid-cols-2 max-md:grid-cols-1">
        {projects.slice(0, 6).map((project) => (
          <Link className="grid min-h-48 place-items-center bg-[#f8f5ef] p-8 transition hover:bg-white" href="/projects" key={project.name}>
            <img className="max-h-20 object-contain opacity-75 grayscale transition hover:opacity-100 hover:grayscale-0" src={project.image} alt={project.name} />
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
