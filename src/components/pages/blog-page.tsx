import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/korta/page-hero";
import { SectionHeading } from "@/components/korta/section-heading";
import { getDictionary, localizePath, type Locale } from "@/lib/i18n";
import { asset, blogPosts } from "@/lib/korta-data";

export function BlogPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero title={dict.blog.heroTitle} eyebrow={dict.blog.heroEyebrow} copy={dict.blog.heroCopy} image={asset("2025/01/IMG_0180-scaled-1-1024x683.jpg")} />
      <section className="px-[8%] py-[8%] max-md:px-[4%]">
        <SectionHeading eyebrow={dict.blog.latestEyebrow} title={dict.blog.latestTitle} />
        <div className="grid grid-cols-3 gap-px bg-[#d8cec3] max-xl:grid-cols-2 max-md:grid-cols-1">
          {blogPosts.map((post) => (
            <Link className="grid bg-[#f8f5ef] transition hover:bg-white" href={localizePath(locale, `/${post.slug}`)} key={post.slug}>
              <div className="relative aspect-[1.25/1]">
                <Image
                  alt={post.title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  src={post.image}
                />
              </div>
              <div className="p-6">
                <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.22em] text-[#8f6747]">{post.date}</span>
                <h2 className="font-heading mb-4 text-4xl font-normal leading-[0.95] tracking-normal text-[#151411]">{post.title}</h2>
                <p className="leading-7 text-[#4a433e]">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export function BlogArticlePage({
  post,
  locale,
}: {
  post: (typeof blogPosts)[number];
  locale: Locale;
}) {
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        title={post.title}
        eyebrow={post.date}
        image={post.image}
        titleClassName="max-w-5xl text-[clamp(2.3rem,5.6vw,6.4rem)] leading-[0.9]"
      />
      <section className="mx-auto max-w-5xl px-[8%] py-[8%] max-md:px-[4%]">
        <p className="mb-5 text-lg leading-8 text-[#4a433e]">{post.excerpt}</p>
        {post.content.map((paragraph, index) => (
          <p className="mb-5 leading-8 text-[#4a433e]" key={`${post.slug}-${index}`}>
            {paragraph}
          </p>
        ))}
        <Link className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#8f6747]" href={localizePath(locale, "/blog")}>
          {dict.blog.backToBlog}
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </section>
    </>
  );
}
