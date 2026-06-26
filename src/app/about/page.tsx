import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ABOUT_SEO } from "@/data/page-seo";
import { BOUQUET_PHOTOS, COLLECTION } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: ABOUT_SEO.title,
  description: ABOUT_SEO.description,
  path: "/about",
  keywords: [...ABOUT_SEO.keywords],
  absoluteTitle: true,
});

export default function AboutPage() {
  return (
    <div className="bg-ivory pt-16 md:pt-[4.5rem]">
      <section className="border-b border-champagne/15 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-8">
          <ScrollReveal>
            <SectionHeader
              title="About"
              description="Inspired by quiet luxury. Designed for unforgettable celebrations."
            />
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <ScrollReveal>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={BOUQUET_PHOTOS["sunset-rose"]}
                  alt="Luxury balloon bouquet by Balloons by H — Beverly Hills balloon delivery"
                  fill
                  loading="lazy"
                  quality={85}
                  className="object-cover transition-transform duration-700 ease-luxury hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="space-y-8 lg:py-4">
                <p className="font-display text-balance text-[clamp(1.25rem,2.8vw,1.75rem)] leading-[1.65] tracking-[0.01em] text-charcoal md:text-[1.875rem] md:leading-[1.6]">
                  At Balloons by H, we create refined balloon designs with
                  timeless elegance, premium craftsmanship, and meticulous
                  attention to detail.
                </p>
                <p className="max-w-md font-display text-[clamp(1.125rem,2.4vw,1.5rem)] italic leading-[1.7] text-charcoal-soft md:text-2xl md:leading-relaxed">
                  Every piece is thoughtfully designed to feel elevated,
                  intentional, and memorable.
                </p>
                <p className="font-body text-sm leading-relaxed text-charcoal-soft md:text-base">
                  Based in Beverly Hills, we serve the Westside with{" "}
                  <Link
                    href="/delivery"
                    className="text-charcoal underline-offset-4 transition-colors hover:text-champagne-dark hover:underline"
                  >
                    local balloon delivery
                  </Link>
                  . Explore the{" "}
                  <Link
                    href={`/collections/${COLLECTION.slug}`}
                    className="text-charcoal underline-offset-4 transition-colors hover:text-champagne-dark hover:underline"
                  >
                    {COLLECTION.name}
                  </Link>{" "}
                  or{" "}
                  <Link
                    href="/contact"
                    className="text-charcoal underline-offset-4 transition-colors hover:text-champagne-dark hover:underline"
                  >
                    inquire
                  </Link>{" "}
                  for your celebration.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
