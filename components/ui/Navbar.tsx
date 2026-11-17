"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { List, X, GlobeHemisphereWest } from "@phosphor-icons/react";

interface NavbarProps {
  onOpenBooking: (tripTitle?: string) => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Destinations", href: "#destinations" },
    { label: "Experiences", href: "#experiences" },
    { label: "Why Aventra", href: "#why-aventra" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-8 pt-4 transition-all duration-300">
        <nav
          className={`w-full max-w-6xl flex items-center justify-between px-5 py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-white/90 backdrop-blur-md shadow-md border border-[#E7E7E3] text-[#181818]"
              : "bg-black/30 backdrop-blur-md border border-white/20 text-white shadow-lg"
          }`}
          aria-label="Primary navigation"
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group outline-none"
            aria-label="Aventra Travel Home"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
                scrolled ? "bg-[#181818] text-white" : "bg-white text-[#181818]"
              }`}
            >
              <GlobeHemisphereWest size={18} weight="bold" />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-semibold tracking-tight text-base leading-none ${
                  scrolled ? "text-[#181818]" : "text-white"
                }`}
              >
                Aventra
              </span>
              <span
                className={`caption-5 leading-none uppercase tracking-widest text-[9px] ${
                  scrolled ? "text-[#666666]" : "text-white/75"
                }`}
              >
                Travel
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`title-4 transition-colors duration-200 ${
                  scrolled
                    ? "text-[#575753] hover:text-[#181818]"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenBooking()}
              className={`hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full button-sm transition-all duration-200 active:scale-[0.98] shadow-sm ${
                scrolled
                  ? "bg-[#181818] text-white hover:bg-black"
                  : "bg-white text-[#181818] hover:bg-neutral-100 font-semibold"
              }`}
            >
              Book a trip
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
                scrolled
                  ? "bg-[#F2F2F0] text-[#181818] hover:bg-[#E7E7E3]"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer (Full Height Panel per Skill B7) */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 bg-[#FAFAF8]/98 backdrop-blur-xl md:hidden flex flex-col justify-between p-6 pt-24"
        >
          <div className="flex flex-col space-y-5">
            <span className="caption-4 uppercase tracking-wider text-[#666666]">
              Navigation
            </span>
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="heading-4 text-[#181818] hover:text-emerald-700 transition-colors py-1"
                style={{
                  animationDelay: `${idx * 60}ms`,
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-8 border-t border-[#E7E7E3] flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 bg-[#181818] text-white rounded-full button-md hover:bg-black text-center"
            >
              Book a trip
            </button>
            <p className="caption-2 text-center text-[#666666]">
              Guaranteed departures &middot; 24/7 dedicated concierge
            </p>
          </div>
        </div>
      )}
    </>
  );
}
