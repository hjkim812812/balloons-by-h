import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BouquetCard } from "@/components/BouquetCard";
import { BookButton } from "@/components/BookButton";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { BOUQUETS, BOUQUET_PRICE, COLLECTION, formatPrice } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ collection: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection } = await params;
  if (collection !== COLLECTION.slug) {
    return { title: "Collection Not Found" };
  }
  return createPageMetadata({
    title: COLLECTION.name,
    description: `${COLLECTION.description} Luxury balloon bouquets from $${BOUQUET_PRICE}, hand-delivered across Beverly Hills and Los Angeles.`,
    path: `/collections/${COLLECTION.slug}`,
  });
}

export default async function CollectionDetailPage({ params }: Props) {
  const { collection } = await params;

  if (collection !== COLLECTION.slug) {
    notFound();
  }

  return (
    <div className="bg-ivory pt-16 md:pt-[4.5rem]">
      <section className="border-b border-champagne/15 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-8">
          <ScrollReveal>
            <SectionHeader
              title={COLLECTION.name}
              description={COLLECTION.description}
            />
            <p className="mt-6 font-body text-sm tracking-wide text-charcoal">
              Starting at {formatPrice(BOUQUET_PRICE)}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
            {BOUQUETS.map((bouquet, i) => (
              <BouquetCard key={bouquet.slug} bouquet={bouquet} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-champagne/15 bg-white py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-2xl px-5 text-center sm:px-6 md:px-8">
          <ScrollReveal>
            <p className="font-display text-2xl text-charcoal md:text-3xl">
              Inquire
            </p>
            <p className="mt-4 font-body text-sm text-charcoal-soft">
              We respond personally.
            </p>
            <p className="mx-auto mt-3 max-w-md font-body text-sm text-charcoal-muted">
              Every bouquet is made to order. We&apos;ll respond within 24 hours.
            </p>
            <div className="mt-8 flex justify-center">
              <BookButton
                bouquetName={COLLECTION.name}
                slug={COLLECTION.slug}
                variant="primary"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
