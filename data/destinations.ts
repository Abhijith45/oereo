export interface Destination {
  id: string;
  name: string;
  tagline: string;
  imageUrl: string;
  country: string;
  activeTripsCount: number;
}

export const CURATED_DESTINATIONS: Destination[] = [
  {
    id: "dest-mexico",
    name: "Mexico",
    tagline: "Ancient pyramids, coastal havens, and authentic street art.",
    country: "North America",
    activeTripsCount: 14,
    imageUrl:
      "https://images.unsplash.com/photo-1518638150340-f706e86654de?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "dest-indonesia",
    name: "Indonesia",
    tagline: "Volcanic coastlines, emerald rice terraces, and the quiet magic of Bali.",
    country: "Southeast Asia",
    activeTripsCount: 19,
    imageUrl:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "dest-japan",
    name: "Japan",
    tagline: "Zen monasteries, neon metropolis, and ancient cedar shrines.",
    country: "East Asia",
    activeTripsCount: 22,
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "dest-thailand",
    name: "Thailand",
    tagline: "Island hopping, turquoise limestone lagoons, and sacred river temples.",
    country: "Southeast Asia",
    activeTripsCount: 16,
    imageUrl:
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1200&auto=format&fit=crop",
  },
];
