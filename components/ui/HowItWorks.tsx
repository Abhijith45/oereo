"use client";

import React from "react";
import { Compass, Sparkle, ShieldCheck, ArrowRight } from "@phosphor-icons/react";

const STEPS = [
  {
    number: "01",
    title: "Select Your Journey",
    description:
      "Explore handcrafted seasonal itineraries curated around peak wildlife and cultural festivals, or request a bespoke route.",
  },
  {
    number: "02",
    title: "Tailor Every Detail",
    description:
      "Work alongside your assigned adventure concierge to fine-tune room preferences, private excursions, and pre-departure briefings.",
  },
  {
    number: "03",
    title: "Travel with Total Peace",
    description:
      "Touch down with private airport pickups, boutique accommodations, and an attentive local expedition leader every step of the way.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-24 px-4 md:px-8 max-w-7xl mx-auto bg-[#F4F4F2] rounded-3xl border border-[#E7E7E3] my-12">
      <div className="flex flex-col items-center text-center max-w-[680px] mx-auto mb-14 space-y-3">
        <span className="caption-3 uppercase tracking-widest text-emerald-800 font-semibold">
          Simple 3 Step Pathway
        </span>
        <h2 className="heading-2 text-[#181818]">
          How Your Journey Unfolds
        </h2>
        <p className="body-2 text-[#575753]">
          From your initial inquiry to your return flight, our team handles every complexity so you remain entirely in the moment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {STEPS.map((step, idx) => (
          <div
            key={step.number}
            className="relative bg-white rounded-2xl p-6 md:p-8 border border-[#E7E7E3] flex flex-col justify-between space-y-4 shadow-sm"
          >
            <div className="space-y-3">
              <span className="inline-block text-2xl font-bold tracking-tight text-emerald-800 font-mono">
                {step.number}
              </span>
              <h3 className="title-1 font-semibold text-[#181818]">
                {step.title}
              </h3>
              <p className="body-5 text-[#575753] leading-relaxed">
                {step.description}
              </p>
            </div>
            <div className="pt-2 flex items-center text-emerald-800 caption-3 font-semibold gap-1">
              <span>Verified step</span>
              <ArrowRight size={12} weight="bold" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
