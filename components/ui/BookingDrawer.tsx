"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { X, Check, WarningCircle, ShieldCheck } from "@phosphor-icons/react";

interface BookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTrip?: string;
}

const COUNTRY_CODES = [
  { code: "+1", flag: "🇺🇸", label: "US (+1)" },
  { code: "+44", flag: "🇬🇧", label: "UK (+44)" },
  { code: "+61", flag: "🇦🇺", label: "AU (+61)" },
  { code: "+91", flag: "🇮🇳", label: "IN (+91)" },
  { code: "+81", flag: "🇯🇵", label: "JP (+81)" },
  { code: "+49", flag: "🇩🇪", label: "DE (+49)" },
  { code: "+33", flag: "🇫🇷", label: "FR (+33)" },
  { code: "+971", flag: "🇦🇪", label: "AE (+971)" },
  { code: "+65", flag: "🇸🇬", label: "SG (+65)" },
  { code: "+34", flag: "🇪🇸", label: "ES (+34)" },
  { code: "+39", flag: "🇮🇹", label: "IT (+39)" },
  { code: "+52", flag: "🇲🇽", label: "MX (+52)" },
  { code: "+41", flag: "🇨🇭", label: "CH (+41)" },
];

export function BookingDrawer({ isOpen, onClose, preselectedTrip }: BookingDrawerProps) {
  const [trip, setTrip] = useState(preselectedTrip || "Japan Express: Osaka to Tokyo");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(2);
  const [season, setSeason] = useState("Autumn 2026");
  const [roomType, setRoomType] = useState("Private Suite");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (preselectedTrip) {
      setTrip(preselectedTrip);
    }
  }, [preselectedTrip]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setStatus("error");
      setErrorMessage("Please provide your full legal name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Please provide a valid email address.");
      return;
    }

    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 600);
  };

  const handleReset = () => {
    setStatus("idle");
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in overflow-hidden"
    >
      <div className="w-full max-w-lg bg-[#FAFAF8] h-screen max-h-[100dvh] shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#E7E7E3] p-6">
        {/* Header - Aligned with Landing Page Design Skill */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E7E7E3] shrink-0">
          <div>
            <span className="caption-3 uppercase tracking-wider text-emerald-800 font-semibold block leading-tight">
              Bespoke Reservation
            </span>
            <h3 className="heading-5 text-[#181818] font-bold leading-tight mt-0.5">
              Reserve Your Journey
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#EFEFEF] hover:bg-[#E0E0DE] text-[#181818] flex items-center justify-center transition-colors duration-200 active:scale-[0.98]"
            aria-label="Close booking drawer"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        {/* Content Body - Zero Scroll 100vh with Strict Typographic & Spacing Tokens */}
        {status === "success" ? (
          <div className="my-auto py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
              <Check size={28} weight="bold" />
            </div>
            <h4 className="title-1 font-bold text-[#181818]">
              Consultation Reserved
            </h4>
            <p className="body-4 text-[#575753] max-w-sm mx-auto">
              Thank you, {name}. An Aventra expedition concierge will reach out to {email} within 24 hours.
            </p>
            <div className="p-4 rounded-2xl bg-white border border-[#E7E7E3] text-left space-y-1.5 max-w-sm mx-auto caption-2 text-[#575753]">
              <p><strong>Expedition:</strong> {trip}</p>
              <p><strong>Travelers:</strong> {guests} Guests &middot; {roomType}</p>
              <p><strong>Window:</strong> {season}</p>
              <p><strong>Contact:</strong> {countryCode} {phone || "N/A"}</p>
            </div>
            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-[#181818] text-white rounded-full button-sm hover:bg-black transition-colors duration-200 active:scale-[0.98]"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col justify-between py-4 space-y-3 overflow-hidden"
          >
            <div className="space-y-3">
              {/* Field 1: Expedition Select */}
              <div>
                <label className="block caption-3 uppercase tracking-wider text-[#181818] mb-1 font-semibold">
                  Expedition
                </label>
                <select
                  value={trip}
                  onChange={(e) => setTrip(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-[#E7E7E3] bg-white text-sm text-[#181818] outline-none transition-all duration-200 focus:border-[#181818] focus:ring-1 focus:ring-[#181818]"
                >
                  <option value="Japan Express: Osaka to Tokyo">Japan Express: Osaka to Tokyo</option>
                  <option value="Antarctica Classic Expedition">Antarctica Classic Expedition</option>
                  <option value="Costa Rica Quest & Canopy">Costa Rica Quest & Canopy</option>
                  <option value="Mexico Cultural Odyssey">Mexico Cultural Odyssey</option>
                  <option value="Indonesia Archipelago">Indonesia Archipelago</option>
                  <option value="Custom Bespoke Itinerary">Custom Bespoke Itinerary</option>
                </select>
              </div>

              {/* Field 2 & 3 (2-Column Grid): Departure Season & Guests Count */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block caption-3 uppercase tracking-wider text-[#181818] mb-1 font-semibold">
                    Departure Season
                  </label>
                  <select
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-[#E7E7E3] bg-white text-sm text-[#181818] outline-none transition-all duration-200 focus:border-[#181818] focus:ring-1 focus:ring-[#181818]"
                  >
                    <option value="Autumn 2026">Autumn 2026</option>
                    <option value="Winter 2026">Winter 2026</option>
                    <option value="Spring 2027">Spring 2027</option>
                    <option value="Summer 2027">Summer 2027</option>
                  </select>
                </div>

                <div>
                  <label className="block caption-3 uppercase tracking-wider text-[#181818] mb-1 font-semibold">
                    Guests Count
                  </label>
                  <div className="flex h-10 w-full items-center justify-between rounded-xl border border-[#E7E7E3] bg-white px-3 transition-colors">
                    <span className="caption-1 font-semibold text-[#181818]">
                      {guests} {guests === 1 ? "Guest" : "Guests"}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={guests <= 1}
                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                        className="w-6 h-6 rounded-md bg-[#F4F4F2] hover:bg-[#E7E7E3] text-[#181818] text-xs font-bold disabled:opacity-30 transition-colors flex items-center justify-center active:scale-[0.98]"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        disabled={guests >= 8}
                        onClick={() => setGuests((g) => Math.min(8, g + 1))}
                        className="w-6 h-6 rounded-md bg-[#F4F4F2] hover:bg-[#E7E7E3] text-[#181818] text-xs font-bold disabled:opacity-30 transition-colors flex items-center justify-center active:scale-[0.98]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Field 4 & 5 (2-Column Grid): Full Name & Email Address */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block caption-3 uppercase tracking-wider text-[#181818] mb-1 font-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alicia Evans"
                    className="w-full h-10 px-3 rounded-xl border border-[#E7E7E3] bg-white text-sm text-[#181818] outline-none transition-all duration-200 focus:border-[#181818] focus:ring-1 focus:ring-[#181818]"
                  />
                </div>

                <div>
                  <label className="block caption-3 uppercase tracking-wider text-[#181818] mb-1 font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alicia@example.com"
                    className="w-full h-10 px-3 rounded-xl border border-[#E7E7E3] bg-white text-sm text-[#181818] outline-none transition-all duration-200 focus:border-[#181818] focus:ring-1 focus:ring-[#181818]"
                  />
                </div>
              </div>

              {/* Field 6: Unified Merged Phone & Calling Code Input */}
              <div>
                <label className="block caption-3 uppercase tracking-wider text-[#181818] mb-1 font-semibold">
                  Phone Number
                </label>
                <div className="flex h-10 w-full rounded-xl border border-[#E7E7E3] bg-white overflow-hidden transition-all duration-200 focus-within:border-[#181818] focus-within:ring-1 focus-within:ring-[#181818]">
                  <div className="relative border-r border-[#E7E7E3] bg-[#FAFAF8] flex items-center shrink-0">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="h-full pl-3 pr-2 bg-transparent text-sm text-[#181818] outline-none cursor-pointer font-medium"
                      aria-label="Country calling code"
                    >
                      {COUNTRY_CODES.map((item) => (
                        <option key={item.code + item.label} value={item.code}>
                          {item.flag} {item.code}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="555 0192"
                    className="h-full flex-1 px-3 bg-transparent text-sm text-[#181818] placeholder-[#999999] outline-none"
                  />
                </div>
              </div>

              {/* Field 7: Stateroom Preference Buttons */}
              <div>
                <label className="block caption-3 uppercase tracking-wider text-[#181818] mb-1 font-semibold">
                  Stateroom Preference
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["Private Suite", "Shared Luxury Stateroom"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setRoomType(type)}
                      className={`h-10 px-3 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-[0.98] flex items-center justify-center text-center ${
                        roomType === type
                          ? "bg-[#181818] text-white shadow-sm"
                          : "bg-white text-[#575753] border border-[#E7E7E3] hover:border-[#181818] hover:text-[#181818]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Error Message */}
            {status === "error" && (
              <div className="flex items-center gap-1.5 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 caption-4">
                <WarningCircle size={15} weight="bold" className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Bottom Actions Container */}
            <div className="space-y-2 pt-1 shrink-0">
              {/* Guarantee Callout with Nested Radius Formula (rounded-xl inside rounded-3xl) */}
              <div className="p-2.5 rounded-xl bg-[#F4F4F2] border border-[#E7E7E3] flex items-center gap-2.5 text-[#575753] caption-4">
                <ShieldCheck size={18} weight="fill" className="text-emerald-700 shrink-0" />
                <span>No deposit required today. Stateroom held for 48 hours.</span>
              </div>

              {/* Primary Submission CTA */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full h-11 bg-[#181818] hover:bg-black text-white rounded-full button-sm transition-all duration-200 active:scale-[0.98] shadow-sm disabled:opacity-50 flex items-center justify-center"
              >
                {status === "submitting" ? "Securing Hold..." : "Request Itinerary Reservation"}
              </button>
            </div>
          </form>
        )}

        {/* Footer Note */}
        <div className="pt-3 border-t border-[#E7E7E3] text-center caption-4 text-[#888888] shrink-0">
          Direct concierge assistance: 1-800-AVENTRA
        </div>
      </div>
    </div>
  );
}
