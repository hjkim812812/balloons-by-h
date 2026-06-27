"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/site";

export default function CartPage() {
  const { items, total, removeItem } = useCart();

  return (
    <div className="bg-ivory pt-16 md:pt-[4.5rem]">
      <section className="py-16 md:py-28">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <h1 className="font-display text-3xl text-charcoal md:text-5xl">Cart</h1>

          {items.length === 0 ? (
            <div className="mt-12 border border-champagne/20 bg-white p-10 text-center md:p-14">
              <p className="font-body text-sm text-charcoal-soft">Your cart is empty.</p>
              <Link
                href="/collections"
                className="mt-8 inline-flex min-h-[44px] items-center font-body text-[0.68rem] uppercase tracking-luxury text-champagne-dark underline-offset-4 hover:underline"
              >
                Browse Collections
              </Link>
            </div>
          ) : (
            <>
              <ul className="mt-12 divide-y divide-champagne/15 border border-champagne/20 bg-white">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start justify-between gap-6 px-6 py-5 md:px-8"
                  >
                    <div>
                      <Link
                        href={item.href}
                        className="font-display text-xl text-charcoal transition-colors hover:text-champagne-dark"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 font-body text-xs text-charcoal-soft">
                        Qty {item.quantity}
                      </p>
                      {item.personalizedMessage && (
                        <p className="mt-2 font-body text-xs text-charcoal-soft">
                          {item.personalizedMessage}
                        </p>
                      )}
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-3">
                      <p className="font-body text-sm tracking-wide text-charcoal">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="font-body text-[0.65rem] uppercase tracking-luxury text-charcoal-soft transition-colors hover:text-charcoal"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center justify-between border-t border-champagne/15 pt-8">
                <p className="font-body text-[0.65rem] uppercase tracking-luxury text-charcoal-soft">
                  Total
                </p>
                <p className="font-body text-lg tracking-wide text-charcoal">
                  {formatPrice(total)}
                </p>
              </div>

              <div className="mt-10">
                <Link href="/checkout" className="btn-luxury-primary w-full md:w-auto">
                  Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
