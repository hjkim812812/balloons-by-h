import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { COLLECTION, BOUQUET_PHOTOS } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Luxury Balloon Collections",
  description:
    "Explore luxury balloon bouquets by Balloons by H — the Signature Collection, handcrafted and delivered across Beverly Hills and Westside Los Angeles.",
  path: "/collections",
  keywords: ["luxury balloon bouquets Beverly Hills", "balloon collection Los Angeles"],
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
              href="/collections/signature-balloon-bouquet-collection"
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
                <p className="text-[0.65rem] uppercase tracking-luxury text-champagne">
                  Signature
                </p>
                <h2 className="mt-3 font-display text-2xl text-charcoal md:text-3xl">
                  {COLLECTION.name}
                </h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-charcoal-soft">
                {COLLECTION.shortDescription}{" "}
                <Link
                  href="/delivery"
                  className="text-charcoal underline-offset-4 transition-colors hover:text-champagne-dark hover:underline"
                >
                  Beverly Hills delivery
                </Link>{" "}
                available across the Westside.
              </p>
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
