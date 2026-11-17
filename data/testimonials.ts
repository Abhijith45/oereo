export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatarUrl: string;
  rating: number;
  review: string;
  tripTaken: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "review-1",
    name: "Alicia Evans",
    role: "Verified Explorer",
    location: "London, United Kingdom",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    tripTaken: "Japan Express",
    review:
      "Oereo delivers seamless travel planning, expert guides, and unforgettable cultural experiences that made every destination smooth, meaningful, and perfectly organized throughout the journey.",
  },
  {
    id: "review-2",
    name: "Alexander Rodriguez",
    role: "Verified Explorer",
    location: "San Francisco, USA",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    tripTaken: "Antarctica Classic",
    review:
      "From booking to return, everything ran smoothly and professionally. I have never experienced local excursions this thoughtful, with marine biologists and authentic encounters.",
  },
  {
    id: "review-3",
    name: "Kendall Carter",
    role: "Verified Explorer",
    location: "Melbourne, Australia",
    avatarUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    tripTaken: "Costa Rica Quest",
    review:
      "The small group experience helped me connect with wonderful people while enjoying breathtaking rainforest trails and thermal springs together without any stress.",
  },
  {
    id: "review-4",
    name: "Marcus Chen",
    role: "Verified Explorer",
    location: "Singapore",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    tripTaken: "Indonesia Archipelago",
    review:
      "Our guide possessed deep relationships with local village elders in Bali. We dined in family compounds and trekked secluded waterfalls away from standard tourist buses.",
  },
  {
    id: "review-5",
    name: "Ryan Mitchell",
    role: "Verified Explorer",
    location: "Toronto, Canada",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    tripTaken: "Mexico Cultural Odyssey",
    review:
      "I loved how effortless the journey felt. Authentic boutique stays, immersive culinary workshops, and memorable moments across Oaxaca and the Yucatan.",
  },
];
