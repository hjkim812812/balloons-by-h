import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { COLLECTIONS_SEO } from "@/data/page-seo";
import { BOUQUET_PHOTOS, COLLECTION } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: COLLECTIONS_SEO.title,
  description: COLLECTIONS_SEO.description,
  path: "/collections",
  keywords: [...COLLECTIONS_SEO.keywords],
  absoluteTitle: true,
});

export default function CollectionsPage() {
  return (
    <div className="bg-ivory pt-16 md:pt-[4.5rem]">
      <section className="border-b border-champagne/15 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-8">
          <ScrollReveal>
            <SectionHeader title="Collections" />
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-8">
          <ScrollReveal>
            <Link
              href={`/collections/${COLLECTION.slug}`}
              className="group grid overflow-hidden border border-champagne/15 bg-white md:grid-cols-2"
            >
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px]">
                <Image
                  src={BOUQUET_PHOTOS["sunset-rose"]}
                  alt={COLLECTION.name}
                  fill
                  loading="lazy"
                  quality={85}
                  className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-14">
                <h2 className="font-display text-2xl text-charcoal md:text-3xl">
                  {COLLECTION.name}
                </h2>
                <span className="mt-8 inline-flex items-center gap-3 font-body text-[0.68rem] uppercase tracking-luxury text-charcoal transition-colors group-hover:text-champagne-dark">
                  View Collection
                  <span className="block h-px w-8 bg-charcoal/30 transition-all duration-500 group-hover:w-12 group-hover:bg-champagne" />
                </span>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
