"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getLastOrder } from "@/lib/order-session";
import { BRAND } from "@/data/site";
import { formatPrice } from "@/data/site";
import { DELIVERY_FEE } from "@/lib/order-pricing";
import type { OrderSummary } from "@/types/cart";

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderNumberParam = Number(params.orderNumber);
  const [order, setOrder] = useState<OrderSummary | null>(null);

  useEffect(() => {
    const lastOrder = getLastOrder();
    if (lastOrder && lastOrder.orderNumber === orderNumberParam) {
      setOrder(lastOrder);
    }
  }, [orderNumberParam]);

  if (!order) {
    return (
      <div className="bg-ivory pt-16 md:pt-[4.5rem]">
        <section className="py-16 md:py-28">
          <div className="mx-auto max-w-3xl px-6 md:px-10">
            <div className="border border-champagne/20 bg-white p-10 text-center md:p-14">
              <p className="font-body text-sm text-charcoal-soft">Order not found.</p>
              <Link
                href="/collections"
                className="mt-8 inline-flex min-h-[44px] items-center font-body text-[0.68rem] uppercase tracking-luxury text-champagne-dark underline-offset-4 hover:underline"
              >
                Browse Collections
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-ivory pt-16 md:pt-[4.5rem]">
      <section className="py-16 md:py-28">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <div className="border border-champagne/20 bg-white p-10 md:p-14">
            <h1 className="font-display text-3xl text-charcoal md:text-4xl">
              Order #{order.orderNumber}
            </h1>

            <p className="mt-8 font-body text-base text-charcoal-soft">
              Please complete your payment via Zelle.
            </p>

            <div className="mt-10 space-y-6 font-body text-sm text-charcoal">
              <div>
                <p className="text-[0.65rem] uppercase tracking-luxury text-charcoal-soft">
                  Zelle
                </p>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="mt-2 inline-block text-charcoal transition-colors hover:text-champagne-dark"
                >
                  {BRAND.email}
                </a>
              </div>

              <div>
                <p className="text-[0.65rem] uppercase tracking-luxury text-charcoal-soft">
                  Delivery
                </p>
                <p className="mt-2">{formatPrice(order.deliveryFee ?? DELIVERY_FEE)}</p>
              </div>

              <div>
                <p className="text-[0.65rem] uppercase tracking-luxury text-charcoal-soft">
                  Amount Due
                </p>
                <p className="mt-2 text-lg tracking-wide">{formatPrice(order.total)}</p>
              </div>

              <div>
                <p className="text-[0.65rem] uppercase tracking-luxury text-charcoal-soft">
                  Memo
                </p>
                <p className="mt-2">Order #{order.orderNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
