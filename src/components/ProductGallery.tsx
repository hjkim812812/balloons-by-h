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
      viewBox="0 0 24 24"
      className="h-4 w-4 stroke-current stroke-[1] [stroke-linecap:round] [stroke-linejoin:round] fill-none"
      aria-hidden
    >
      {direction === "prev" ? (
        <path d="M15 6l-6 6 6 6" />
      ) : (
        <path d="M9 6l6 6-6 6" />
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

  const arrowClass =
    "absolute top-1/2 z-10 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center text-charcoal/30 transition-colors duration-300 hover:text-charcoal/65";

  return (
    <div className="relative">
      <div
        className="group/gallery relative aspect-[3/4] overflow-hidden bg-ivory-deep touch-pan-y"
        onTouchStart={hasMultiple ? handleTouchStart : undefined}
        onTouchEnd={hasMultiple ? handleTouchEnd : undefined}
      >
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${name} — Luxury Garden Balloon Bouquet by Balloons by H, view ${i + 1}`}
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

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous photo"
              className={cn(arrowClass, "left-1 md:left-2")}
            >
              <GalleryArrow direction="prev" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next photo"
              className={cn(arrowClass, "right-1 md:right-2")}
            >
              <GalleryArrow direction="next" />
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`View photo ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
              className={cn(
                "h-px transition-all duration-500 ease-luxury",
                i === index
                  ? "w-8 bg-charcoal/50"
                  : "w-4 bg-charcoal/15 hover:bg-charcoal/30"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
