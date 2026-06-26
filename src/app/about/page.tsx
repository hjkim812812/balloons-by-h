import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ABOUT_SEO } from "@/data/page-seo";
import { BOUQUET_PHOTOS } from "@/data/site";
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
            <SectionHeader title="About" />
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
              <div className="space-y-10 lg:py-4">
                <p className="font-display text-balance text-[clamp(1.375rem,3vw,2rem)] leading-snug text-charcoal md:text-3xl md:leading-snug">
                  Inspired by quiet luxury. Designed for unforgettable
                  celebrations.
                </p>
                <div className="space-y-6 font-body">
                  <p className="text-sm leading-[1.75] text-charcoal md:text-base">
                    At Balloons by H, we create refined balloon designs with
                    timeless elegance, premium craftsmanship, and meticulous
                    attention to detail.
                  </p>
                  <p className="max-w-md text-sm italic leading-[1.75] text-charcoal-soft md:text-base">
                    Every piece is thoughtfully designed to feel elevated,
                    intentional, and memorable.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
