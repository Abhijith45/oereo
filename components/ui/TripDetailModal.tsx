"use client";

import React from "react";
import Image from "next/image";
import { Trip } from "@/data/trips";
import { X, CalendarBlank, Users, MapPin, CheckCircle, ShieldCheck, ArrowRight } from "@phosphor-icons/react";

interface TripDetailModalProps {
  trip: Trip | null;
  onClose: () => void;
  onBook: (tripTitle: string) => void;
}

export function TripDetailModal({ trip, onClose, onBook }: TripDetailModalProps) {
  if (!trip) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E7E7E3] shadow-2xl relative">
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black transition-colors"
          aria-label="Close modal"
        >
          <X size={18} weight="bold" />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 md:h-72 w-full">
          <Image
            src={trip.imageUrl}
            alt={trip.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
            <span className="caption-3 uppercase tracking-wider text-emerald-300">
              {trip.location}
            </span>
            <h3 className="heading-4 text-white font-bold">{trip.title}</h3>
          </div>
        </div>

        {/* Modal Details */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Key Specs */}
          <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-[#F4F4F2] text-center border border-[#E7E7E3]">
            <div>
              <span className="caption-5 text-[#666666] uppercase">Duration</span>
              <p className="title-4 font-semibold text-[#181818]">{trip.duration}</p>
            </div>
            <div>
              <span className="caption-5 text-[#666666] uppercase">Group Size</span>
              <p className="title-4 font-semibold text-[#181818]">{trip.groupSize}</p>
            </div>
            <div>
              <span className="caption-5 text-[#666666] uppercase">Next Departure</span>
              <p className="title-4 font-semibold text-emerald-800">{trip.departureDate}</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="title-3 font-semibold text-[#181818]">Expedition Overview</h4>
            <p className="body-4 text-[#575753] leading-relaxed">
              {trip.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-2.5">
            <h4 className="title-3 font-semibold text-[#181818]">Key Itinerary Highlights</h4>
            <div className="space-y-2">
              {trip.highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-2.5">
                  <CheckCircle size={18} weight="fill" className="text-emerald-700 shrink-0 mt-0.5" />
                  <span className="body-5 text-[#313131]">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee Pill */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 caption-2">
            <ShieldCheck size={18} weight="fill" className="text-emerald-700 shrink-0" />
            <span>
              100% Guaranteed Departure &middot; Flexible transfers up to 60 days before trip start.
            </span>
          </div>

          {/* Bottom Action */}
          <div className="pt-4 border-t border-[#E7E7E3] flex items-center justify-between">
            <div>
              <span className="caption-5 text-[#666666]">Starting from</span>
              <div className="flex items-center gap-2">
                <span className="heading-5 font-bold text-[#181818]">
                  ${trip.price.toLocaleString()}
                </span>
                <span className="caption-2 line-through text-[#888888]">
                  ${trip.originalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onBook(trip.title);
              }}
              className="px-6 py-3 bg-[#181818] hover:bg-black text-white rounded-full button-sm inline-flex items-center gap-2 shadow-md transition-colors"
            >
              <span>Reserve Itinerary</span>
              <ArrowRight size={15} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
