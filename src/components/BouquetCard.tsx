import Link from "next/link";
import Image from "next/image";
import { COLLECTION, type Bouquet } from "@/data/site";

type BouquetCardProps = {
  bouquet: Bouquet;
  index?: number;
};

function ViewDetailsArrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3 w-3 stroke-current stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round] fill-none transition-transform duration-500 group-hover/card:translate-x-0.5"
      aria-hidden
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function BouquetCard({ bouquet, index = 0 }: BouquetCardProps) {
  return (
    <article
      className="group/card animate-fade-up opacity-0 transition-transform duration-700 ease-luxury md:hover:-translate-y-1"
      style={{ animationDelay: `${index * 0.06}s`, animationFillMode: "forwards" }}
    >
      <Link
        href={`/collections/${COLLECTION.slug}/${bouquet.slug}`}
        className="block min-h-[44px]"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-ivory-deep">
          <Image
            src={bouquet.image}
            alt={`${bouquet.name} — Luxury Garden Balloon Bouquet by Balloons by H`}
            fill
            loading="lazy"
            quality={85}
            className="object-cover transition-transform duration-700 ease-luxury group-hover/card:scale-[1.04]"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-charcoal/5 to-transparent transition-colors duration-500 md:group-hover/card:from-charcoal/50" />

          <div className="absolute inset-x-0 top-1/2 hidden -translate-y-1/2 text-center opacity-0 transition-all duration-500 ease-luxury md:block md:group-hover/card:opacity-100">
            <span className="inline-flex items-center gap-2.5 border border-ivory/40 bg-charcoal/20 px-5 py-2.5 font-body text-[0.62rem] uppercase tracking-luxury text-ivory backdrop-blur-sm">
              View Details
              <ViewDetailsArrow />
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
            <p className="font-display text-lg text-ivory md:text-xl">{bouquet.name}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}

