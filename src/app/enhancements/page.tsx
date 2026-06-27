import type { Metadata } from "next";
import Link from "next/link";
import { BookButton } from "@/components/BookButton";
import { EnhancementCard } from "@/components/EnhancementCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { ENHANCEMENTS } from "@/data/enhancements";
import { ENHANCEMENTS_SEO } from "@/data/page-seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: ENHANCEMENTS_SEO.title,
  description: ENHANCEMENTS_SEO.description,
  path: "/enhancements",
  keywords: [...ENHANCEMENTS_SEO.keywords],
  absoluteTitle: true,
});

export default function EnhancementsPage() {
  return (
    <div className="bg-ivory pt-16 md:pt-[4.5rem]">
      <section className="border-b border-champagne/15 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-8">
          <ScrollReveal>
            <SectionHeader title="Enhancements" />
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:gap-8">
            {ENHANCEMENTS.map((enhancement, i) => (
              <EnhancementCard key={enhancement.slug} enhancement={enhancement} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-champagne/15 bg-white py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-2xl px-5 text-center sm:px-6 md:px-8">
          <ScrollReveal>
            <p className="font-display text-2xl text-charcoal md:text-3xl">Inquire</p>
            <p className="mt-4 font-body text-sm text-charcoal-soft">
              Add enhancements to your order or inquire for details.
            </p>
            <div className="mt-8 flex justify-center">
              <BookButton bouquetName="Enhancements" slug="enhancements" variant="primary" />
            </div>
            <Link
              href="/collections"
              className="mt-8 inline-block font-body text-[0.68rem] uppercase tracking-luxury text-charcoal-soft transition-colors hover:text-charcoal"
            >
              View Collections
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
