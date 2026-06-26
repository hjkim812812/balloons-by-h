import type { Metadata } from "next";
import { BRAND, BOUQUET_PHOTOS, canonicalUrl } from "@/data/site";

const DEFAULT_OG_IMAGE = BOUQUET_PHOTOS["sunset-rose"];

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = canonicalUrl(path);
  const ogImage = image.startsWith("http") ? image : canonicalUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
    openGraph: {
      title,
      description,
      url,
      siteName: BRAND.name,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${BRAND.name} — luxury balloon bouquets`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
