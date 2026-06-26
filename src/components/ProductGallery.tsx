"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: string[];
  name: string;
};

function GalleryArrow({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 stroke-current stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round] fill-none"
      aria-hidden
    >
      {direction === "prev" ? (
        <path d="M10 3L5 8l5 5" />
      ) : (
        <path d="M6 3l5 5-5 5" />
      )}
    </svg>
  );
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const hasMultiple = images.length > 1;

  function goTo(next: number) {
    setIndex((next + images.length) % images.length);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goTo(diff > 0 ? index + 1 : index - 1);
    }
    touchStartX.current = null;
  }

  return (
    <div className="relative">
      <div
        className="relative aspect-[3/4] overflow-hidden bg-ivory-deep touch-pan-y"
        onTouchStart={hasMultiple ? handleTouchStart : undefined}
        onTouchEnd={hasMultiple ? handleTouchEnd : undefined}
      >
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${name} — Signature Balloon Bouquet by Balloons by H, view ${i + 1}`}
            fill
            priority={i === 0}
            loading={i === 0 ? undefined : "lazy"}
            quality={90}
            draggable={false}
            className={cn(
              "object-cover transition-opacity duration-700 ease-luxury",
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            )}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ))}
        <div className="pointer-events-none absolute inset-5 border border-charcoal/10 md:inset-8" />
      </div>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-charcoal/15 bg-ivory/90 text-charcoal backdrop-blur-sm transition-all duration-300 hover:border-champagne hover:text-champagne-dark md:left-4"
          >
            <GalleryArrow direction="prev" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-charcoal/15 bg-ivory/90 text-charcoal backdrop-blur-sm transition-all duration-300 hover:border-champagne hover:text-champagne-dark md:right-4"
          >
            <GalleryArrow direction="next" />
          </button>

          <div className="mt-5 flex items-center justify-center gap-2.5">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`View photo ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500 ease-luxury",
                  i === index
                    ? "w-6 bg-champagne"
                    : "w-1.5 bg-charcoal/20 hover:bg-charcoal/35"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
