import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookButton } from "@/components/BookButton";
import { JsonLd } from "@/components/JsonLd";
import { ProductGallery } from "@/components/ProductGallery";
import { getBouquetSeo, getProductJsonLd } from "@/data/page-seo";
import {
  BOUQUETS,
  COLLECTION,
  getBouquetBySlug,
  getBouquetImages,
} from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ collection: string; slug: string }>;
};

export async function generateStaticParams() {
  return BOUQUETS.map((bouquet) => ({
    collection: COLLECTION.slug,
    slug: bouquet.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const bouquet = getBouquetBySlug(slug);
  if (!bouquet) return { title: "Bouquet Not Found | Balloons by H" };
  const seo = getBouquetSeo(bouquet);
  return createPageMetadata({
    title: seo.title,
    description: seo.description,
    path: `/collections/${COLLECTION.slug}/${slug}`,
    image: bouquet.image,
    keywords: seo.keywords,
    absoluteTitle: true,
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const { collection, slug } = await params;

  if (collection !== COLLECTION.slug) {
    notFound();
  }

  const bouquet = getBouquetBySlug(slug);
  if (!bouquet) {
    notFound();
  }

  const currentIndex = BOUQUETS.findIndex((b) => b.slug === slug);
  const prev = BOUQUETS[currentIndex - 1];
  const next = BOUQUETS[currentIndex + 1];

  return (
    <div className="bg-ivory pt-16 md:pt-[4.5rem]">
      <JsonLd data={getProductJsonLd(bouquet)} />
      <section className="py-16 md:py-28">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <nav className="mb-14 font-body text-[0.65rem] uppercase tracking-luxury text-charcoal-muted">
            <Link href="/collections" className="transition-colors hover:text-charcoal">
              Collections
            </Link>
            <span className="mx-3 opacity-40">/</span>
            <Link
              href={`/collections/${COLLECTION.slug}`}
              className="transition-colors hover:text-charcoal"
            >
              {COLLECTION.name}
            </Link>
            <span className="mx-3 opacity-40">/</span>
            <span className="text-charcoal">{bouquet.name}</span>
          </nav>

          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
            {/* Product visual */}
            <ProductGallery
              images={getBouquetImages(bouquet)}
              name={bouquet.name}
            />

            {/* Product info */}
            <div className="flex flex-col justify-center py-4 lg:py-12">
              <h1 className="font-display text-3xl text-charcoal md:text-5xl lg:text-[3.25rem] lg:leading-tight">
                {bouquet.name}
              </h1>
              <p className="mt-8 max-w-md font-body text-base leading-relaxed text-charcoal-soft md:text-lg">
                {bouquet.mood}
              </p>

              <div className="mt-14 max-w-sm">
                <BookButton
                  bouquetName={bouquet.name}
                  slug={bouquet.slug}
                  variant="primary"
                  fullWidth
                />
              </div>
            </div>
          </div>

          {/* Prev / Next */}
          <div className="mt-20 flex items-center justify-between border-t border-champagne/15 pt-10">
            {prev ? (
              <Link
                href={`/collections/${COLLECTION.slug}/${prev.slug}`}
                className="group font-body text-[0.68rem] uppercase tracking-luxury text-charcoal-soft transition-colors hover:text-charcoal"
              >
                <span className="block text-[0.6rem] opacity-50">Previous</span>
                {prev.name}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/collections/${COLLECTION.slug}/${next.slug}`}
                className="group text-right font-body text-[0.68rem] uppercase tracking-luxury text-charcoal-soft transition-colors hover:text-charcoal"
              >
                <span className="block text-[0.6rem] opacity-50">Next</span>
                {next.name}
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
