"use client";

import React from "react";
import Image from "next/image";
import { HeroSearch } from "./HeroSearch";
import { Sparkle, Star } from "@phosphor-icons/react";

interface HeroSectionProps {
  onSearch: (criteria: { destination: string; date: string; guests: number }) => void;
  onOpenBooking: () => void;
}

export function HeroSection({ onSearch, onOpenBooking }: HeroSectionProps) {
  return (
    <section className="relative w-full pt-0 pb-16 md:pb-24">
      {/* Full-Bleed Cinematic Hero Banner matching reference UI */}
      <div className="relative w-full min-h-[580px] md:min-h-[680px] lg:min-h-[740px] flex flex-col justify-end">
        {/* Background Visual: Traveler in van looking out over alpine peaks */}
        <Image
          src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=85&w=2200&auto=format&fit=crop"
          alt="Adventurer explorer resting in camper van with cup of coffee overlooking mountain peaks"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Cinematic Film Vignette & Contrast Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30" />

        {/* Hero Narrative Overlay (Positioned exactly as in reference UI) */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 pb-24 md:pb-28">
          <div className="max-w-[720px] space-y-4">
            {/* Elegant Kicker Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white shadow-sm">
              <Sparkle size={14} weight="fill" className="text-amber-300" />
              <span className="caption-3 uppercase tracking-widest font-semibold">
                Curated Small Group Expeditions
              </span>
            </div>

            {/* Massive Hero Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] text-balance">
              Discover the World <br />
              Through Aventra
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-[620px] font-normal text-pretty">
              Unmatched destinations and immersed travel experiences crafted for modern explorers seeking authentic cultural encounters.
            </p>

            {/* Social Proof Star Rating */}
            <div className="flex items-center gap-2.5 pt-2 text-white/90 caption-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} weight="fill" />
                ))}
              </div>
              <span className="font-semibold text-white">4.98 / 5.0</span>
              <span className="text-white/80">&middot; 1,500+ verified explorer journeys</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Travel Search Bar Straddling the Image Threshold */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 -mt-10 md:-mt-12">
        <HeroSearch onSearch={onSearch} />
      </div>
    </section>
  );
}
