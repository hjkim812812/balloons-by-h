"use client";

import { useEffect, useRef, useState } from "react";
import { AddToCartButton } from "@/components/AddToCartButton";
import type { CartItem } from "@/types/cart";
import { buildCartItemId } from "@/lib/cart-item-id";
import { cn } from "@/lib/utils";

type ProductAddToCartProps = {
  item: Omit<CartItem, "quantity">;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  showPersonalizedMessage?: boolean;
  showBalloonNumberSelector?: boolean;
};

const quantityControlClass =
  "inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-champagne/20 bg-ivory font-body text-sm text-charcoal transition-all hover:bg-white focus:border-champagne focus:outline-none focus:ring-2 focus:ring-champagne/15 disabled:cursor-not-allowed disabled:opacity-50";

const balloonNumberSelectClass =
  "w-full min-h-[44px] appearance-none border border-champagne/20 bg-ivory bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat px-4 py-2 pr-10 font-body text-base text-charcoal outline-none transition-all focus:border-champagne focus:bg-white focus:ring-2 focus:ring-champagne/15 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm [background-image:url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%232C2C2C%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')]";

export function ProductAddToCart({
  item,
  fullWidth,
  disabled,
  className,
  showPersonalizedMessage,
  showBalloonNumberSelector,
}: ProductAddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [personalizedMessage, setPersonalizedMessage] = useState("");
  const [balloonNumber, setBalloonNumber] = useState("0");
  const personalizedMessageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!showPersonalizedMessage) {
      return;
    }

    const textarea = personalizedMessageRef.current;
    if (!textarea) {
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 768px)");
    if (!mobileQuery.matches) {
      return;
    }

    function keepInputVisible() {
      if (!textarea) {
        return;
      }

      const viewport = window.visualViewport;
      if (!viewport) {
        return;
      }

      const rect = textarea.getBoundingClientRect();
      const safeTop = viewport.offsetTop + 16;
      const safeBottom = viewport.offsetTop + viewport.height - 16;

      if (rect.bottom > safeBottom) {
        window.scrollBy({
          top: rect.bottom - safeBottom,
          left: 0,
          behavior: "auto",
        });
        return;
      }

      if (rect.top < safeTop) {
        window.scrollBy({
          top: rect.top - safeTop,
          left: 0,
          behavior: "auto",
        });
      }
    }

    const handleFocusIn = () => {
      window.requestAnimationFrame(() => {
        keepInputVisible();
        window.setTimeout(keepInputVisible, 100);
        window.setTimeout(keepInputVisible, 300);
      });
    };

    const handleViewportResize = () => {
      if (document.activeElement !== textarea) {
        return;
      }

      keepInputVisible();
    };

    textarea.addEventListener("focusin", handleFocusIn);
    window.visualViewport?.addEventListener("resize", handleViewportResize);

    return () => {
      textarea.removeEventListener("focusin", handleFocusIn);
      window.visualViewport?.removeEventListener("resize", handleViewportResize);
    };
  }, [showPersonalizedMessage]);

  const selectedBalloonNumber = showBalloonNumberSelector
    ? Number.parseInt(balloonNumber, 10)
    : undefined;

  const cartItem: Omit<CartItem, "quantity"> = {
    ...item,
    id: buildCartItemId(item.id, {
      personalizedMessage: showPersonalizedMessage ? personalizedMessage : undefined,
      balloonNumber: showBalloonNumberSelector ? selectedBalloonNumber : undefined,
    }),
    personalizedMessage: showPersonalizedMessage
      ? personalizedMessage.trim() || undefined
      : undefined,
    balloonNumber: showBalloonNumberSelector ? selectedBalloonNumber : undefined,
  };

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
            className="min-h-[44px] w-14 border border-champagne/20 bg-ivory px-2 py-3 text-center font-body text-sm text-charcoal outline-none transition-all [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none focus:border-champagne focus:bg-white focus:ring-2 focus:ring-champagne/15 disabled:cursor-not-allowed disabled:opacity-50"
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
      {showBalloonNumberSelector && (
        <div className="flex flex-col gap-2">
          <label
            htmlFor={`balloon-number-${item.id}`}
            className="text-[0.65rem] uppercase tracking-luxury text-charcoal-soft"
          >
            Balloon Number
          </label>
          <select
            id={`balloon-number-${item.id}`}
            value={balloonNumber}
            onChange={(e) => setBalloonNumber(e.target.value)}
            disabled={disabled}
            className={balloonNumberSelectClass}
          >
            {Array.from({ length: 10 }, (_, digit) => (
              <option key={digit} value={digit}>
                {digit}
              </option>
            ))}
          </select>
        </div>
      )}
      {showPersonalizedMessage && (
        <div className="flex flex-col gap-2">
          <label
            htmlFor={`personalized-message-${item.id}`}
            className="text-[0.65rem] uppercase tracking-luxury text-charcoal-soft"
          >
            Add your personalized message
          </label>
          <textarea
            ref={personalizedMessageRef}
            id={`personalized-message-${item.id}`}
            value={personalizedMessage}
            onChange={(e) => setPersonalizedMessage(e.target.value)}
            rows={1}
            disabled={disabled}
            className="resize-y border border-champagne/20 bg-ivory px-4 py-2 font-body text-base leading-relaxed outline-none transition-all focus:border-champagne focus:bg-white focus:ring-2 focus:ring-champagne/15 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          />
        </div>
      )}
      <AddToCartButton
        item={cartItem}
        quantity={quantity}
        fullWidth={fullWidth}
        disabled={disabled}
      />
    </div>
  );
}
