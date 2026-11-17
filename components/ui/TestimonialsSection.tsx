"use client";

import React from "react";
import Image from "next/image";
import { TESTIMONIALS } from "@/data/testimonials";
import { Star, CheckCircle, ChatCircleText } from "@phosphor-icons/react";

export function TestimonialsSection() {
  const row1 = TESTIMONIALS.slice(0, 3);
  const row2 = TESTIMONIALS.slice(3, 5);

  return (
    <section id="reviews" className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header matching reference */}
      <div className="flex flex-col items-center text-center max-w-[680px] mx-auto mb-14 space-y-3">
        <span className="caption-3 uppercase tracking-widest text-emerald-800 font-semibold">
          Social Proof & Trust
        </span>
        <h2 className="heading-2 text-[#181818]">
          The Aventra Experience <br className="hidden sm:inline" />
          In Their Words
        </h2>
        <p className="body-2 text-[#575753]">
          Genuine reflections from travelers who have explored with our local leaders across 64 sovereign territories.
        </p>
      </div>

      {/* Row 1: 3 Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {row1.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl p-6 border border-[#E7E7E3] flex flex-col justify-between space-y-4 shadow-sm hover:border-[#CCCCCC] transition-colors duration-200"
          >
            <div className="space-y-3">
              {/* Star Rating */}
              <div className="flex text-amber-500 gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={15} weight="fill" />
                ))}
              </div>

              {/* Review Quote */}
              <p className="body-5 text-[#313131] leading-relaxed">
                &ldquo;{review.review}&rdquo;
              </p>
            </div>

            {/* Author Profile */}
            <div className="pt-4 border-t border-[#E7E7E3] flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#E7E7E3] shrink-0">
                <Image
                  src={review.avatarUrl}
                  alt={review.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="title-4 font-semibold text-[#181818] truncate">
                    {review.name}
                  </span>
                  <CheckCircle size={14} weight="fill" className="text-emerald-700 shrink-0" />
                </div>
                <span className="caption-5 text-[#666666] truncate">
                  {review.tripTaken} &middot; {review.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: 2 Centered Testimonials matching reference layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {row2.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl p-6 border border-[#E7E7E3] flex flex-col justify-between space-y-4 shadow-sm hover:border-[#CCCCCC] transition-colors duration-200"
          >
            <div className="space-y-3">
              {/* Star Rating */}
              <div className="flex text-amber-500 gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={15} weight="fill" />
                ))}
              </div>

              {/* Review Quote */}
              <p className="body-5 text-[#313131] leading-relaxed">
                &ldquo;{review.review}&rdquo;
              </p>
            </div>

            {/* Author Profile */}
            <div className="pt-4 border-t border-[#E7E7E3] flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#E7E7E3] shrink-0">
                <Image
                  src={review.avatarUrl}
                  alt={review.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="title-4 font-semibold text-[#181818] truncate">
                    {review.name}
                  </span>
                  <CheckCircle size={14} weight="fill" className="text-emerald-700 shrink-0" />
                </div>
                <span className="caption-5 text-[#666666] truncate">
                  {review.tripTaken} &middot; {review.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Centered "Read 1,500+ Reviews" Pill Button matching reference */}
      <div className="mt-12 flex justify-center">
        <button
          type="button"
          className="px-7 py-3 rounded-full bg-[#181818] hover:bg-black text-white button-sm inline-flex items-center gap-2 shadow-sm transition-colors"
        >
          <ChatCircleText size={16} weight="bold" />
          <span>Read 1,500+ Reviews</span>
        </button>
      </div>
    </section>
  );
}
