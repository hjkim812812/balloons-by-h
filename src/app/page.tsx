import type { Metadata } from "next";

import Link from "next/link";

import Image from "next/image";

import { BookButton } from "@/components/BookButton";

import { BouquetCard } from "@/components/BouquetCard";

import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";

import { ScrollReveal } from "@/components/ScrollReveal";

import { Testimonials } from "@/components/Testimonials";

import { SectionHeader } from "@/components/SectionHeader";

import {

  BOUQUETS,

  BOUQUET_PHOTOS,

  BRAND,

  DELIVERY_AREAS,

} from "@/data/site";

import { createPageMetadata } from "@/lib/metadata";
import { HOME_SEO } from "@/data/page-seo";
import { getFaqJsonLd } from "@/data/seo";
import { COLLECTION } from "@/data/site";



const FEATURED = [

  "sunset-rose",

  "french-blush",

  "golden-buttercream",

  "welcome-baby",

  "the-hotel",

  "black-tie",

].map((slug) => BOUQUETS.find((b) => b.slug === slug)!);



export const metadata: Metadata = createPageMetadata({
  title: HOME_SEO.title,
  description: HOME_SEO.description,
  path: "/",
  keywords: [...HOME_SEO.keywords],
  absoluteTitle: true,
});



export default function HomePage() {

  return (

    <>

      <JsonLd data={getFaqJsonLd()} />

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

          <div className="animate-fade-up mt-10 opacity-0 [animation-delay:0.36s]">

            <Link href="/collections" className="btn-luxury-primary">

              View Collection

            </Link>

          </div>

        </div>

      </section>



      {/* Editorial statement */}

      <section className="border-b border-champagne/15 bg-ivory py-20 sm:py-24 md:py-32">

        <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-8">

          <ScrollReveal>

            <div className="grid gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">

              <div className="md:col-span-4">

                <p className="text-[0.65rem] uppercase tracking-luxury text-champagne">

                  The Edit

                </p>

              </div>

              <div className="md:col-span-8">

                <p className="font-display text-balance text-[clamp(1.375rem,3.5vw,2rem)] leading-snug text-charcoal md:text-3xl md:leading-snug">

                  Balloons, reimagined as objets d&apos;art — for moments

                  that ask for restraint, beauty, and quiet drama.

                </p>

              </div>

            </div>

          </ScrollReveal>

        </div>

      </section>



      {/* Featured — one card per brand photo */}

      <section className="border-t border-champagne/15 bg-ivory py-20 sm:py-24 md:py-28">

        <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-8">

          <ScrollReveal>

            <SectionHeader
              title="Our Collections"
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
              href={`/collections/${COLLECTION.slug}`}
              className="btn-luxury-primary"
            >
              View the Collection
            </Link>

          </ScrollReveal>

        </div>

      </section>



      <Testimonials />

      {/* Delivery */}

      <section className="bg-ivory py-20 sm:py-24 md:py-28">

        <div className="mx-auto max-w-6xl px-5 text-center sm:px-6 md:px-8">

          <ScrollReveal>

            <SectionHeader

              title="Delivery"

              align="center"

              className="mx-auto"

            />

          </ScrollReveal>

          <ScrollReveal delay={80}>

            <p className="mx-auto mt-8 max-w-xl font-body text-sm leading-relaxed text-charcoal-soft md:text-base">
              Luxury balloon delivery from our Beverly Hills atelier.
            </p>

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
              <Link href="/delivery" className="btn-luxury-primary">
                Delivery
              </Link>
            </div>

          </ScrollReveal>

        </div>

      </section>



      <FaqSection />

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

                bouquetName={COLLECTION.name}

                slug={COLLECTION.slug}

                variant="primary"

              />

            </div>

          </ScrollReveal>

        </div>

      </section>

    </>

  );

}

