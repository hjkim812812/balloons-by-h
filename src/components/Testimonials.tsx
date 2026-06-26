import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { TESTIMONIALS } from "@/data/site";

export function Testimonials() {
  return (
    <section className="border-t border-champagne/15 bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <ScrollReveal>
          <SectionHeader
            title="What Our Clients Say"
            align="center"
            className="mx-auto"
          />
        </ScrollReveal>

        <div className="mt-14 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-10">
          {TESTIMONIALS.map((quote, i) => (
            <ScrollReveal key={quote} delay={i * 80}>
              <blockquote className="flex h-full flex-col border border-champagne/15 bg-ivory px-7 py-8 md:px-8 md:py-10">
                <p
                  className="font-body text-[0.65rem] tracking-[0.2em] text-champagne"
                  aria-label="5 out of 5 stars"
                >
                  ★★★★★
                </p>
                <p className="mt-5 flex-1 font-display text-lg italic leading-relaxed text-charcoal md:text-xl">
                  &ldquo;{quote}&rdquo;
                </p>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
