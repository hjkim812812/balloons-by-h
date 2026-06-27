import { EnhancementCard } from "@/components/EnhancementCard";
import { ENHANCEMENTS } from "@/data/enhancements";

export function ProductEnhancementsSection() {
  return (
    <div className="mt-20 border-t border-champagne/15 pt-10">
      <h2 className="font-display text-2xl text-charcoal md:text-3xl">
        Enhancement Products
      </h2>
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {ENHANCEMENTS.map((enhancement, index) => (
          <EnhancementCard key={enhancement.slug} enhancement={enhancement} index={index} />
        ))}
      </div>
    </div>
  );
}
