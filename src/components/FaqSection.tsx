import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { FAQ_ITEMS, type FaqItem } from "@/data/seo";
import { COLLECTION } from "@/data/site";

function FaqAnswer({ item }: { item: FaqItem }) {
  switch (item.id) {
    case "beverly-hills-delivery":
      return (
        <p className="font-body text-sm leading-relaxed text-charcoal-soft md:text-base">
          Yes. Balloons by H provides luxury balloon delivery throughout{" "}
          <Link href="/delivery" className="text-charcoal underline-offset-4 transition-colors hover:text-champagne-dark hover:underline">
            Beverly Hills and the Westside
          </Link>
          , including Bel Air, Brentwood, West Hollywood, and Santa Monica.
        </p>
      );
    case "delivery-areas":
      return (
        <p className="font-body text-sm leading-relaxed text-charcoal-soft md:text-base">
          We deliver across the Westside of Los Angeles. View our full{" "}
          <Link href="/delivery" className="text-charcoal underline-offset-4 transition-colors hover:text-champagne-dark hover:underline">
            delivery map
          </Link>
          , or{" "}
          <Link href="/contact" className="text-charcoal underline-offset-4 transition-colors hover:text-champagne-dark hover:underline">
            inquire
          </Link>{" "}
          if your address is outside our regular area.
        </p>
      );
    case "pricing":
      return (
        <p className="font-body text-sm leading-relaxed text-charcoal-soft md:text-base">
          Our{" "}
          <Link
            href={`/collections/${COLLECTION.slug}`}
            className="text-charcoal underline-offset-4 transition-colors hover:text-champagne-dark hover:underline"
          >
            Signature Collection
          </Link>{" "}
          bouquets are thoughtfully priced for a luxury, made-to-order experience.
          Each color story shares one refined sculptural design, hand-finished and
          delivered with care.
        </p>
      );
    case "ordering":
      return (
        <p className="font-body text-sm leading-relaxed text-charcoal-soft md:text-base">
          We recommend inquiring a few days ahead so we can confirm your delivery
          date and window. Every bouquet is made to order —{" "}
          <Link href="/contact" className="text-charcoal underline-offset-4 transition-colors hover:text-champagne-dark hover:underline">
            send an inquiry
          </Link>{" "}
          and we will respond within 24 hours.
        </p>
      );
    default:
      return (
        <p className="font-body text-sm leading-relaxed text-charcoal-soft md:text-base">
          {item.answerText}
        </p>
      );
  }
}

export function FaqSection() {
  return (
    <section
      id="faq"
      className="border-t border-champagne/15 bg-white py-20 sm:py-24 md:py-28"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-6 md:px-8">
        <ScrollReveal>
          <SectionHeader
            eyebrow="FAQ"
            title="Questions"
            description="Balloon delivery in Beverly Hills and across the Westside."
            align="center"
            className="mx-auto"
          />
        </ScrollReveal>

        <div className="mt-12 divide-y divide-champagne/15 md:mt-16">
          {FAQ_ITEMS.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 40}>
              <details className="group py-6 md:py-7">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-lg leading-snug text-charcoal transition-colors marker:content-none group-open:text-champagne-dark md:text-xl [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 font-body text-xs text-champagne transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="mt-4 pr-8">
                  <FaqAnswer item={item} />
                </div>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
