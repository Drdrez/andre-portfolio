"use client";

import { useState, useRef } from "react";

/* eslint-disable @next/next/no-img-element */

export function InlineCarousel({ slides, title, subtitle }: { slides: string[], title?: string, subtitle?: string }) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const prev = () => {
    const nextIndex = (index - 1 + slides.length) % slides.length;
    setIndex(nextIndex);
    scrollToIndex(nextIndex);
  };

  const next = () => {
    const nextIndex = (index + 1) % slides.length;
    setIndex(nextIndex);
    scrollToIndex(nextIndex);
  };

  const scrollToIndex = (i: number) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const child = container.children[i] as HTMLElement;
      if (child) {
        container.scrollTo({
          left: child.offsetLeft,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h2 className="text-xl font-bold tracking-tight text-text-primary">{title}</h2>}
          {subtitle && <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>}
        </div>
      )}
      
      <div className="relative group">
        {/* Navigation Buttons */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70 focus:opacity-100"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70 focus:opacity-100"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        {/* Carousel Container */}
        <div 
          ref={containerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {slides.map((src, i) => (
            <div key={i} className="min-w-full shrink-0 snap-center relative flex items-center justify-center">
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                className="w-full h-auto block"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 z-10 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setIndex(i); scrollToIndex(i); }}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-white"
                    : "w-2 bg-white/60 hover:bg-white/90"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
