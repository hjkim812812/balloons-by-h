import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BouquetCard } from "@/components/BouquetCard";
import { BookButton } from "@/components/BookButton";
import { SectionHeader } from "@/components/SectionHeader";
import { BOUQUETS, BOUQUET_PRICE, COLLECTION, formatPrice } from "@/data/site";

type Props = {
  params: Promise<{ collection: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection } = await params;
  if (collection !== COLLECTION.slug) {
    return { title: "Collection Not Found" };
  }
  return {
    title: COLLECTION.name,
    description: COLLECTION.description,
  };
}

export default async function CollectionDetailPage({ params }: Props) {
  const { collection } = await params;

  if (collection !== COLLECTION.slug) {
    notFound();
  }

  return (
    <div className="bg-ivory pt-16 md:pt-[4.5rem]">
      <section className="border-b border-champagne/15 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeader
            title={COLLECTION.name}
            description={COLLECTION.description}
          />
          <p className="mt-6 font-body text-sm text-charcoal-soft">
            {formatPrice(BOUQUET_PRICE)}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
            {BOUQUETS.map((bouquet, i) => (
              <BouquetCard key={bouquet.slug} bouquet={bouquet} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-champagne/15 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-5 text-center md:px-8">
          <p className="font-display text-2xl text-charcoal md:text-3xl">
            Inquire
          </p>
          <p className="mt-4 font-body text-sm text-charcoal-soft">
            We respond personally.
          </p>
          <div className="mt-8 flex justify-center">
            <BookButton
              bouquetName={COLLECTION.name}
              slug={COLLECTION.slug}
              variant="primary"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
