import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScroll";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aventra Travel | Curated Journeys & Luxury Small Group Adventures",
  description:
    "Discover unmatched destinations and immersive luxury travel experiences crafted for modern explorers. Small groups, local expert guides, and guaranteed departures.",
  keywords: [
    "luxury travel",
    "small group tours",
    "curated expeditions",
    "adventure travel",
    "Aventra travel",
  ],
  authors: [{ name: "Aventra Travel" }],
  openGraph: {
    title: "Aventra Travel | Curated Journeys for Modern Explorers",
    description:
      "Handcrafted journeys with local guides, guaranteed departures, and 24/7 on ground support.",
    url: "https://aventratravel.com",
    siteName: "Aventra Travel",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="bg-[#FAFAF8] text-[#181818] antialiased selection:bg-[#181818] selection:text-white">
        {/* Accessible Skip Link (Skill B10) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#181818] focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
