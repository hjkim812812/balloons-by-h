"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

function ShoppingBagIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden
    >
      <path d="M6 7h12l-1 14H7L6 7Z" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

type CartIconProps = {
  transparent?: boolean;
};

export function CartIcon({ transparent }: CartIconProps) {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Cart${itemCount > 0 ? `, ${itemCount} items` : ""}`}
      className={cn(
        "relative inline-flex h-11 w-9 items-center justify-center transition-colors duration-300 md:w-11",
        transparent
          ? "text-ivory/85 hover:text-ivory"
          : "text-charcoal-soft hover:text-charcoal"
      )}
    >
      <ShoppingBagIcon className="h-[1.125rem] w-[1.125rem]" />
      {itemCount > 0 && (
        <span className="absolute right-1 top-2 flex h-4 min-w-4 items-center justify-center bg-champagne px-1 font-body text-[0.55rem] text-ivory md:right-1.5">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
