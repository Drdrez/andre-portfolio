"use client";

import { useState, useCallback, useEffect } from "react";

/* eslint-disable @next/next/no-img-element */

interface CarouselItem {
  /** The thumbnail shown in the grid */
  thumb: string;
  /** All slides for this carousel (if single image, just one entry) */
  slides: string[];
}

/**
 * Pinterest-style masonry grid that supports carousels.
 * Single images show as-is. Carousel items show the first image
 * with a slide count badge; clicking opens a full-screen lightbox carousel.
 */
export function PinterestGallery({ items, columns = 3 }: { items: CarouselItem[], columns?: 2 | 3 }) {
  const [lightbox, setLightbox] = useState<{ slides: string[]; index: number } | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => {
    setLightbox((lb) =>
      lb ? { ...lb, index: (lb.index - 1 + lb.slides.length) % lb.slides.length } : null
    );
  }, []);
  const next = useCallback(() => {
    setLightbox((lb) =>
      lb ? { ...lb, index: (lb.index + 1) % lb.slides.length } : null
    );
  }, []);

  /* Keyboard nav */
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, close, prev, next]);

  /* Prevent body scroll when lightbox open */
  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      {/* Masonry grid */}
      <div className={`gap-3 sm:gap-4 ${columns === 2 ? 'columns-2' : 'columns-2 sm:columns-3'}`}>
        {items.map((item, i) => (
          <div key={i} className="mb-3 break-inside-avoid sm:mb-4">
            <button
              type="button"
              onClick={() => setLightbox({ slides: item.slides, index: 0 })}
              className="group relative block w-full overflow-hidden rounded-xl border border-border bg-surface-raised shadow-1 transition-all duration-normal hover:shadow-3 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
            >
              <img
                src={item.thumb}
                alt={`Design work ${i + 1}`}
                className="block w-full h-auto object-cover transition-transform duration-normal group-hover:scale-[1.02]"
                loading="lazy"
              />
              {/* Carousel badge */}
              {item.slides.length > 1 && (
                <div className="absolute top-2 right-2 flex items-center gap-1 rounded-lg bg-black/60 px-2 py-1 backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="m9 8 6 4-6 4Z" />
                  </svg>
                  <span className="text-[10px] font-semibold text-white">
                    {item.slides.length}
                  </span>
                </div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox carousel overlay */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in"
          onClick={close}
        >
          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Counter */}
          {lightbox.slides.length > 1 && (
            <div className="absolute top-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
              {lightbox.index + 1} / {lightbox.slides.length}
            </div>
          )}

          {/* Prev button */}
          {lightbox.slides.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6 sm:h-12 sm:w-12"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            className="flex max-h-[85vh] max-w-[90vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.slides[lightbox.index]}
              alt={`Slide ${lightbox.index + 1}`}
              className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-4"
            />
          </div>

          {/* Next button */}
          {lightbox.slides.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:h-12 sm:w-12"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          )}

          {/* Dot indicators */}
          {lightbox.slides.length > 1 && (
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-1.5">
              {lightbox.slides.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightbox({ ...lightbox, index: i }); }}
                  className={`h-2 rounded-full transition-all ${
                    i === lightbox.index
                      ? "w-6 bg-white"
                      : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
