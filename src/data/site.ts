/**

 * Balloons by H — fully custom site config.

 * No e-commerce platform. Booking via contact form + SMS (when enabled).

 */



export const SITE_URL =

  process.env.NEXT_PUBLIC_SITE_URL ?? "https://balloonsbyh.com";



export const BRAND = {

  name: "Balloons by H",

  tagline: "Tailored balloons for timeless occasions.",

  location: "Beverly Hills · Los Angeles",

  email: "hello@balloonsbyh.com",

  instagramHandle: "balloons.by.h",

  instagram: "https://www.instagram.com/balloons.by.h/",

} as const;



export const BUSINESS_HOURS = {

  days: "Monday–Saturday",

  hours: "10AM–6PM",

} as const;



export const TESTIMONIALS = [

  "Absolutely stunning. Even more beautiful in person.",

  "The most elegant balloon bouquet I've ever ordered.",

  "Beautiful craftsmanship and flawless delivery.",

] as const;



export const TRUST_ITEMS = [

  { label: "Handmade in Los Angeles", icon: "handmade" },

  { label: "Luxury Local Delivery", icon: "delivery" },

  { label: "Premium Balloon Art", icon: "art" },

  { label: "Secure Checkout", icon: "secure" },

  { label: "Fast Response", icon: "response" },

  { label: "Custom Designs", icon: "custom" },

] as const;



/** Placeholder grid until Instagram photos are connected */

export const INSTAGRAM_PLACEHOLDERS = [

  { src: "/images/bouquets/sunset-rose.png", alt: "Instagram placeholder — Sunset Rose bouquet" },

  { src: "/images/bouquets/french-blush.png", alt: "Instagram placeholder — French Blush bouquet" },

  { src: "/images/bouquets/golden-buttercream.png", alt: "Instagram placeholder — Golden Buttercream bouquet" },

  { src: "/images/bouquets/welcome-baby.png", alt: "Instagram placeholder — Welcome Baby bouquet" },

  { src: "/images/bouquets/rose-champagne.png", alt: "Instagram placeholder — Rosé Champagne bouquet" },

  { src: "/images/bouquets/black-tie.png", alt: "Instagram placeholder — Black Tie bouquet" },

] as const;



/** Set your number to enable direct SMS inquiry links */

export const SMS_PHONE = "";



export const BOUQUET_PRICE = 445;



export const COLLECTION = {

  slug: "signature-balloon-bouquet-collection",

  name: "Signature Collection",

  description: "One sculptural design. Nine curated color stories.",

  shortDescription: "One sculptural design. Nine curated color stories.",

} as const;



export type Bouquet = {

  slug: string;

  name: string;

  accent: string;

  accentLight: string;

  mood: string;

  image: string;

  images?: string[];

};



/** Each color story has its own dedicated brand photo */

export const BOUQUETS: Bouquet[] = [

  {

    slug: "rodeo-drive-lavender",

    name: "Rodeo Drive Lavender",

    accent: "#B8A8C8",

    accentLight: "#E8E0F0",

    mood: "Soft lavender with a hint of evening glamour",

    image: "/images/bouquets/rodeo-drive-lavender.png",

  },

  {

    slug: "sunset-rose",

    name: "Sunset Rose",

    accent: "#D4A098",

    accentLight: "#F5E0DA",

    mood: "Blush rose warmed by a California sunset",

    image: "/images/bouquets/sunset-rose.png",

  },

  {

    slug: "beverly-blue",

    name: "Beverly Blue",

    accent: "#98B8C8",

    accentLight: "#D8E8F0",

    mood: "Cool, refined blue with coastal ease",

    image: "/images/bouquets/beverly-blue.png",

  },

  {

    slug: "welcome-baby",

    name: "Welcome Baby",

    accent: "#D8C0C8",

    accentLight: "#F5E8EC",

    mood: "Gentle and welcoming, softly feminine",

    image: "/images/bouquets/welcome-baby.png",

  },

  {

    slug: "french-blush",

    name: "French Blush",

    accent: "#D8A8A8",

    accentLight: "#F5E0E0",

    mood: "Parisian blush with quiet romance",

    image: "/images/bouquets/french-blush.png",

  },

  {

    slug: "cloud-blue",

    name: "Cloud Blue",

    accent: "#A8C0D0",

    accentLight: "#E8F0F5",

    mood: "Ethereal blue, light as morning sky",

    image: "/images/bouquets/cloud-blue.png",

  },

  {

    slug: "golden-buttercream",

    name: "Golden Buttercream",

    accent: "#D4C080",

    accentLight: "#F5ECD0",

    mood: "Golden tones with buttery softness",

    image: "/images/bouquets/golden-buttercream.png",

  },

  {

    slug: "rose-champagne",

    name: "Rosé Champagne",

    accent: "#D8A898",

    accentLight: "#F5E0D8",

    mood: "Rosé hues with celebratory sparkle",

    image: "/images/bouquets/rose-champagne.png",

  },

  {

    slug: "black-tie",

    name: "Black Tie",

    accent: "#3C3C3C",

    accentLight: "#E8E8E8",

    mood: "Dramatic monochrome for formal occasions",

    image: "/images/bouquets/black-tie.png",

    images: [
      "/images/bouquets/black-tie.png",
      "/images/bouquets/black-tie-2.png",
    ],

  },

];



export const BOUQUET_PHOTOS = Object.fromEntries(

  BOUQUETS.map((b) => [b.slug, b.image])

) as Record<(typeof BOUQUETS)[number]["slug"], string>;



export function getBouquetImage(slug: string): string {

  return getBouquetBySlug(slug)?.image ?? BOUQUETS[0].image;

}



export const DELIVERY_AREAS = [

  "Beverly Hills",

  "Bel Air",

  "Brentwood",

  "West Hollywood",

  "Santa Monica",

] as const;



export function getBouquetBySlug(slug: string): Bouquet | undefined {

  return BOUQUETS.find((b) => b.slug === slug);

}



export function getBouquetImages(bouquet: Bouquet): string[] {

  return bouquet.images ?? [bouquet.image];

}



export function canonicalUrl(path = "/"): string {
  const base = SITE_URL.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function formatPrice(amount: number): string {

  return new Intl.NumberFormat("en-US", {

    style: "currency",

    currency: "USD",

    minimumFractionDigits: 0,

  }).format(amount);

}


