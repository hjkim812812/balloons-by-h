import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";

import { ScrollReveal } from "@/components/ScrollReveal";

import { SectionHeader } from "@/components/SectionHeader";

import { BRAND } from "@/data/site";

import { createPageMetadata } from "@/lib/metadata";



export const metadata: Metadata = createPageMetadata({

  title: "Contact",

  description:

    "Inquire with Balloons by H for luxury balloon delivery in Beverly Hills and Los Angeles. Every bouquet is made to order — we respond within 24 hours.",

  path: "/contact",

});



export default function ContactPage() {

  return (

    <div className="bg-blush-light pt-16 md:pt-[4.5rem]">

      <section className="border-b border-champagne/15 py-16 sm:py-20 md:py-24">

        <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-8">

          <ScrollReveal>

            <SectionHeader

              title="Contact"

              description="Share your vision. We respond within twenty-four hours."

            />

          </ScrollReveal>

        </div>

      </section>



      <section className="py-16 sm:py-20 md:py-24">

        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 md:grid-cols-5 md:px-8 lg:gap-16">

          <ScrollReveal className="md:col-span-2">

            <div className="space-y-8 font-body text-sm text-charcoal-soft">

              <div>

                <p className="text-[0.65rem] uppercase tracking-luxury text-champagne">

                  Email

                </p>

                <a

                  href={`mailto:${BRAND.email}`}

                  className="mt-2 inline-flex min-h-[44px] items-center text-charcoal transition-colors hover:text-champagne-dark"

                >

                  {BRAND.email}

                </a>

              </div>

              <div>

                <p className="text-[0.65rem] uppercase tracking-luxury text-champagne">

                  Instagram

                </p>

                <a

                  href={BRAND.instagram}

                  target="_blank"

                  rel="noopener noreferrer"

                  className="mt-2 inline-flex min-h-[44px] items-center text-charcoal transition-colors hover:text-champagne-dark"

                >

                  @{BRAND.instagramHandle}

                </a>

              </div>

              <div>

                <p className="text-[0.65rem] uppercase tracking-luxury text-champagne">

                  Location

                </p>

                <p className="mt-2 text-charcoal">{BRAND.location}</p>

              </div>

            </div>

          </ScrollReveal>



          <ScrollReveal delay={100} className="md:col-span-3">

            <ContactForm />

          </ScrollReveal>

        </div>

      </section>

    </div>

  );

}

