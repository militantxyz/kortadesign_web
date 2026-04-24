"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  getStoreRegion,
  storeLocations,
  storeRegionFilters,
  type StoreLocation,
  type StoreRegionFilter,
} from "@/lib/store-locations";

type LeafletBounds = {
  extend: (point: [number, number]) => void;
  isValid: () => boolean;
  pad: (bufferRatio: number) => LeafletBounds;
};

type LeafletLayer = {
  addTo: (target: unknown) => LeafletLayer;
  bindPopup: (html: string, options?: Record<string, unknown>) => LeafletLayer;
};

type LeafletLayerGroup = {
  addLayer: (layer: LeafletLayer) => LeafletLayerGroup;
  addTo: (target: unknown) => LeafletLayerGroup;
  clearLayers: () => LeafletLayerGroup;
};

type LeafletMap = {
  fitBounds: (bounds: LeafletBounds, options?: Record<string, unknown>) => void;
  remove: () => void;
};

type LeafletFactory = {
  map: (element: HTMLElement, options?: Record<string, unknown>) => LeafletMap;
  tileLayer: (urlTemplate: string, options?: Record<string, unknown>) => LeafletLayer;
  circleMarker: (coords: [number, number], options?: Record<string, unknown>) => LeafletLayer;
  latLngBounds: (points?: [number, number][]) => LeafletBounds;
  layerGroup: () => LeafletLayerGroup;
};

declare global {
  interface Window {
    L?: LeafletFactory;
  }
}

const LEAFLET_CSS_ID = "korta-leaflet-css";
const LEAFLET_SCRIPT_ID = "korta-leaflet-script";
const LEAFLET_CSS_URL = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_SCRIPT_URL = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

let leafletLoader: Promise<LeafletFactory> | null = null;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_PATTERN = /^(https?:\/\/|www\.)[^\s]+$/i;
const DOMAIN_PATTERN = /^[a-z0-9.-]+\.[a-z]{2,}(\/[^\s]*)?$/i;
const PHONE_PATTERN = /^\+?[0-9()[\]\s./-]{6,}$/;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeWebsite(value: string) {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function detailAsMarkup(value: string) {
  const safeValue = escapeHtml(value);

  if (EMAIL_PATTERN.test(value)) {
    return `<a href="mailto:${safeValue}" class="korta-store-popup__link">${safeValue}</a>`;
  }

  if (URL_PATTERN.test(value) || DOMAIN_PATTERN.test(value)) {
    const href = escapeHtml(normalizeWebsite(value));
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="korta-store-popup__link">${safeValue}</a>`;
  }

  if (PHONE_PATTERN.test(value)) {
    const tel = escapeHtml(value.replaceAll(/\s+/g, ""));
    return `<a href="tel:${tel}" class="korta-store-popup__link">${safeValue}</a>`;
  }

  return `<span>${safeValue}</span>`;
}

function popupMarkup(store: StoreLocation) {
  const details = store.details.length
    ? `<ul class="korta-store-popup__list">${store.details.map((detail) => `<li>${detailAsMarkup(detail)}</li>`).join("")}</ul>`
    : `<p class="korta-store-popup__empty">Contact info available on request.</p>`;

  return `<article class="korta-store-popup"><h3 class="korta-store-popup__name">${escapeHtml(store.name)}</h3>${details}</article>`;
}

function ensureLeafletCss() {
  if (document.getElementById(LEAFLET_CSS_ID)) return;

  const link = document.createElement("link");
  link.id = LEAFLET_CSS_ID;
  link.rel = "stylesheet";
  link.href = LEAFLET_CSS_URL;
  link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
  link.crossOrigin = "";
  document.head.append(link);
}

function loadLeaflet() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Leaflet can only load in the browser."));
  }

  if (window.L) {
    return Promise.resolve(window.L);
  }

  if (leafletLoader) {
    return leafletLoader;
  }

  leafletLoader = new Promise<LeafletFactory>((resolve, reject) => {
    ensureLeafletCss();

    const resolveLeaflet = () => {
      if (window.L) {
        resolve(window.L);
        return;
      }
      reject(new Error("Leaflet script loaded, but window.L is unavailable."));
    };

    const existingScript = document.getElementById(LEAFLET_SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener("load", resolveLeaflet, { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Failed to load Leaflet script.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = LEAFLET_SCRIPT_ID;
    script.src = LEAFLET_SCRIPT_URL;
    script.async = true;
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin = "";
    script.addEventListener("load", resolveLeaflet, { once: true });
    script.addEventListener("error", () => reject(new Error("Failed to load Leaflet script.")), { once: true });
    document.body.append(script);
  });

  return leafletLoader;
}

export function StoreLocatorMap() {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerLayerRef = useRef<LeafletLayerGroup | null>(null);
  const leafletRef = useRef<LeafletFactory | null>(null);

  const [regionFilter, setRegionFilter] = useState<StoreRegionFilter>("All");
  const [isMapReady, setIsMapReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const filteredStores = useMemo(
    () =>
      regionFilter === "All"
        ? storeLocations
        : storeLocations.filter((store) => getStoreRegion(store) === regionFilter),
    [regionFilter]
  );

  useEffect(() => {
    let isCancelled = false;
    const mapElement = mapElementRef.current;
    if (!mapElement) return;

    loadLeaflet()
      .then((leaflet) => {
        if (isCancelled || !mapElementRef.current) return;

        const mapInstance = leaflet.map(mapElementRef.current, {
          worldCopyJump: true,
          zoomControl: true,
          scrollWheelZoom: false,
        });

        leaflet
          .tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
            maxZoom: 19,
            className: "korta-store-tile",
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          })
          .addTo(mapInstance);

        leafletRef.current = leaflet;
        mapRef.current = mapInstance;
        markerLayerRef.current = leaflet.layerGroup().addTo(mapInstance);
        setIsMapReady(true);
        setHasError(false);
      })
      .catch(() => {
        if (!isCancelled) {
          setHasError(true);
        }
      });

    return () => {
      isCancelled = true;
      markerLayerRef.current = null;
      leafletRef.current = null;
      setIsMapReady(false);
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isMapReady || !mapRef.current || !markerLayerRef.current || !leafletRef.current) {
      return;
    }

    const mapInstance = mapRef.current;
    const markerLayer = markerLayerRef.current;
    const leaflet = leafletRef.current;

    markerLayer.clearLayers();
    const bounds = leaflet.latLngBounds();

    for (const store of filteredStores) {
      const marker = leaflet.circleMarker([store.lat, store.lng], {
        radius: 8.5,
        color: "#1a1714",
        weight: 3,
        fillColor: "#f4eee7",
        fillOpacity: 1,
      });

      marker.bindPopup(popupMarkup(store), {
        maxWidth: 320,
        className: "korta-store-popup-shell",
      });
      markerLayer.addLayer(marker);
      bounds.extend([store.lat, store.lng]);
    }

    if (bounds.isValid()) {
      mapInstance.fitBounds(bounds.pad(0.14), { animate: false, maxZoom: 8 });
    }
  }, [filteredStores, isMapReady]);

  if (hasError) {
    return (
      <div className="grid min-h-[420px] place-items-center border border-[#d6c6b7] bg-[#f4eee7] px-6 text-center max-md:min-h-[360px]">
        <p className="max-w-2xl text-base leading-7 text-[#5b554f]">
          We could not load the interactive map right now. Please refresh and try again.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2.5">
        {storeRegionFilters.map((filterOption) => {
          const isActive = regionFilter === filterOption;

          return (
            <button
              key={filterOption}
              type="button"
              onClick={() => setRegionFilter(filterOption)}
              className={`min-w-[112px] border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition ${
                isActive
                  ? "border-[#8f6747] bg-[#8f6747] text-[#f8f5ef]"
                  : "border-[#d8cec3] bg-[#f8f5ef] text-[#5b554f] hover:border-[#8f6747] hover:text-[#151411]"
              }`}
              aria-pressed={isActive}
            >
              {filterOption}
            </button>
          );
        })}
      </div>
      <p className="mb-5 text-center text-[11px] font-bold uppercase tracking-[0.24em] text-[#8f6747]/85">
        {filteredStores.length} of {storeLocations.length} locations shown
      </p>
      <div className="korta-store-map overflow-hidden border border-[#d6c6b7] bg-[#f4eee7] shadow-[0_24px_60px_-38px_rgba(21,20,17,0.7)]">
        <div
          ref={mapElementRef}
          className="h-[64vh] min-h-[420px] w-full max-md:min-h-[360px]"
        />
      </div>
    </div>
  );
}
