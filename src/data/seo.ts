import {
  BOUQUET_PRICE,
  BRAND,
  BUSINESS_HOURS,
  COLLECTION,
  DELIVERY_AREAS,
  SITE_URL,
  canonicalUrl,
  formatPrice,
} from "@/data/site";

export const LOCAL_SEO = {
  primaryCity: "Beverly Hills",
  region: "CA",
  country: "US",
  serviceType: "Luxury balloon delivery",
  geo: {
    latitude: 34.0736,
    longitude: -118.4004,
  },
} as const;

export const LOCAL_KEYWORDS = [
  "balloon delivery Beverly Hills",
  "luxury balloons Los Angeles",
  "balloon bouquets Beverly Hills",
  "balloons near me Beverly Hills",
  "premium balloon delivery Westside Los Angeles",
] as const;

export type FaqItem = {
  id: string;
  question: string;
  answerText: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "beverly-hills-delivery",
    question: "Do you offer balloon delivery in Beverly Hills?",
    answerText:
      "Yes. Balloons by H provides luxury balloon delivery throughout Beverly Hills and across the Westside of Los Angeles, including Bel Air, Brentwood, West Hollywood, and Santa Monica.",
  },
  {
    id: "delivery-areas",
    question: "Which neighborhoods do you deliver to near Beverly Hills?",
    answerText: `We deliver to ${DELIVERY_AREAS.join(", ")}. If your address is outside our regular delivery area, please inquire and we will do our best to accommodate your request.`,
  },
  {
    id: "pricing",
    question: "How much do your luxury balloon bouquets cost?",
    answerText: `Our Luxury Garden bouquets are ${formatPrice(BOUQUET_PRICE)}. Each color story is hand-finished and delivered with care.`,
  },
  {
    id: "ordering",
    question: "How far in advance should I place an order?",
    answerText:
      "We recommend inquiring at least a few days ahead so we can confirm your delivery date and window. Every bouquet is made to order, and we respond within 24 hours.",
  },
  {
    id: "same-day",
    question: "Do you offer same-day balloon delivery in Los Angeles?",
    answerText:
      "Availability depends on your date and delivery window. Share your preferred delivery time when you inquire, and we will confirm what is possible for your celebration.",
  },
  {
    id: "difference",
    question: "What makes Balloons by H different from other balloon shops?",
    answerText:
      "Balloons by H is a Beverly Hills atelier focused on quiet luxury — refined color stories, premium craftsmanship, and white-glove local delivery rather than mass-produced party decor.",
  },
];

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: BRAND.name,
    description:
      "Luxury handcrafted balloon bouquets and balloon delivery in Beverly Hills, Bel Air, Brentwood, West Hollywood, and Santa Monica.",
    url: SITE_URL,
    email: BRAND.email,
    image: canonicalUrl("/images/bouquets/sunset-rose.png"),
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: LOCAL_SEO.primaryCity,
      addressRegion: LOCAL_SEO.region,
      addressCountry: LOCAL_SEO.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: LOCAL_SEO.geo.latitude,
      longitude: LOCAL_SEO.geo.longitude,
    },
    areaServed: DELIVERY_AREAS.map((city) => ({
      "@type": "City",
      name: `${city}, ${LOCAL_SEO.region}`,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "18:00",
      },
    ],
    sameAs: [BRAND.instagram],
    knowsAbout: [
      "Luxury balloon delivery",
      "Balloon bouquets",
      "Beverly Hills celebrations",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: COLLECTION.name,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: COLLECTION.name,
            description: COLLECTION.description,
          },
        },
      ],
    },
  };
}

export function getFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answerText,
      },
    })),
  };
}
