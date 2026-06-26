import Link from "next/link";
import Image from "next/image";
import type { Bouquet } from "@/data/site";
import { BOUQUET_PRICE, formatPrice } from "@/data/site";

type BouquetCardProps = {
  bouquet: Bouquet;
  index?: number;
};

export function BouquetCard({ bouquet, index = 0 }: BouquetCardProps) {
  return (
    <article
      className="group animate-fade-up opacity-0"
      style={{ animationDelay: `${index * 0.06}s`, animationFillMode: "forwards" }}
    >
      <Link href={`/collections/signature-balloon-bouquet-collection/${bouquet.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-ivory-deep">
          <Image
            src={bouquet.image}
            alt={`${bouquet.name} — Signature Balloon Bouquet by Balloons by H`}
            fill
            className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/35 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
            <div className="border-t border-ivory/30 pt-4">
              <p className="font-display text-lg text-ivory md:text-xl">{bouquet.name}</p>
              <p className="mt-1 font-body text-[0.65rem] uppercase tracking-luxury text-ivory/75">
                {formatPrice(BOUQUET_PRICE)}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
