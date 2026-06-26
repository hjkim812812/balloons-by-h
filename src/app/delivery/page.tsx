import type { Metadata } from "next";

import Link from "next/link";

import { DeliveryMap } from "@/components/DeliveryMap";

import { ScrollReveal } from "@/components/ScrollReveal";

import { SectionHeader } from "@/components/SectionHeader";

import { createPageMetadata } from "@/lib/metadata";



export const metadata: Metadata = createPageMetadata({

  title: "Delivery",

  description:

    "Luxury balloon delivery across Westside Los Angeles — Beverly Hills, Bel Air, Brentwood, West Hollywood, and Santa Monica. Hand-delivered with white-glove care.",

  path: "/delivery",

});



export default function DeliveryPage() {

  return (

    <div className="bg-ivory pt-16 md:pt-[4.5rem]">

      <section className="border-b border-champagne/15 py-16 sm:py-20 md:py-24">

        <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-8">

          <ScrollReveal>

            <SectionHeader

              title="Delivery"

              description="Delivered with care."

            />

          </ScrollReveal>

        </div>

      </section>



      <section className="py-16 sm:py-20 md:py-24">

        <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-8">

          <ScrollReveal>

            <DeliveryMap />

          </ScrollReveal>



          <ScrollReveal delay={80}>

            <div className="mt-16 text-center md:mt-20">

              <p className="font-body text-[0.65rem] uppercase tracking-luxury text-charcoal-muted">

                Outside our regular delivery area? Please inquire.

              </p>

              <Link href="/contact" className="btn-luxury-primary mt-6">

                Inquire

              </Link>

            </div>

          </ScrollReveal>

        </div>

      </section>

    </div>

  );

}

