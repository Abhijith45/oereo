export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "What makes Aventra small group tours different from standard group travel?",
    answer:
      "All Aventra expeditions are strictly capped at 12 to 16 guests. This allows us to access private heritage sites, boutique eco-lodges, family-owned vineyards, and secluded wilderness camps that large tour buses cannot reach, while keeping the pacing calm and unhurried.",
  },
  {
    id: "faq-2",
    question: "What is your booking flexibility and cancellation policy?",
    answer:
      "Every reservation comes with our Total Confidence Guarantee. You can lock in your journey with a flexible 15% deposit and make free date or destination transfers up to 60 days before departure without incurring any administrative fees.",
  },
  {
    id: "faq-3",
    question: "Can I travel solo, or will I be paired with a stranger?",
    answer:
      "Solo explorers represent nearly 40% of our travelers. You can choose to be paired with a same-gender traveler at no extra cost, or select a guaranteed private room through our single-supplement option.",
  },
  {
    id: "faq-4",
    question: "How physically demanding are the itineraries?",
    answer:
      "Every expedition displays a clear physical grading from 1 (Leisurely) to 5 (High Altitude Trek). Most of our cultural tours are rated 2 or 3, involving 2 to 4 hours of daily walking across cobbled streets, temple stairways, or gentle forest tracks.",
  },
  {
    id: "faq-5",
    question: "Are international flights included with the package price?",
    answer:
      "Our package pricing includes all internal transit (high-speed rail, private chauffeured vans, internal regional flights, and expedition Zodiac boats), airport arrival transfers, and 4-star boutique accommodation. Our flight concierge desk can gladly assist you with securing international long-haul airfare.",
  },
  {
    id: "faq-6",
    question: "How do Aventra journeys give back to local host communities?",
    answer:
      "Through our 1% for Planet Earth initiative and local heritage partnerships, a designated portion of every booking is directly invested into forest reforestation, marine sanctuary protection, and indigenous craft preservation in the exact regions we visit.",
  },
];
