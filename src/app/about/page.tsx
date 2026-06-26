import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BOUQUET_PHOTOS } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Inspired by quiet luxury. Balloons by H creates refined balloon designs with timeless elegance, premium craftsmanship, and meticulous attention to detail.",
  path: "/about",
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
                  alt="Balloons by H signature balloon bouquet"
                  fill
                  loading="lazy"
                  quality={85}
                  className="object-cover transition-transform duration-700 ease-luxury hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="space-y-6 font-body text-sm leading-relaxed text-charcoal-soft md:text-base">
                <p>
                  At Balloons by H, we create refined balloon designs with
                  timeless elegance, premium craftsmanship, and meticulous
                  attention to detail.
                </p>
                <p>
                  Every piece is thoughtfully designed to feel elevated,
                  intentional, and memorable.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
