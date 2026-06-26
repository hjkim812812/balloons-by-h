import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookButton } from "@/components/BookButton";
import { BouquetCard } from "@/components/BouquetCard";
import { InstagramGallery } from "@/components/InstagramGallery";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Testimonials } from "@/components/Testimonials";
import { TrustSection } from "@/components/TrustSection";
import { EditorialLink, SectionHeader } from "@/components/SectionHeader";
import {
  BOUQUETS,
  BOUQUET_PHOTOS,
  BRAND,
  DELIVERY_AREAS,
} from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

const FEATURED = [
  "sunset-rose",
  "french-blush",
  "golden-buttercream",
  "welcome-baby",
  "rose-champagne",
  "black-tie",
].map((slug) => BOUQUETS.find((b) => b.slug === slug)!);

export const metadata: Metadata = createPageMetadata({
  title: "Luxury Balloon Delivery | Balloons by H | Beverly Hills",
  description:
    "Luxury handcrafted balloon bouquets delivered throughout Beverly Hills, Bel Air, Brentwood, Santa Monica and Los Angeles.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* Editorial Hero */}
      <section className="relative min-h-[92svh] overflow-hidden bg-charcoal sm:min-h-[94svh]">
        <Image
          src={BOUQUET_PHOTOS["sunset-rose"]}
          alt="Sunset Rose — Balloons by H"
          fill
          priority
          fetchPriority="high"
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-charcoal/10 to-charcoal/50" />
        <div className="absolute inset-x-0 top-24 hidden justify-between px-8 md:flex md:px-12 lg:px-16">
          <p className="font-body text-[0.6rem] uppercase tracking-[0.32em] text-ivory/50">
            Issue No. 01
          </p>
          <p className="font-body text-[0.6rem] uppercase tracking-[0.32em] text-ivory/50">
            Beverly Hills · 2026
          </p>
        </div>
        <div className="relative mx-auto flex min-h-[92svh] max-w-6xl flex-col justify-end px-5 pb-14 pt-28 sm:min-h-[94svh] sm:px-6 sm:pb-16 md:px-8 md:pb-24 md:pt-32">
          <p className="animate-fade-up text-[0.65rem] uppercase tracking-[0.28em] text-ivory/85 opacity-0">
            {BRAND.location}
          </p>
          <h1 className="animate-fade-up font-display text-[clamp(2.5rem,9vw,5.5rem)] leading-[1.02] tracking-wide text-ivory opacity-0 [animation-delay:0.12s]">
            {BRAND.name}
          </h1>
          <p className="animate-fade-up mt-4 max-w-md font-display text-lg italic text-ivory/90 opacity-0 [animation-delay:0.24s] md:text-2xl">
            {BRAND.tagline}
          </p>
          <p className="animate-fade-up mt-3 max-w-lg font-body text-[0.72rem] uppercase tracking-[0.16em] text-ivory/70 opacity-0 [animation-delay:0.3s] md:text-[0.75rem] md:tracking-[0.18em]">
            Luxury Balloon Delivery in Beverly Hills &amp; Los Angeles.
          </p>
          <div className="animate-fade-up mt-10 flex flex-col gap-3 opacity-0 [animation-delay:0.36s] sm:flex-row sm:gap-4">
            <Link href="/collections" className="btn-luxury-primary">
              View Collection
            </Link>
            <Link href="/contact" className="btn-luxury-outline">
              Inquire
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial statement */}
      <section className="border-b border-champagne/15 bg-white py-20 sm:py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-8">
          <ScrollReveal>
            <div className="grid gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
              <div className="md:col-span-4">
                <p className="text-[0.65rem] uppercase tracking-luxury text-champagne">
                  The Edit
                </p>
              </div>
              <div className="md:col-span-8">
                <p className="font-display text-balance text-[clamp(1.5rem,4vw,2.25rem)] leading-snug text-charcoal md:text-4xl md:leading-snug">
                  Balloons, reimagined as objets d&apos;art — for moments
                  that ask for restraint, beauty, and quiet drama.
                </p>
                <p className="mt-6 max-w-lg font-body text-sm leading-relaxed text-charcoal-soft md:text-base">
                  Based in Beverly Hills. Hand-finished. Delivered with care.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured — one card per brand photo */}
      <section className="border-t border-champagne/15 bg-white py-20 sm:py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-8">
          <ScrollReveal>
            <SectionHeader
              title="Color Stories"
              description="Each palette, its own quiet narrative."
              className="mb-12 md:mb-16"
            />
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
            {FEATURED.map((bouquet, i) => (
              <BouquetCard key={bouquet.slug} bouquet={bouquet} index={i} />
            ))}
          </div>
          <ScrollReveal className="mt-14 text-center md:mt-16">
            <Link
              href="/collections/signature-balloon-bouquet-collection"
              className="inline-flex min-h-[44px] items-center font-body text-[0.68rem] uppercase tracking-luxury text-charcoal transition-colors hover:text-champagne-dark"
            >
              View the Collection
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Testimonials />

      {/* Philosophy — Black Tie */}
      <section className="relative min-h-[420px] overflow-hidden py-24 md:min-h-[480px] md:py-32">
        <Image
          src={BOUQUET_PHOTOS["black-tie"]}
          alt="Black Tie Signature Balloon Bouquet"
          fill
          loading="lazy"
          quality={85}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal/55" />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-6 md:px-8">
          <ScrollReveal>
            <blockquote className="text-center font-display text-balance text-[clamp(1.375rem,4vw,2.25rem)] italic leading-relaxed text-ivory md:text-4xl">
              &ldquo;Luxury is not loud. It is the detail you notice when
              everything else falls away.&rdquo;
            </blockquote>
            <p className="mt-8 text-center font-body text-sm text-ivory/60">
              — Balloons by H
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Delivery */}
      <section className="bg-blush-light py-20 sm:py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-6 md:px-8">
          <ScrollReveal>
            <SectionHeader
              title="Delivery"
              align="center"
              className="mx-auto"
            />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {DELIVERY_AREAS.map((area) => (
                <span
                  key={area}
                  className="border border-champagne/25 bg-ivory px-5 py-3 font-body text-[0.65rem] uppercase tracking-wide text-charcoal-soft"
                >
                  {area}
                </span>
              ))}
            </div>
            <div className="mt-10">
              <EditorialLink href="/delivery">Delivery</EditorialLink>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <TrustSection />

      {/* CTA */}
      <section className="border-t border-champagne/15 bg-ivory py-20 sm:py-24 md:py-28">
        <div className="mx-auto max-w-2xl px-5 text-center sm:px-6 md:px-8">
          <ScrollReveal>
            <h2 className="font-display text-3xl text-charcoal md:text-4xl">
              Inquire
            </h2>
            <p className="mt-4 font-body text-sm leading-relaxed text-charcoal-soft md:text-base">
              We respond personally.
            </p>
            <p className="mx-auto mt-3 max-w-md font-body text-sm leading-relaxed text-charcoal-muted md:text-base">
              Every bouquet is made to order. We&apos;ll respond within 24 hours.
            </p>
            <div className="mt-10 flex justify-center">
              <BookButton
                bouquetName="Signature Balloon Bouquet"
                slug="signature-balloon-bouquet-collection"
                variant="primary"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <InstagramGallery />
    </>
  );
}
