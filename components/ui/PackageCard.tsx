"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Trip } from "@/data/trips";
import {
  CalendarBlank,
  MapPin,
  Heart,
  Users,
  Clock,
  ArrowUpRight,
} from "@phosphor-icons/react";

interface PackageCardProps {
  trip: Trip;
  onExplore: (trip: Trip) => void;
  onBook: (tripTitle: string) => void;
}

export function PackageCard({ trip, onExplore, onBook }: PackageCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="group bg-white rounded-2xl border border-[#E7E7E3] overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1">
      {/* Visual Header matching reference UI */}
      <div className="relative h-60 w-full overflow-hidden bg-[#F2F2F0]">
        <Image
          src={trip.imageUrl}
          alt={trip.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Subtle Dark Vignette for Badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* Floating Badges matching reference pills */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white caption-4 font-semibold border border-white/20">
            <Clock size={12} weight="bold" />
            {trip.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white caption-4 border border-white/20">
            <Users size={12} weight="bold" />
            {trip.groupSize}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          {/* Title */}
          <h3 className="title-1 font-bold text-[#181818] group-hover:text-emerald-800 transition-colors">
            {trip.title}
          </h3>

          {/* Location with Pin */}
          <div className="flex items-center gap-1.5 text-[#666666] caption-3">
            <MapPin size={13} weight="bold" className="text-emerald-800" />
            <span>{trip.location}</span>
          </div>
        </div>

        {/* Price & Savings Badge matching reference */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#181818]">
              ${trip.price.toLocaleString()}
            </span>
            <span className="caption-2 line-through text-[#888888]">
              ${trip.originalPrice.toLocaleString()}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 caption-4 font-semibold">
              SAVE {trip.discountPercentage}%
            </span>
          </div>

          {/* Departure Date with Crimson Accent matching reference */}
          <div className="flex items-center gap-1.5 text-[#B91C1C] caption-3 font-semibold pt-0.5">
            <CalendarBlank size={14} weight="bold" />
            <span>Departs on {trip.departureDate}</span>
          </div>
        </div>

        {/* Inclusions as clean bullets matching reference */}
        <div className="flex items-center gap-4 text-[#575753] caption-4 pt-1">
          {trip.inclusions.slice(0, 2).map((inc) => (
            <div key={inc} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
              <span>{inc}</span>
            </div>
          ))}
        </div>

        {/* Card Actions Row matching reference */}
        <div className="pt-3 border-t border-[#E7E7E3] flex items-center justify-between">
          <button
            type="button"
            onClick={() => onExplore(trip)}
            className="px-5 py-2 rounded-full border border-[#E7E7E3] hover:border-[#181818] text-[#181818] button-sm inline-flex items-center gap-1.5 hover:bg-[#F9F9F8] transition-all"
          >
            <span>Explore Trip</span>
            <ArrowUpRight size={14} weight="bold" />
          </button>

          {/* Favorite Wishlist Heart */}
          <button
            type="button"
            onClick={() => setIsSaved(!isSaved)}
            className="w-9 h-9 rounded-full border border-[#E7E7E3] flex items-center justify-center text-[#575753] hover:text-rose-600 hover:border-rose-300 transition-colors"
            aria-label={isSaved ? "Remove from saved trips" : "Save trip to wishlist"}
          >
            <Heart
              size={18}
              weight={isSaved ? "fill" : "regular"}
              className={isSaved ? "text-rose-600" : ""}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
