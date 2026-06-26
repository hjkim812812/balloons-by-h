import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { FAQ_ITEMS } from "@/data/seo";

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
                  <p className="font-body text-sm leading-relaxed text-charcoal-soft md:text-base">
                    {item.answerText}
                  </p>
                </div>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
