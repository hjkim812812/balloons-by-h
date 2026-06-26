import type { Metadata } from "next";
import Link from "next/link";
import { DeliveryMap } from "@/components/DeliveryMap";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Delivery",
  description: "Delivery across Westside Los Angeles — Beverly Hills, Bel Air, Brentwood, West Hollywood, and Santa Monica.",
};

export default function DeliveryPage() {
  return (
    <div className="bg-ivory pt-16 md:pt-[4.5rem]">
      <section className="border-b border-champagne/15 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeader
            title="Delivery"
            description="Hand-delivered. Never shipped. Never unattended."
          />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <DeliveryMap />

          <div className="mx-auto mt-16 max-w-2xl grid gap-10 border-t border-champagne/15 pt-16 md:grid-cols-2 md:gap-12">
            <div>
              <h3 className="font-display text-xl text-charcoal">Scheduled</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-charcoal-soft">
                Choose your date and delivery window. We coordinate directly with you.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl text-charcoal">Installations</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-charcoal-soft">
                For larger work, inquire through contact.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center md:mt-20">
            <p className="font-body text-[0.65rem] uppercase tracking-luxury text-charcoal-muted">
              Outside our regular delivery area? Please inquire.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center border border-champagne bg-champagne px-8 py-3.5 font-body text-[0.68rem] uppercase tracking-luxury text-ivory transition-all duration-500 hover:bg-champagne-dark"
            >
              Inquire
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
