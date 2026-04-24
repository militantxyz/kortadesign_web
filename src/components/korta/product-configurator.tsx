"use client";

import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { KortaButton } from "@/components/korta/korta-button";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/korta-data";

type FlattenedFinish = {
  groupTitle: string;
  key: string;
  label: string;
  previewImage?: string;
  swatchImage: string;
};

function defaultSelectionKey(finishes: FlattenedFinish[]) {
  return finishes.find((finish) => finish.previewImage)?.key ?? finishes[0]?.key ?? "";
}

export function ProductConfigurator({
  product,
  buttonClassName,
}: {
  product: Product;
  buttonClassName?: string;
}) {
  const configurator = product.configurator;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState("");
  const [brokenPreviews, setBrokenPreviews] = useState<Record<string, true>>({});
  const [brokenSwatches, setBrokenSwatches] = useState<Record<string, true>>({});

  const allFinishes = useMemo(
    () =>
      configurator?.groups.flatMap((group) =>
        group.finishes.map((finish) => ({
          groupTitle: group.title,
          key: `${group.title}::${finish.label}`,
          label: finish.label,
          previewImage: finish.previewImage,
          swatchImage: finish.swatchImage,
        }))
      ) ?? [],
    [configurator]
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  if (!configurator || !allFinishes.length) {
    return null;
  }

  const activeKey = allFinishes.some((finish) => finish.key === selectedKey)
    ? selectedKey
    : defaultSelectionKey(allFinishes);
  const selectedFinish =
    allFinishes.find((finish) => finish.key === activeKey) ?? allFinishes[0];
  const selectedPreview =
    selectedFinish.previewImage && !brokenPreviews[selectedFinish.key]
      ? selectedFinish.previewImage
      : undefined;
  const hasDedicatedPreview = Boolean(selectedPreview);

  return (
    <>
      <KortaButton
        className={cn(
          "mt-8 w-full border-[#151411] text-sm tracking-[0.12em]",
          buttonClassName
        )}
        onClick={() => setIsOpen(true)}
        type="button"
        variant="outline"
      >
        {configurator.buttonLabel}
      </KortaButton>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 bg-[#151411]/70 p-4 md:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div
            aria-label={`${product.title} configurator`}
            aria-modal="true"
            className="mx-auto grid h-full max-w-7xl grid-rows-[auto_minmax(0,1fr)] overflow-hidden border border-[#d8cec3] bg-[#f8f5ef]"
            role="dialog"
          >
            <header className="flex items-center justify-between border-b border-[#d8cec3] px-5 py-4 md:px-7">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f6747]">
                  Configuration
                </p>
                <h3 className="font-heading text-2xl leading-none text-[#151411] md:text-4xl">
                  {product.title} Configurator
                </h3>
              </div>
              <button
                aria-label="Close configurator"
                className="rounded-full border border-[#d8cec3] p-2 text-[#151411] transition hover:bg-white"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <X aria-hidden="true" size={20} />
              </button>
            </header>

            <div className="grid min-h-0 lg:grid-cols-[minmax(300px,0.85fr)_minmax(0,1.15fr)]">
              <div className="border-b border-[#d8cec3] bg-white p-5 lg:border-r lg:border-b-0 md:p-7">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8f6747]">
                  {selectedFinish.groupTitle}
                </p>
                <h4 className="text-2xl text-[#151411] md:text-3xl">
                  {selectedFinish.label}
                </h4>
                <div className="mt-5 grid h-[clamp(420px,62vh,820px)] place-items-center border border-[#d8cec3] bg-white p-3">
                  <img
                    alt={`${product.title} in ${selectedFinish.label}`}
                    className="h-full w-full object-contain object-center"
                    onError={() =>
                      setBrokenPreviews((current) => ({
                        ...current,
                        [selectedFinish.key]: true,
                      }))
                    }
                    src={selectedPreview ?? configurator.fallbackPreviewImage}
                  />
                </div>
                {!hasDedicatedPreview ? (
                  <p className="mt-4 text-sm leading-6 text-[#6f6962]">
                    Dedicated preview is not available for this finish yet. You can
                    still select it for your quote request.
                  </p>
                ) : null}
              </div>

              <div className="min-h-0 overflow-y-auto p-5 md:p-7">
                {configurator.groups.map((group) => (
                  <section className="mb-8 last:mb-0" key={group.title}>
                    <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#8f6747]">
                      {group.title}
                    </h4>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                      {group.finishes.map((finish) => {
                        const finishKey = `${group.title}::${finish.label}`;
                        const isActive = finishKey === selectedFinish.key;
                        const swatchBroken = Boolean(brokenSwatches[finishKey]);
                        const hasPreview = Boolean(
                          finish.previewImage && !brokenPreviews[finishKey]
                        );

                        return (
                          <button
                            aria-pressed={isActive}
                            className={`text-left transition ${
                              isActive
                                ? "ring-2 ring-[#8f6747] ring-offset-2 ring-offset-[#f8f5ef]"
                                : "hover:opacity-90"
                            }`}
                            key={finishKey}
                            onClick={() => setSelectedKey(finishKey)}
                            type="button"
                          >
                            <div className="relative aspect-[5/2] overflow-hidden border border-[#d8cec3] bg-white">
                              {!swatchBroken ? (
                                <img
                                  alt={finish.label}
                                  className="size-full object-cover"
                                  onError={() =>
                                    setBrokenSwatches((current) => ({
                                      ...current,
                                      [finishKey]: true,
                                    }))
                                  }
                                  src={finish.swatchImage}
                                />
                              ) : (
                                <div className="grid h-full place-items-center text-[11px] uppercase tracking-[0.14em] text-[#7a736d]">
                                  {finish.label}
                                </div>
                              )}
                              {!hasPreview ? (
                                <span className="absolute right-1.5 top-1.5 bg-[#151411]/75 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white">
                                  No Preview
                                </span>
                              ) : null}
                            </div>
                            <p className="mt-1.5 text-[13px] text-[#312b27]">
                              {finish.label}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
