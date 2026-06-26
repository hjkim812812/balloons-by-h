import type { Bouquet } from "@/data/site";
import { BOUQUET_PRICE, COLLECTION, canonicalUrl, formatPrice } from "@/data/site";

export const HOME_SEO = {
  title: "Balloons by H | Luxury Balloon Delivery in Beverly Hills",
  description:
    "Luxury balloon bouquets and custom balloon designs for birthdays, baby showers, anniversaries, and elegant celebrations. Serving Beverly Hills, Bel Air, Brentwood, Santa Monica, and Los Angeles.",
  keywords: [
    "balloon delivery Beverly Hills",
    "luxury balloons Los Angeles",
    "balloon bouquets Beverly Hills",
    "custom balloon designs",
  ],
} as const;

export const ABOUT_SEO = {
  title: "About Our Beverly Hills Atelier | Balloons by H",
  description:
    "Balloons by H is a Beverly Hills atelier for luxury balloon design — refined bouquets, premium craftsmanship, and white-glove delivery across Westside Los Angeles.",
  keywords: ["luxury balloon boutique Beverly Hills", "balloon atelier Los Angeles"],
} as const;

export const DELIVERY_SEO = {
  title: "Balloon Delivery Beverly Hills & Westside LA | Balloons by H",
  description:
    "Luxury balloon delivery in Beverly Hills, Bel Air, Brentwood, West Hollywood, and Santa Monica. Hand-delivered balloon bouquets across Westside Los Angeles.",
  keywords: [
    "balloon delivery Beverly Hills",
    "balloons near me Beverly Hills",
    "Westside Los Angeles balloon delivery",
  ],
} as const;

export const CONTACT_SEO = {
  title: "Contact & Inquire | Balloons by H Beverly Hills",
  description:
    "Inquire for luxury balloon delivery in Beverly Hills and Los Angeles. Custom balloon bouquets for birthdays, baby showers, anniversaries, and celebrations. We respond within 24 hours.",
  keywords: ["order balloons Beverly Hills", "balloon delivery inquiry Los Angeles"],
} as const;

export const COLLECTIONS_SEO = {
  title: "Luxury Balloon Collections | Balloons by H",
  description:
    "Explore luxury balloon bouquets by Balloons by H. The Signature Collection features curated color stories, handcrafted in Los Angeles and delivered across Beverly Hills and the Westside.",
  keywords: ["luxury balloon bouquets Beverly Hills", "balloon collection Los Angeles"],
} as const;

export const COLLECTION_DETAIL_SEO = {
  title: "Signature Balloon Bouquet Collection | Balloons by H",
  description: `${COLLECTION.description} Luxury balloon delivery in Beverly Hills, Bel Air, Brentwood, and Westside Los Angeles. Starting at ${formatPrice(BOUQUET_PRICE)}.`,
  keywords: [
    "signature balloon bouquet Beverly Hills",
    "luxury balloon collection Los Angeles",
  ],
} as const;

export const NOT_FOUND_SEO = {
  title: "Page Not Found | Balloons by H",
  description:
    "The page you are looking for could not be found. Return to Balloons by H for luxury balloon delivery in Beverly Hills and Los Angeles.",
} as const;

export function getBouquetSeo(bouquet: Bouquet) {
  const title = `${bouquet.name} Luxury Balloon Bouquet | Balloons by H`;
  const description = `Order the ${bouquet.name} luxury balloon bouquet — ${bouquet.mood}. Handcrafted and delivered in Beverly Hills, Bel Air, Brentwood, Santa Monica, and Los Angeles.`;

  return {
    title,
    description,
    keywords: [
      `${bouquet.name} balloon bouquet`,
      "luxury balloon delivery Beverly Hills",
      "balloon bouquets Los Angeles",
    ],
  };
}

export function getProductJsonLd(bouquet: Bouquet) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${bouquet.name} — Signature Balloon Bouquet`,
    description: bouquet.mood,
    image: canonicalUrl(bouquet.image),
    brand: {
      "@type": "Brand",
      name: "Balloons by H",
    },
    offers: {
      "@type": "Offer",
      price: BOUQUET_PRICE,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: canonicalUrl(`/collections/${COLLECTION.slug}/${bouquet.slug}`),
    },
  };
}
