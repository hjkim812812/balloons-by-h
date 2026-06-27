import Image from "next/image";
import type { Enhancement } from "@/data/enhancements";

type EnhancementCardProps = {
  enhancement: Enhancement;
  index?: number;
};

export function EnhancementCard({ enhancement, index = 0 }: EnhancementCardProps) {
  return (
    <article
      className="animate-fade-up opacity-0"
      style={{ animationDelay: `${index * 0.06}s`, animationFillMode: "forwards" }}
    >
      <div className="relative aspect-[3/4] overflow-hidden border border-champagne/15 bg-ivory-deep">
        {enhancement.image ? (
          <>
            <Image
              src={enhancement.image}
              alt={`${enhancement.name} — Balloons by H`}
              fill
              loading="lazy"
              quality={85}
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-charcoal/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
              <p className="font-display text-lg text-ivory md:text-xl">
                {enhancement.name}
              </p>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center">
            <p className="font-display text-xl text-charcoal md:text-2xl">
              {enhancement.name}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
