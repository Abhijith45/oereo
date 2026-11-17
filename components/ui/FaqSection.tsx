"use client";

import React, { useState } from "react";
import { FAQ_ITEMS } from "@/data/faqs";
import { CaretDown, Question } from "@phosphor-icons/react";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-28 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-[680px] mx-auto mb-14 space-y-3">
        <span className="caption-3 uppercase tracking-widest text-emerald-800 font-semibold">
          Clear Answers
        </span>
        <h2 className="heading-2 text-[#181818]">
          Frequently Asked Questions
        </h2>
        <p className="body-2 text-[#575753]">
          Everything you need to know about our guaranteed departures, room allocations, deposits, and safety standards.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {FAQ_ITEMS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-300 ${
                isOpen
                  ? "bg-white border-[#181818] shadow-sm"
                  : "bg-white/80 border-[#E7E7E3] hover:border-[#CCCCCC]"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
                aria-expanded={isOpen}
              >
                <span className="title-2 font-semibold text-[#181818]">
                  {faq.question}
                </span>
                <div
                  className={`w-7 h-7 rounded-full bg-[#F4F4F2] flex items-center justify-center text-[#181818] shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-[#181818] text-white" : ""
                  }`}
                >
                  <CaretDown size={14} weight="bold" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-[#575753] body-3 border-t border-[#F2F2F0]">
                  <p className="leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
