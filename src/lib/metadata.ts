import type { Metadata } from "next";
import { BRAND, BOUQUET_PHOTOS, canonicalUrl } from "@/data/site";

const DEFAULT_OG_IMAGE = BOUQUET_PHOTOS["raspberry-rose"];

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  absoluteTitle?: boolean;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  keywords,
  absoluteTitle = false,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = canonicalUrl(path);
  const ogImage = image.startsWith("http") ? image : canonicalUrl(image);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
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
          alt: `${title} — ${BRAND.name}`,
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
