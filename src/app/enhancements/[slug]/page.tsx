import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductAddToCart } from "@/components/ProductAddToCart";
import { ProductGallery } from "@/components/ProductGallery";
import {
  ENHANCEMENTS,
  getEnhancementBySlug,
  getEnhancementImages,
} from "@/data/enhancements";
import { formatPrice } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return ENHANCEMENTS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const enhancement = getEnhancementBySlug(slug);
  if (!enhancement) return { title: "Enhancement Not Found | Balloons by H" };

  const description =
    enhancement.description?.replace(/\n\n/g, " ") ??
    `Inquire about ${enhancement.name} — luxury balloon enhancements by Balloons by H in Beverly Hills.`;

  return createPageMetadata({
    title: `${enhancement.name} | Balloons by H`,
    description,
    path: `/enhancements/${slug}`,
    image: enhancement.detailImage ?? enhancement.image,
    absoluteTitle: true,
  });
}

export default async function EnhancementDetailPage({ params }: Props) {
  const { slug } = await params;
  const enhancement = getEnhancementBySlug(slug);
  if (!enhancement) {
    notFound();
  }

  const currentIndex = ENHANCEMENTS.findIndex((item) => item.slug === slug);
  const prev = ENHANCEMENTS[currentIndex - 1];
  const next = ENHANCEMENTS[currentIndex + 1];
  const images = getEnhancementImages(enhancement);

  return (
    <div className="bg-ivory pt-16 md:pt-[4.5rem]">
      <section className="py-16 md:py-28">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <nav className="mb-14 font-body text-[0.65rem] uppercase tracking-luxury text-charcoal-muted">
            <Link href="/enhancements" className="transition-colors hover:text-charcoal">
              Enhancements
            </Link>
            <span className="mx-3 opacity-40">/</span>
            <span className="text-charcoal">{enhancement.name}</span>
          </nav>

          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
            {images.length > 0 ? (
              <ProductGallery images={images} name={enhancement.name} />
            ) : (
              <div className="flex aspect-[3/4] items-center justify-center border border-champagne/15 bg-ivory-deep p-8 text-center">
                <p className="font-display text-3xl text-charcoal">{enhancement.name}</p>
              </div>
            )}

            <div className="flex flex-col justify-center py-4 lg:py-12">
              <h1 className="font-display text-3xl text-charcoal md:text-5xl lg:text-[3.25rem] lg:leading-tight">
                {enhancement.name}
              </h1>
              {enhancement.description && (
                <div className="mt-8 max-w-md space-y-4">
                  {enhancement.description.split("\n\n").map((paragraph) => (
                    <p
                      key={paragraph}
                      className="font-body text-base leading-relaxed text-charcoal-soft md:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
              {enhancement.price !== undefined && (
                <p className="mt-6 font-body text-lg tracking-wide text-charcoal md:text-xl">
                  {formatPrice(enhancement.price)}
                </p>
              )}

              <div className="mt-10 max-w-sm">
                <ProductAddToCart
                  item={{
                    id: `enhancement-${enhancement.slug}`,
                    name: enhancement.name,
                    price: enhancement.price ?? 0,
                    slug: enhancement.slug,
                    productType: "enhancement",
                    href: `/enhancements/${enhancement.slug}`,
                  }}
                  fullWidth
                  disabled={enhancement.price === undefined}
                />
              </div>
            </div>
          </div>

          <div className="mt-20 flex items-center justify-between border-t border-champagne/15 pt-10">
            {prev ? (
              <Link
                href={`/enhancements/${prev.slug}`}
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
                href={`/enhancements/${next.slug}`}
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
