"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/ui/HeroSection";
import { TaglineReveal } from "@/components/ui/TaglineReveal";
import { PackagesSection } from "@/components/ui/PackagesSection";
import { DestinationsSection } from "@/components/ui/DestinationsSection";
import { ValueProps } from "@/components/ui/ValueProps";
import { HowItWorks } from "@/components/ui/HowItWorks";
import { TestimonialsSection } from "@/components/ui/TestimonialsSection";
import { FaqSection } from "@/components/ui/FaqSection";
import { NewsletterSection } from "@/components/ui/NewsletterSection";
import { Footer } from "@/components/ui/Footer";
import { BookingDrawer } from "@/components/ui/BookingDrawer";
import { TripDetailModal } from "@/components/ui/TripDetailModal";
import { Trip, FEATURED_TRIPS } from "@/data/trips";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingTripTitle, setBookingTripTitle] = useState<string | undefined>();
  const [selectedTripDetail, setSelectedTripDetail] = useState<Trip | null>(null);
  const [selectedDestinationFilter, setSelectedDestinationFilter] = useState<string | undefined>();

  const handleOpenBooking = (tripTitle?: string) => {
    setBookingTripTitle(tripTitle);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setBookingTripTitle(undefined);
  };

  const handleSearch = (criteria: { destination: string; date: string; guests: number }) => {
    setSelectedDestinationFilter(criteria.destination);
    const element = document.getElementById("experiences");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectDestination = (destinationName: string) => {
    const match = FEATURED_TRIPS.find((t) =>
      t.location.toLowerCase().includes(destinationName.toLowerCase())
    );
    if (match) {
      setSelectedTripDetail(match);
    } else {
      handleOpenBooking(`${destinationName} Expedition`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#181818] flex flex-col selection:bg-[#181818] selection:text-white">
      {/* Primary Floating Navigation Bar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      <main id="main-content" className="flex-1">
        {/* Full-Bleed Cinematic Hero with Overlapping Search */}
        <HeroSection
          onSearch={handleSearch}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Skill B11 Mandatory Word-by-Word Scroll Tagline Reveal */}
        <TaglineReveal />

        {/* The Aventra Experience (Curated Tour Packages) matching reference */}
        <PackagesSection
          selectedDestination={selectedDestinationFilter}
          onExploreTrip={(trip) => setSelectedTripDetail(trip)}
          onOpenBooking={(tripTitle) => handleOpenBooking(tripTitle)}
        />

        {/* Curated Destinations Showcase Grid matching reference */}
        <DestinationsSection onSelectDestination={handleSelectDestination} />

        {/* 3 Step Pathway: How It Works */}
        <HowItWorks />

        {/* The Reason Travelers Choose Aventra (6 Value Props) */}
        <ValueProps />

        {/* The Aventra Experience In Their Words (3 + 2 Testimonial Layout) */}
        <TestimonialsSection />

        {/* FAQ Accordion Section */}
        <FaqSection />

        {/* Newsletter Subscription Card & Destination Tag Cloud */}
        <NewsletterSection onSelectTag={(tag) => handleSelectDestination(tag)} />
      </main>

      {/* Multi-Column Footer with Giant Watermark Typography */}
      <Footer />

      {/* Interactive Trip Detail Quickview Modal */}
      <TripDetailModal
        trip={selectedTripDetail}
        onClose={() => setSelectedTripDetail(null)}
        onBook={(tripTitle) => handleOpenBooking(tripTitle)}
      />

      {/* Interactive Booking & Consultation Drawer */}
      <BookingDrawer
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedTrip={bookingTripTitle}
      />
    </div>
  );
}
