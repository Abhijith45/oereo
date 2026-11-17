"use client";

import React, { useState, useRef, useEffect } from "react";
import { MagnifyingGlass, CalendarBlank, Users, MapPin, X } from "@phosphor-icons/react";

interface HeroSearchProps {
  onSearch: (criteria: { destination: string; date: string; guests: number }) => void;
}

const DESTINATION_OPTIONS = [
  { name: "Japan", region: "East Asia", tag: "Cultural & Heritage" },
  { name: "Antarctica", region: "Polar Peninsula", tag: "Wildlife & Icebergs" },
  { name: "Costa Rica", region: "Central America", tag: "Rainforest & Trek" },
  { name: "Mexico", region: "North America", tag: "Coast & Ancient Ruins" },
  { name: "Indonesia", region: "Southeast Asia", tag: "Islands & Volcanoes" },
  { name: "Thailand", region: "Southeast Asia", tag: "Temples & Lagoons" },
];

const DATE_OPTIONS = [
  "Oct 2026 (Autumn Foliage)",
  "Nov 2026 (Late Autumn)",
  "Dec 2026 (Polar Season)",
  "Jan 2027 (Winter Solstice)",
  "Spring 2027 (Cherry Blossom)",
  "Flexible Dates",
];

export function HeroSearch({ onSearch }: HeroSearchProps) {
  const [activeDropdown, setActiveDropdown] = useState<"destination" | "dates" | "guests" | null>(
    null
  );

  const [destination, setDestination] = useState("Japan");
  const [date, setDate] = useState("Oct 2026");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const totalGuests = adults + children;

  const handleSearchClick = () => {
    setActiveDropdown(null);
    onSearch({
      destination,
      date,
      guests: totalGuests,
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto z-30"
    >
      <div className="bg-white/95 backdrop-blur-xl border border-[#E7E7E3] sm:rounded-full p-2 shadow-lg flex flex-col md:flex-row items-stretch md:items-center divide-y md:divide-y-0 md:divide-x divide-[#E7E7E3]">
        {/* Field 1: Where */}
        <div className="relative flex-1 px-4 py-2 hover:bg-[#F9F9F8] rounded-full md:rounded-l-full cursor-pointer transition-colors duration-200">
          <button
            type="button"
            onClick={() =>
              setActiveDropdown(activeDropdown === "destination" ? null : "destination")
            }
            className="w-full flex items-center gap-3 text-left outline-none"
            aria-expanded={activeDropdown === "destination"}
          >
            <div className="w-8 h-8 rounded-full bg-[#F2F2F0] flex items-center justify-center text-[#181818] shrink-0">
              <MapPin size={16} weight="bold" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="caption-4 uppercase tracking-wider text-[#666666]">
                Where?
              </span>
              <span className="title-4 text-[#181818] truncate">
                {destination || "Search destinations"}
              </span>
            </div>
          </button>

          {/* Destination Dropdown */}
          {activeDropdown === "destination" && (
            <div className="absolute top-full left-0 mt-3 w-80 bg-white border border-[#E7E7E3] rounded-2xl p-3 shadow-xl z-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E7E7E3]">
                <span className="caption-3 uppercase tracking-wide text-[#666666]">
                  Popular Destinations
                </span>
                <button
                  onClick={() => setActiveDropdown(null)}
                  className="p-1 text-[#666666] hover:text-[#181818]"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="space-y-1">
                {DESTINATION_OPTIONS.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setDestination(item.name);
                      setActiveDropdown(null);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors ${
                      destination === item.name
                        ? "bg-[#181818] text-white"
                        : "hover:bg-[#F2F2F0] text-[#181818]"
                    }`}
                  >
                    <div>
                      <p className="title-4 font-semibold">{item.name}</p>
                      <p
                        className={`caption-5 ${
                          destination === item.name ? "text-gray-300" : "text-[#666666]"
                        }`}
                      >
                        {item.tag}
                      </p>
                    </div>
                    <span
                      className={`caption-5 px-2 py-0.5 rounded-full ${
                        destination === item.name ? "bg-white/20 text-white" : "bg-[#F2F2F0] text-[#575753]"
                      }`}
                    >
                      {item.region}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Field 2: Dates */}
        <div className="relative flex-1 px-4 py-2 hover:bg-[#F9F9F8] cursor-pointer transition-colors duration-200">
          <button
            type="button"
            onClick={() => setActiveDropdown(activeDropdown === "dates" ? null : "dates")}
            className="w-full flex items-center gap-3 text-left outline-none"
            aria-expanded={activeDropdown === "dates"}
          >
            <div className="w-8 h-8 rounded-full bg-[#F2F2F0] flex items-center justify-center text-[#181818] shrink-0">
              <CalendarBlank size={16} weight="bold" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="caption-4 uppercase tracking-wider text-[#666666]">
                Dates
              </span>
              <span className="title-4 text-[#181818] truncate">{date}</span>
            </div>
          </button>

          {/* Dates Dropdown */}
          {activeDropdown === "dates" && (
            <div className="absolute top-full left-0 md:-left-8 mt-3 w-72 bg-white border border-[#E7E7E3] rounded-2xl p-3 shadow-xl z-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E7E7E3]">
                <span className="caption-3 uppercase tracking-wide text-[#666666]">
                  Departure Season
                </span>
                <button
                  onClick={() => setActiveDropdown(null)}
                  className="p-1 text-[#666666] hover:text-[#181818]"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="space-y-1">
                {DATE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setDate(opt.split(" ")[0] + " " + (opt.split(" ")[1] || ""));
                      setActiveDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl title-4 transition-colors ${
                      date.startsWith(opt.split(" ")[0])
                        ? "bg-[#181818] text-white"
                        : "hover:bg-[#F2F2F0] text-[#181818]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Field 3: Guests */}
        <div className="relative flex-1 px-4 py-2 hover:bg-[#F9F9F8] cursor-pointer transition-colors duration-200">
          <button
            type="button"
            onClick={() => setActiveDropdown(activeDropdown === "guests" ? null : "guests")}
            className="w-full flex items-center gap-3 text-left outline-none"
            aria-expanded={activeDropdown === "guests"}
          >
            <div className="w-8 h-8 rounded-full bg-[#F2F2F0] flex items-center justify-center text-[#181818] shrink-0">
              <Users size={16} weight="bold" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="caption-4 uppercase tracking-wider text-[#666666]">
                Guests
              </span>
              <span className="title-4 text-[#181818] truncate">
                {totalGuests} {totalGuests === 1 ? "Traveler" : "Travelers"}
              </span>
            </div>
          </button>

          {/* Guests Dropdown */}
          {activeDropdown === "guests" && (
            <div className="absolute top-full right-0 mt-3 w-72 bg-white border border-[#E7E7E3] rounded-2xl p-4 shadow-xl z-50">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="title-4 text-[#181818] font-semibold">Adults</p>
                    <p className="caption-5 text-[#666666]">Age 16 and over</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => setAdults((a) => Math.max(1, a - 1))}
                      className="w-7 h-7 rounded-full border border-[#E7E7E3] flex items-center justify-center text-[#181818] disabled:opacity-30 hover:bg-[#F2F2F0]"
                    >
                      -
                    </button>
                    <span className="title-4 w-4 text-center">{adults}</span>
                    <button
                      type="button"
                      disabled={adults >= 8}
                      onClick={() => setAdults((a) => Math.min(8, a + 1))}
                      className="w-7 h-7 rounded-full border border-[#E7E7E3] flex items-center justify-center text-[#181818] disabled:opacity-30 hover:bg-[#F2F2F0]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E7E7E3]">
                  <div>
                    <p className="title-4 text-[#181818] font-semibold">Children</p>
                    <p className="caption-5 text-[#666666]">Ages 6 to 15</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={() => setChildren((c) => Math.max(0, c - 1))}
                      className="w-7 h-7 rounded-full border border-[#E7E7E3] flex items-center justify-center text-[#181818] disabled:opacity-30 hover:bg-[#F2F2F0]"
                    >
                      -
                    </button>
                    <span className="title-4 w-4 text-center">{children}</span>
                    <button
                      type="button"
                      disabled={children >= 4}
                      onClick={() => setChildren((c) => Math.min(4, c + 1))}
                      className="w-7 h-7 rounded-full border border-[#E7E7E3] flex items-center justify-center text-[#181818] disabled:opacity-30 hover:bg-[#F2F2F0]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveDropdown(null)}
                  className="w-full py-2 bg-[#181818] text-white rounded-xl button-sm hover:bg-black transition-colors"
                >
                  Confirm Guests
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CTA Search Button */}
        <div className="p-1 flex items-center justify-end">
          <button
            type="button"
            onClick={handleSearchClick}
            className="w-full md:w-auto px-6 py-3 bg-[#181818] hover:bg-black text-white rounded-full button-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-sm"
          >
            <MagnifyingGlass size={16} weight="bold" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
}
