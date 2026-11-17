export interface Trip {
  id: string;
  title: string;
  slug: string;
  duration: string;
  groupSize: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  departureDate: string;
  location: string;
  inclusions: string[];
  imageUrl: string;
  description: string;
  highlights: string[];
}

export const FEATURED_TRIPS: Trip[] = [
  {
    id: "trip-japan-express",
    title: "Japan Express: Osaka to Tokyo",
    slug: "japan-express-osaka-tokyo",
    duration: "10 Days",
    groupSize: "12 - 14 Guests",
    price: 2624,
    originalPrice: 3280,
    discountPercentage: 20,
    departureDate: "Oct 21, 2026",
    location: "Osaka, Kyoto & Tokyo, Japan",
    inclusions: ["Cultural Express", "Heritage Sites", "Bullet Train"],
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
    description:
      "Witness autumn foliage across ancient shrines, savor Michelin-starred ramen alleys, and glide between serene Kyoto temples and vibrant Tokyo districts via high-speed Shinkansen.",
    highlights: [
      "Fushimi Inari torii gates at dawn",
      "Traditional ryokan stay with private onsen",
      "Curated street food walking tour in Dotonbori",
      "Tokyo skyline dinner overlooking Shibuya",
    ],
  },
  {
    id: "trip-antarctica-classic",
    title: "Antarctica Classic Expedition",
    slug: "antarctica-classic-expedition",
    duration: "11 Days",
    groupSize: "16 - 20 Guests",
    price: 9200,
    originalPrice: 11500,
    discountPercentage: 20,
    departureDate: "Dec 02, 2026",
    location: "Antarctic Peninsula",
    inclusions: ["Polar Adventure", "Wildlife Safari", "Zodiac Cruising"],
    imageUrl:
      "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200&auto=format&fit=crop",
    description:
      "Navigate awe-inspiring icebergs, witness colossal penguin colonies, and kayak alongside humpback whales on an expedition vessel engineered for sustainable polar discovery.",
    highlights: [
      "Daily guided Zodiac excursions among crystalline glaciers",
      "Gentoo and chinstrap penguin rookery visits",
      "Onboard polar marine biologists and photography masterclasses",
      "Drake Passage maritime crossing experience",
    ],
  },
  {
    id: "trip-costa-rica-quest",
    title: "Costa Rica Quest & Canopy",
    slug: "costa-rica-quest-canopy",
    duration: "9 Days",
    groupSize: "10 - 12 Guests",
    price: 1259,
    originalPrice: 1650,
    discountPercentage: 24,
    departureDate: "Nov 15, 2026",
    location: "Arenal & Manuel Antonio, Costa Rica",
    inclusions: ["Rainforest Trek", "Adventure Trail", "Hot Springs"],
    imageUrl:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    description:
      "Immerse your senses in misty cloud forests, soak in volcanic hot springs beneath Mount Arenal, and spot toucans, sloths, and iridescent frogs on protected jungle reserves.",
    highlights: [
      "Private night safari in Monteverde Cloud Forest",
      "Thermal mineral baths fed by Arenal Volcano",
      "Whitewater rafting on the pristine Pacuare River",
      "White sand beaches of Manuel Antonio National Park",
    ],
  },
];
