"use client";

import React from "react";
import Link from "next/link";
import { GlobeHemisphereWest } from "@phosphor-icons/react";

export function Footer() {
  const footerLinks = {
    about: [
      { label: "About Us", href: "#" },
      { label: "Our Philosophy", href: "#" },
      { label: "Expedition Leaders", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press & Media", href: "#" },
    ],
    info: [
      { label: "FAQ & Answers", href: "#faq" },
      { label: "Trip Protection", href: "#" },
      { label: "Guaranteed Departures", href: "#" },
      { label: "Physical Grading Scale", href: "#" },
      { label: "Passports & Visas", href: "#" },
    ],
    agents: [
      { label: "Agent Sign In", href: "#" },
      { label: "Representation Desk", href: "#" },
      { label: "Co-op Expeditions", href: "#" },
      { label: "24/7 Ground Concierge", href: "#" },
    ],
    community: [
      { label: "Field Dispatches", href: "#" },
      { label: "Explorer Fellowship", href: "#" },
      { label: "1% for the Planet", href: "#" },
      { label: "Conservation Trust", href: "#" },
    ],
  };

  return (
    <footer className="bg-[#131209] text-white pt-16 pb-8 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Col 1 */}
          <div className="space-y-4">
            <h4 className="caption-3 uppercase tracking-wider text-emerald-400 font-semibold">
              About Aventra
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.about.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="caption-1 text-neutral-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-4">
            <h4 className="caption-3 uppercase tracking-wider text-emerald-400 font-semibold">
              Helpful Info
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.info.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="caption-1 text-neutral-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-4">
            <h4 className="caption-3 uppercase tracking-wider text-emerald-400 font-semibold">
              Travel Agents
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.agents.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="caption-1 text-neutral-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-4">
            <h4 className="caption-3 uppercase tracking-wider text-emerald-400 font-semibold">
              Community
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.community.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="caption-1 text-neutral-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400 caption-4">
          <div className="flex items-center gap-2">
            <GlobeHemisphereWest size={16} weight="bold" className="text-emerald-500" />
            <span>&copy; {new Date().getFullYear()} Aventra Travel LLC. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookie Settings
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Accessibility Statement
            </Link>
          </div>
        </div>

        {/* Giant Watermark Typography matching reference */}
        <div className="pt-8 select-none pointer-events-none text-center">
          <p className="text-[13vw] font-black leading-none tracking-tighter text-white/[0.04] uppercase">
            AVENTRA TRAVEL
          </p>
        </div>
      </div>
    </footer>
  );
}
