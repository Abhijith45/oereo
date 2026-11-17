"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { PaperPlaneTilt, Check, WarningCircle } from "@phosphor-icons/react";

const DESTINATION_TAGS = [
  "Peru",
  "South Africa",
  "Finland",
  "Zimbabwe",
  "Namibia",
  "Iceland",
  "Morocco",
  "Colombia",
  "Kenya",
  "Greece",
  "United States",
  "Australia",
  "Spain",
  "Norway",
  "Costa Rica",
  "Madagascar",
  "Argentina",
  "Cambodia",
  "Turkey",
  "Albania",
  "Croatia",
  "Portugal",
  "Japan",
];

export function NewsletterSection({ onSelectTag }: { onSelectTag?: (tag: string) => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation per Skill B10
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please provide a valid email address.");
      return;
    }

    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      setMessage("Welcome to Oereo Dispatches. Your inaugural route guide is on its way.");
      setEmail("");
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }, 600);
  };

  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto pt-10 pb-6">
      {/* Dark Pre-Footer Card (matching reference dark container) */}
      <div className="bg-[#131209] rounded-3xl p-8 md:p-14 text-white border border-white/10 shadow-xl">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Newsletter Form Row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-12 border-b border-white/10">
            <div className="space-y-2 max-w-md">
              <span className="caption-3 uppercase tracking-widest text-emerald-400 font-semibold">
                Private Journal
              </span>
              <h3 className="heading-3 text-white font-semibold">
                Adventures await
              </h3>
              <p className="body-5 text-neutral-400">
                Receive unreleased expedition dates, seasonal field dispatches, and private member pricing.
              </p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="w-full lg:max-w-md space-y-2">
              <div className="relative flex items-center bg-white/10 border border-white/20 rounded-full p-1.5 focus-within:border-white focus-within:ring-2 focus-within:ring-white/20 transition-all">
                <input
                  type="email"
                  id="newsletter-email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Enter your email"
                  className="w-full bg-transparent px-4 py-2 text-white placeholder-neutral-400 outline-none text-sm"
                  aria-label="Email for travel dispatches"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-5 py-2.5 bg-white text-[#181818] rounded-full button-sm hover:bg-neutral-200 transition-colors shrink-0 disabled:opacity-50"
                >
                  {status === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
              </div>

              {/* Specific Calm Validation Message (Skill B8 & B9) */}
              {status === "error" && (
                <div className="flex items-center gap-1.5 text-rose-400 caption-4 pt-1">
                  <WarningCircle size={14} weight="bold" />
                  <span>{message}</span>
                </div>
              )}
              {status === "success" && (
                <div className="flex items-center gap-1.5 text-emerald-400 caption-4 pt-1">
                  <Check size={14} weight="bold" />
                  <span>{message}</span>
                </div>
              )}
            </form>
          </div>

          {/* Quick Jump Destination Cloud matching reference */}
          <div className="space-y-4">
            <h4 className="title-3 text-white font-semibold">
              Where is your next calling you?
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {DESTINATION_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onSelectTag?.(tag)}
                  className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-neutral-300 hover:text-white caption-4 transition-colors duration-200"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
