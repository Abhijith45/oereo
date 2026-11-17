"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Destination } from "@/data/destinations";
import { ArrowUpRight } from "@phosphor-icons/react";

interface DestinationCardProps {
  destination: Destination;
  onSelect: (name: string) => void;
}

export function DestinationCard({ destination, onSelect }: DestinationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = -((y / rect.height) - 0.5) * 10;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(destination.name)}
      style={{
        transform: isHovered
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.015, 1.015, 1.015)`
          : "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className="group relative h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-[#E7E7E3]"
      role="button"
      tabIndex={0}
      aria-label={`Explore trips in ${destination.name}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(destination.name);
        }
      }}
    >
      {/* Background Image matching reference */}
      <Image
        src={destination.imageUrl}
        alt={destination.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Dark Gradient Vignette for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      {/* Content matching reference layout */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
        <div className="flex items-end justify-between">
          <div className="space-y-1 max-w-md">
            <h3 className="heading-3 md:heading-2 text-white font-bold tracking-tight">
              {destination.name}
            </h3>
            <p className="body-4 text-white/85 line-clamp-2">
              {destination.tagline}
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#181818] transition-colors duration-300 shrink-0 ml-4">
            <ArrowUpRight size={18} weight="bold" />
          </div>
        </div>
      </div>
    </div>
  );
}
