"use client";

import { ProductAddToCart } from "@/components/ProductAddToCart";
import type { Enhancement } from "@/data/enhancements";

type ProductEnhancementAddProps = {
  enhancement: Enhancement;
};

export function ProductEnhancementAdd({ enhancement }: ProductEnhancementAddProps) {
  return (
    <div className="mt-4">
      <ProductAddToCart
        item={{
          id: `enhancement-${enhancement.slug}`,
          name: enhancement.name,
          price: enhancement.price ?? 0,
          slug: enhancement.slug,
          productType: "enhancement",
          href: `/enhancements/${enhancement.slug}`,
        }}
        fullWidth
        disabled={enhancement.price === undefined}
      />
    </div>
  );
}
