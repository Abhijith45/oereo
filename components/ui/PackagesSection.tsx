"use client";

import React, { useState } from "react";
import { FEATURED_TRIPS, Trip } from "@/data/trips";
import { PackageCard } from "./PackageCard";
import { ArrowRight } from "@phosphor-icons/react";

interface PackagesSectionProps {
  selectedDestination?: string;
  onExploreTrip: (trip: Trip) => void;
  onOpenBooking: (tripTitle?: string) => void;
}

export function PackagesSection({
  selectedDestination,
  onExploreTrip,
  onOpenBooking,
}: PackagesSectionProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filterTabs = ["All", "Japan", "Antarctica", "Costa Rica", "Cultural", "Wilderness"];

  const filteredTrips = FEATURED_TRIPS.filter((trip) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Cultural") return trip.inclusions.includes("Cultural Express");
    if (activeFilter === "Wilderness")
      return trip.inclusions.includes("Polar Adventure") || trip.inclusions.includes("Rainforest Trek");
    return trip.location.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <section id="experiences" className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header matching reference */}
      <div className="flex flex-col items-center text-center max-w-[680px] mx-auto mb-12 space-y-3">
        <span className="caption-3 uppercase tracking-widest text-emerald-800 font-semibold">
          Handcrafted Itineraries
        </span>
        <h2 className="heading-2 text-[#181818]">
          The Aventra Experience
        </h2>
        <p className="body-2 text-[#575753]">
          Seamless planning, curated boutique stays, and wonder in every turn.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveFilter(tab)}
              className={`px-3.5 py-1.5 rounded-full caption-3 transition-colors ${
                activeFilter === tab
                  ? "bg-[#181818] text-white"
                  : "bg-white border border-[#E7E7E3] text-[#575753] hover:text-[#181818]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 3 Package Cards matching reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredTrips.map((trip) => (
          <PackageCard
            key={trip.id}
            trip={trip}
            onExplore={onExploreTrip}
            onBook={onOpenBooking}
          />
        ))}
      </div>

      {/* Centered Dark Pill CTA matching reference */}
      <div className="mt-12 flex justify-center">
        <button
          type="button"
          onClick={() => onOpenBooking("All Expeditions Catalog")}
          className="px-7 py-3 rounded-full bg-[#181818] hover:bg-black text-white button-sm inline-flex items-center gap-2 shadow-sm active:scale-[0.98] transition-all"
        >
          <span>View all trips</span>
          <ArrowRight size={14} weight="bold" />
        </button>
      </div>
    </section>
  );
}
