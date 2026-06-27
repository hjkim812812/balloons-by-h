export type Enhancement = {
  slug: string;
  name: string;
  image?: string;
  description?: string;
  price?: number;
};

export const ENHANCEMENTS: Enhancement[] = [
  {
    slug: "36-number-balloon",
    name: '36" Number Balloon',
    image: "/images/enhancements/36-number-balloon.png",
  },
  {
    slug: "mini-numbers",
    name: "Mini Numbers",
  },
  {
    slug: "heart-bouquets",
    name: "Heart Bouquets",
    image: "/images/enhancements/heart-bouquets-v2.png",
    description:
      "Enhance your bouquet with a matching 10-heart bouquet for a fuller, more elegant presentation. Created in the same color palette as your main bouquet.",
    price: 95,
  },
  {
    slug: "personalized-bubble-accent",
    name: "Personalized Bubble Accent",
    image: "/images/enhancements/personalized-bubble-accent.png",
  },
];

export function getEnhancementBySlug(slug: string): Enhancement | undefined {
  return ENHANCEMENTS.find((item) => item.slug === slug);
}
