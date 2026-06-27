"use client";

import { useState } from "react";
import { AddToCartButton } from "@/components/AddToCartButton";
import type { CartItem } from "@/types/cart";
import { cn } from "@/lib/utils";

type ProductAddToCartProps = {
  item: Omit<CartItem, "quantity">;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
};

const quantityControlClass =
  "inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-champagne/20 bg-ivory font-body text-sm text-charcoal transition-all hover:bg-white focus:border-champagne focus:outline-none focus:ring-2 focus:ring-champagne/15 disabled:cursor-not-allowed disabled:opacity-50";

export function ProductAddToCart({
  item,
  fullWidth,
  disabled,
  className,
}: ProductAddToCartProps) {
  const [quantity, setQuantity] = useState(1);

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function increaseQuantity() {
    setQuantity((current) => current + 1);
  }

  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number.parseInt(e.target.value, 10);
    setQuantity(Number.isNaN(value) || value < 1 ? 1 : value);
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col gap-2">
        <label
          htmlFor={`quantity-${item.id}`}
          className="text-[0.65rem] uppercase tracking-luxury text-charcoal-soft"
        >
          Quantity
        </label>
        <div className="flex max-w-[9rem]">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={decreaseQuantity}
            disabled={disabled || quantity <= 1}
            className={cn(quantityControlClass, "border-r-0")}
          >
            −
          </button>
          <input
            id={`quantity-${item.id}`}
            type="number"
            min={1}
            value={quantity}
            onChange={handleQuantityChange}
            disabled={disabled}
            className="min-h-[44px] w-14 border border-champagne/20 bg-ivory px-2 py-3 text-center font-body text-sm text-charcoal outline-none transition-all focus:border-champagne focus:bg-white focus:ring-2 focus:ring-champagne/15 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={increaseQuantity}
            disabled={disabled}
            className={cn(quantityControlClass, "border-l-0")}
          >
            +
          </button>
        </div>
      </div>
      <AddToCartButton
        item={item}
        quantity={quantity}
        fullWidth={fullWidth}
        disabled={disabled}
      />
    </div>
  );
}
