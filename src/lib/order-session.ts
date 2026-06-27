import type { OrderSummary } from "@/types/cart";

const LAST_ORDER_KEY = "balloons-by-h-last-order";

export function getLastOrder(): OrderSummary | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(LAST_ORDER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as OrderSummary;
  } catch {
    return null;
  }
}

export function setLastOrder(order: OrderSummary) {
  sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
}
