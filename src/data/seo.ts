import {
  BRAND,
  COLLECTION,
  DELIVERY_AREAS,
  SITE_URL,
  canonicalUrl,
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
    id: "why-balloons-by-h",
    question: "Why Balloons by H?",
    answerText:
      "Every arrangement is thoughtfully designed with premium materials, refined color palettes, and meticulous attention to detail, inspired by the elegance of quiet luxury.",
  },
  {
    id: "delivery",
    question: "Do you deliver?",
    answerText:
      "Yes. We deliver throughout Beverly Hills, Bel Air, Brentwood, West Hollywood, Santa Monica, and surrounding Los Angeles areas.",
  },
  {
    id: "ordering",
    question: "How far in advance should I place my order?",
    answerText:
      "We recommend ordering at least 3–7 days in advance. If your preferred date is available, we'll always do our best to accommodate last-minute requests.",
  },
  {
    id: "customization",
    question: "Can I customize the colors and message?",
    answerText:
      "Absolutely. Every design can be customized to match your celebration, color palette, and personal style.",
  },
  {
    id: "same-day",
    question: "Do you offer same-day delivery?",
    answerText:
      "Depending on availability, same-day delivery may be possible. Please contact us for more information.",
  },
  {
    id: "longevity",
    question: "How long do the balloons last?",
    answerText:
      "Our premium balloon arrangements are designed to stay beautiful for days. Longevity may vary depending on temperature and handling.",
  },
  {
    id: "delivery-only",
    question: "Do you offer delivery only?",
    answerText:
      "Yes. We currently specialize in local delivery to ensure every arrangement arrives beautifully presented.",
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
    image: canonicalUrl("/images/bouquets/raspberry-rose.png"),
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
