import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { BRAND, BOUQUET_PHOTOS } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `${BRAND.name} — a Beverly Hills atelier for timeless celebrations.`,
};

export default function AboutPage() {
  return (
    <div className="bg-ivory pt-16 md:pt-[4.5rem]">
      <section className="border-b border-champagne/15 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeader
            title="About"
            description="Celebration, considered."
          />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={BOUQUET_PHOTOS["sunset-rose"]}
                alt="Balloons by H signature balloon bouquet"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-6 font-body text-sm leading-relaxed text-charcoal-soft md:text-base">
              <p className="font-display text-2xl leading-snug text-charcoal md:text-3xl">
                Balloons deserve the same intention as every other detail
                of a beautiful event.
              </p>
              <p>
                Based in Beverly Hills, we work in restraint — the perfect
                shade of blush, the quiet drama of scale, the ribbon tied just so.
              </p>
              <p>
                An atelier for balloon design. Birthdays, weddings, private
                gatherings — each piece, considered.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-champagne/15 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <h2 className="font-display text-3xl text-charcoal">
            Our Approach
          </h2>
          <div className="mt-12 space-y-10 text-left">
            {[
              {
                title: "Curation",
                text: "Every color, proportion, and finish — considered.",
              },
              {
                title: "Craft",
                text: "Hand-finished. Never mass-produced.",
              },
              {
                title: "Service",
                text: "Personal, from inquiry to doorstep.",
              },
            ].map((item) => (
              <div key={item.title} className="border-b border-champagne/15 pb-8">
                <h3 className="font-display text-xl text-charcoal">{item.title}</h3>
                <p className="mt-2 font-body text-sm text-charcoal-soft">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
