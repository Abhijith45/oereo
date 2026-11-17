"use client";

import React from "react";
import { CURATED_DESTINATIONS } from "@/data/destinations";
import { DestinationCard } from "./DestinationCard";

interface DestinationsSectionProps {
  onSelectDestination: (name: string) => void;
}

export function DestinationsSection({ onSelectDestination }: DestinationsSectionProps) {
  return (
    <section id="destinations" className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header matching reference */}
      <div className="flex flex-col items-center text-center max-w-[680px] mx-auto mb-12 space-y-3">
        <span className="caption-3 uppercase tracking-widest text-emerald-800 font-semibold">
          Global Terraces
        </span>
        <h2 className="heading-2 text-[#181818]">
          Curated Destinations <br className="hidden sm:inline" />
          by Aventra
        </h2>
        <p className="body-2 text-[#575753]">
          From sacred alpine shrines to equatorial rainforests, each sanctuary is hand-selected for deep local resonance.
        </p>
      </div>

      {/* 2x2 Responsive Grid matching reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {CURATED_DESTINATIONS.map((dest) => (
          <DestinationCard
            key={dest.id}
            destination={dest}
            onSelect={onSelectDestination}
          />
        ))}
      </div>
    </section>
  );
}
