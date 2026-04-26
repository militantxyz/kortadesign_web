import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/korta/section-heading";
import type { Project } from "@/lib/projects-data";
import { projects } from "@/lib/projects-data";

export function ProjectsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#151411] px-[8%] pb-[6%] pt-28 text-white max-md:px-[4%] max-md:pt-24">
        <Image
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover opacity-35"
          fill
          preload
          sizes="100vw"
          src={projects[0].heroImage}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#151411d0] via-[#151411ad] to-[#151411f2]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d6b08b]">KORTA Lifestyle</p>
          <h1 className="mt-4 text-5xl font-semibold uppercase tracking-[0.08em] text-[#f7f3eb] max-md:text-3xl">
            Iconic Projects
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-balance text-sm leading-7 text-white/80">
            Hospitality destinations, private villas, and signature residences shaped with natural stone.
            Explore every reference in full detail.
          </p>
        </div>
      </section>

      <section className="bg-[#ece6de] px-[8%] py-[7%] max-md:px-[4%]">
        <SectionHeading align="center" eyebrow="References" title="Some of Our Iconic Projects" />
        <div className="mt-10 grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
          {projects.map((project) => (
            <Link className="group relative block aspect-[4/5] overflow-hidden bg-[#151411]" href={`/projects/${project.slug}`} key={project.slug}>
              <Image
                alt={project.name}
                className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                src={project.cardImage}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1514111a] via-[#15141144] to-[#151411d9]" />
              <div className="absolute left-4 top-4 border border-white/35 bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-white/90 backdrop-blur">
                {project.location}
              </div>
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                {project.logo ? (
                  <div className="relative h-16 w-[60%] max-w-[220px]">
                    <Image
                      alt={project.name}
                      className="object-contain"
                      fill
                      sizes="220px"
                      src={project.logo}
                    />
                  </div>
                ) : (
                  <h3 className="max-w-[62%] text-xl font-semibold uppercase tracking-[0.08em] text-white">{project.name}</h3>
                )}
                <span className="inline-flex min-h-11 items-center justify-center border border-white/65 bg-black/35 px-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition group-hover:bg-white group-hover:text-[#151411]">
                  Read More
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export function ProjectDetailPage({ project }: { project: Project }) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#151411] pb-16 pt-24 text-white max-md:pb-10">
        <Image
          alt={project.name}
          className="absolute inset-0 size-full object-cover opacity-80"
          fill
          preload
          sizes="100vw"
          src={project.heroImage}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#15141177] via-[#15141166] to-[#151411ee]" />
        <div className="relative mx-auto mt-[30vh] w-[84%] max-w-6xl border border-white/30 bg-[#151411d9] p-6 backdrop-blur max-md:w-[92%] max-md:p-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#d6b08b]">Project Reference</p>
          <h1 className="mt-3 text-4xl font-semibold uppercase tracking-[0.08em] text-[#f7f3eb] max-md:text-2xl">{project.name}</h1>
          <p className="mt-2 text-sm uppercase tracking-[0.16em] text-white/80">{project.location}</p>
          <a
            className="mt-6 inline-flex min-h-11 items-center gap-2 border border-white/70 px-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[#151411]"
            href={project.externalHref}
            target="_blank"
            rel="noreferrer noopener"
          >
            Visit Location
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>
      </section>

      <section className="bg-[#ece6de] px-[8%] py-[6%] max-md:px-[4%]">
        <div className="mx-auto max-w-6xl">
          <SectionHeading align="left" eyebrow="Project Story" title={project.name} />
          <div className="mt-8 columns-1 gap-10 text-[15px] leading-8 text-[#221f1a] md:columns-2">
            {project.description.map((paragraph, index) => (
              <p className="mb-7 break-inside-avoid" key={`${project.slug}-paragraph-${index}`}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f3ee] px-[8%] py-[6%] max-md:px-[4%]">
        <div className="mx-auto max-w-6xl">
          <SectionHeading align="left" eyebrow="Gallery" title="Project Highlights" />
          <div className="mt-8 columns-1 gap-3 md:columns-2 xl:columns-3">
            {project.gallery.map((image, index) => (
              <a
                className="group mb-3 block break-inside-avoid overflow-hidden bg-[#dfd7cc]"
                href={image}
                target="_blank"
                rel="noreferrer noopener"
                key={`${project.slug}-gallery-${index}`}
              >
                <Image
                  width={1600}
                  height={1067}
                  className="block h-auto w-full transition duration-500 group-hover:scale-[1.03]"
                  src={image}
                  alt={`${project.name} gallery image ${index + 1}`}
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
