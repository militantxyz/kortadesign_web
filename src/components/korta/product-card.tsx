import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Product } from "@/lib/korta-data";

export function ProductCard({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  return (
    <Link
      className="group grid overflow-hidden border border-[#d8cec3] bg-[#f9f6f0] transition duration-300 hover:-translate-y-1 hover:border-[#b98a63] hover:shadow-[0_24px_70px_rgba(21,20,17,0.14)]"
      href={`/${product.slug}`}
    >
      <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-[#ffffff] p-10">
        <span className="absolute left-5 top-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#6f7468]">
          {product.zone}
        </span>
        <div className={`relative w-full ${compact ? "max-w-72" : "max-w-[380px]"} aspect-square`}>
          <Image
            alt={product.title}
            className="object-contain transition duration-500 group-hover:scale-[1.04]"
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 380px"
            src={product.cardImage}
          />
        </div>
      </div>
      <div className="flex min-h-36 items-end justify-between gap-5 p-6">
        <div>
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8f6747]">
            Handmade stone object
          </p>
          <h3 className="font-heading text-4xl font-normal leading-none tracking-normal text-[#151411]">
            {product.title}
          </h3>
          <p className="mt-2 text-sm text-[#5b554f]">{product.type}</p>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#151411]">
          Explore
          <ArrowRight aria-hidden="true" size={16} />
        </span>
      </div>
    </Link>
  );
}
