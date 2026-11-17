"use client";

import React from "react";
import {
  Compass,
  UsersThree,
  Path,
  Sparkle,
  GlobeHemisphereWest,
  ShieldCheck,
} from "@phosphor-icons/react";

const VALUE_PROPS = [
  {
    icon: Compass,
    title: "Expert Guides, Rooted Insight",
    description:
      "Our expedition directors bring regions alive through generations of local kinship, cultural access, and flawless logistical grace.",
  },
  {
    icon: UsersThree,
    title: "Small Groups, Big Experiences",
    description:
      "Capped at 12 to 16 travelers. Move gracefully through quiet temples and private culinary spaces where tourist buses cannot venture.",
  },
  {
    icon: Path,
    title: "Freedom to Explore Your Way",
    description:
      "Carefully balanced itineraries with structured morning discoveries and unhurried afternoons to wander, journal, or rest.",
  },
  {
    icon: Sparkle,
    title: "Immersive Travel",
    description:
      "Step directly into heritage family kitchens, private tea ceremonies, and secluded glacial waterways closed to general tourism.",
  },
  {
    icon: GlobeHemisphereWest,
    title: "Travel That Gives Back",
    description:
      "A designated portion of every departure directly finances wildlife corridor protection and traditional craft stewardship.",
  },
  {
    icon: ShieldCheck,
    title: "Book with Total Confidence",
    description:
      "Enjoy 100% guaranteed departures once booked, flexible date transfers up to 60 days prior, and 24/7 concierge assistance.",
  },
];

export function ValueProps() {
  return (
    <section id="why-oereo" className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-[680px] mx-auto mb-16 space-y-3">
        <span className="caption-3 uppercase tracking-widest text-emerald-800 font-semibold">
          Uncompromised Quality
        </span>
        <h2 className="heading-2 text-[#181818]">
          The Reason Travelers Choose Oereo
        </h2>
        <p className="body-2 text-[#575753]">
          We eliminate the friction of modern exploration, uniting rare access with attentive hospitality.
        </p>
      </div>

      {/* 6 Value Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {VALUE_PROPS.map((prop, idx) => {
          const Icon = prop.icon;
          return (
            <div
              key={prop.title}
              className="bg-white rounded-2xl p-6 md:p-8 border border-[#E7E7E3] flex flex-col items-center text-center space-y-4 hover:border-[#CCCCCC] hover:shadow-sm transition-all duration-300"
            >
              {/* Minimalist Icon Badge matching reference */}
              <div className="w-12 h-12 rounded-full bg-[#F4F4F2] flex items-center justify-center text-[#181818] mb-1">
                <Icon size={24} weight="regular" />
              </div>

              <h3 className="title-1 font-semibold text-[#181818]">
                {prop.title}
              </h3>

              <p className="body-5 text-[#575753] leading-relaxed">
                {prop.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
