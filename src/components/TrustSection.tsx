import { ScrollReveal } from "@/components/ScrollReveal";
import { TrustIcon } from "@/components/TrustIcon";
import { TRUST_ITEMS } from "@/data/site";

export function TrustSection() {
  return (
    <section className="border-t border-champagne/15 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 md:gap-x-10 md:gap-y-12 lg:grid-cols-6">
          {TRUST_ITEMS.map((item, i) => (
            <ScrollReveal
              key={item.label}
              delay={i * 60}
              className="flex flex-col items-center text-center"
            >
              <TrustIcon name={item.icon} />
              <p className="mt-4 font-body text-[0.62rem] uppercase leading-relaxed tracking-[0.14em] text-charcoal-soft md:text-[0.65rem]">
                {item.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
