"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/site";
import { setLastOrder } from "@/lib/order-session";
import type { OrderSummary } from "@/types/cart";

const DELIVERY_TIME_OPTIONS = [
  "10:00 AM – 2:00 PM",
  "2:00 PM – 6:00 PM",
] as const;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const required = [
      "name",
      "email",
      "phone",
      "delivery-address",
      "delivery-date",
      "delivery-time",
    ];
    const newErrors: Record<string, boolean> = {};

    required.forEach((field) => {
      if (!String(data.get(field) ?? "").trim()) {
        newErrors[field] = true;
      }
    });

    const email = String(data.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          deliveryAddress: data.get("delivery-address"),
          deliveryDate: data.get("delivery-date"),
          deliveryTime: data.get("delivery-time"),
          items: items.map(({ id, name, price, quantity, slug, productType }) => ({
            id,
            name,
            price,
            quantity,
            slug,
            productType,
          })),
          total,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setSubmitError(result.error ?? "Unable to submit order. Please try again.");
        return;
      }

      const order: OrderSummary = {
        orderNumber: result.orderNumber,
        total: result.total,
        items: result.items,
        name: result.name,
        email: result.email,
        phone: result.phone,
        deliveryAddress: result.deliveryAddress,
        deliveryDate: result.deliveryDate,
        deliveryTime: result.deliveryTime,
      };

      setLastOrder(order);
      clearCart();
      router.push(`/order/${result.orderNumber}`);
    } catch {
      setSubmitError("Unable to submit order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="bg-ivory pt-16 md:pt-[4.5rem]">
        <section className="py-16 md:py-28">
          <div className="mx-auto max-w-3xl px-6 md:px-10">
            <h1 className="font-display text-3xl text-charcoal md:text-5xl">Checkout</h1>
            <div className="mt-12 border border-champagne/20 bg-white p-10 text-center md:p-14">
              <p className="font-body text-sm text-charcoal-soft">Your cart is empty.</p>
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
          <h1 className="font-display text-3xl text-charcoal md:text-5xl">Checkout</h1>

          <div className="mt-12 border border-champagne/20 bg-white p-6 md:p-10">
            <div className="mb-8 border-b border-champagne/15 pb-8">
              <p className="font-body text-[0.65rem] uppercase tracking-luxury text-charcoal-soft">
                Order Summary
              </p>
              <ul className="mt-4 space-y-3">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-4 font-body text-sm text-charcoal-soft"
                  >
                    <span>
                      {item.name}
                      {item.quantity > 1 ? ` × ${item.quantity}` : ""}
                    </span>
                    <span className="text-charcoal">{formatPrice(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between border-t border-champagne/15 pt-6">
                <p className="font-body text-[0.65rem] uppercase tracking-luxury text-charcoal-soft">
                  Total
                </p>
                <p className="font-body text-lg tracking-wide text-charcoal">
                  {formatPrice(total)}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-[0.65rem] uppercase tracking-luxury text-charcoal-soft"
                  >
                    Name <span className="text-champagne">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    className={`border bg-ivory px-4 py-3 font-body text-sm outline-none transition-all focus:border-champagne focus:bg-white focus:ring-2 focus:ring-champagne/15 ${errors.name ? "border-red-300" : "border-champagne/20"}`}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-[0.65rem] uppercase tracking-luxury text-charcoal-soft"
                  >
                    Email <span className="text-champagne">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={`border bg-ivory px-4 py-3 font-body text-sm outline-none transition-all focus:border-champagne focus:bg-white focus:ring-2 focus:ring-champagne/15 ${errors.email ? "border-red-300" : "border-champagne/20"}`}
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <label
                  htmlFor="phone"
                  className="text-[0.65rem] uppercase tracking-luxury text-charcoal-soft"
                >
                  Phone Number <span className="text-champagne">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  className={`border bg-ivory px-4 py-3 font-body text-sm outline-none transition-all focus:border-champagne focus:bg-white focus:ring-2 focus:ring-champagne/15 ${errors.phone ? "border-red-300" : "border-champagne/20"}`}
                />
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <label
                  htmlFor="delivery-address"
                  className="text-[0.65rem] uppercase tracking-luxury text-charcoal-soft"
                >
                  Delivery Address <span className="text-champagne">*</span>
                </label>
                <input
                  id="delivery-address"
                  name="delivery-address"
                  required
                  autoComplete="street-address"
                  className={`border bg-ivory px-4 py-3 font-body text-sm outline-none transition-all focus:border-champagne focus:bg-white focus:ring-2 focus:ring-champagne/15 ${errors["delivery-address"] ? "border-red-300" : "border-champagne/20"}`}
                />
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="delivery-date"
                    className="text-[0.65rem] uppercase tracking-luxury text-charcoal-soft"
                  >
                    Delivery Date <span className="text-champagne">*</span>
                  </label>
                  <input
                    id="delivery-date"
                    name="delivery-date"
                    type="date"
                    required
                    className={`border bg-ivory px-4 py-3 font-body text-sm outline-none transition-all focus:border-champagne focus:bg-white focus:ring-2 focus:ring-champagne/15 ${errors["delivery-date"] ? "border-red-300" : "border-champagne/20"}`}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="delivery-time"
                    className="text-[0.65rem] uppercase tracking-luxury text-charcoal-soft"
                  >
                    Delivery Time <span className="text-champagne">*</span>
                  </label>
                  <select
                    id="delivery-time"
                    name="delivery-time"
                    required
                    defaultValue=""
                    className={`border bg-ivory px-4 py-3 font-body text-sm outline-none transition-all focus:border-champagne focus:bg-white focus:ring-2 focus:ring-champagne/15 ${errors["delivery-time"] ? "border-red-300" : "border-champagne/20"}`}
                  >
                    <option value="" disabled>
                      Select a window
                    </option>
                    {DELIVERY_TIME_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {submitError && (
                <p className="mt-5 font-body text-sm text-red-600">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-8 w-full border border-champagne bg-champagne py-3.5 font-body text-[0.68rem] uppercase tracking-luxury text-ivory transition-all duration-500 hover:bg-champagne-dark disabled:cursor-not-allowed disabled:opacity-60 md:w-auto md:px-12"
              >
                {submitting ? "Submitting..." : "Place Order"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
