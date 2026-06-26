import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeader } from "@/components/SectionHeader";
import { BRAND, canonicalUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Inquire with ${BRAND.name}.`,
  alternates: {
    canonical: canonicalUrl("/contact"),
  },
};

export default function ContactPage() {
  return (
    <div className="bg-blush-light pt-16 md:pt-[4.5rem]">
      <section className="border-b border-champagne/15 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeader
            title="Contact"
            description="Share your vision. We respond within twenty-four hours."
          />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-5 md:px-8 lg:gap-16">
          <div className="md:col-span-2">
            <div className="space-y-8 font-body text-sm text-charcoal-soft">
              <div>
                <p className="text-[0.65rem] uppercase tracking-luxury text-champagne">
                  Email
                </p>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="mt-2 block text-charcoal transition-colors hover:text-champagne-dark"
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
                  className="mt-2 block text-charcoal transition-colors hover:text-champagne-dark"
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
              <p className="border-t border-champagne/20 pt-6 text-xs italic leading-relaxed">
                Every inquiry is handled personally.
              </p>
            </div>
          </div>

          <div className="md:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
