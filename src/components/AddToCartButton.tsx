"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/types/cart";
import { cn } from "@/lib/utils";

type AddToCartButtonProps = {
  item: Omit<CartItem, "quantity">;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
};

export function AddToCartButton({
  item,
  className,
  fullWidth,
  disabled,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    if (disabled) return;
    addItem(item);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "btn-luxury-primary",
        fullWidth && "w-full",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      {added ? "Added" : "Add to Cart"}
    </button>
  );
}
