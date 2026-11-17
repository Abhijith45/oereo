"use client";

import React, { useEffect, useRef, useState } from "react";

const TAGLINE_TEXT =
  "We curate rare journeys that linger in your memory long after your return, blending secluded wilderness with deep cultural understanding.";

export function TaglineReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const words = TAGLINE_TEXT.split(" ");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Trigger when section enters middle of the viewport
            const start = windowHeight * 0.85;
            const end = windowHeight * 0.35;
            const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));

            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center text-center"
      aria-label="Oereo Philosophy"
    >
      <div className="max-w-[680px] mx-auto space-y-4">
        <span className="caption-3 uppercase tracking-widest text-emerald-800 font-semibold">
          The Oereo Promise
        </span>

        <h2 className="heading-3 md:heading-2 font-semibold text-[#181818] leading-tight">
          {words.map((word, index) => {
            if (reducedMotion) {
              return (
                <span key={index} className="text-[#181818] inline-block mr-2">
                  {word}
                </span>
              );
            }

            // Staggered word trigger calculation
            const wordThreshold = index / words.length;
            const isRevealed = scrollProgress >= wordThreshold;

            return (
              <span
                key={index}
                className={`inline-block mr-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isRevealed
                    ? "text-[#181818] opacity-100 translate-y-0"
                    : "text-[#B5B5B0] opacity-30 translate-y-1"
                }`}
              >
                {word}
              </span>
            );
          })}
        </h2>

        <div className="pt-2">
          <p className="caption-2 text-[#666666]">
            Every itinerary is personally vetted and accompanied by dedicated local expedition directors.
          </p>
        </div>
      </div>
    </section>
  );
}
