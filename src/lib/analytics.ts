import type { OrderSummary } from "@/types/cart";

// Set your GA4 Measurement ID in .env.local and Vercel:
// NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";

export function isGoogleAnalyticsEnabled() {
  return GA_MEASUREMENT_ID.length > 0;
}

type GtagCommand = "config" | "event" | "js";

declare global {
  interface Window {
    gtag?: (
      command: GtagCommand,
      targetId: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

const GTAG_POLL_MS = 50;
const GTAG_MAX_ATTEMPTS = 100;

function runWhenGtagReady(callback: () => void) {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.gtag === "function") {
    callback();
    return;
  }

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;

    if (typeof window.gtag === "function") {
      window.clearInterval(timer);
      callback();
      return;
    }

    if (attempts >= GTAG_MAX_ATTEMPTS) {
      window.clearInterval(timer);
    }
  }, GTAG_POLL_MS);
}

function gtagEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (!isGoogleAnalyticsEnabled()) {
    return;
  }

  runWhenGtagReady(() => {
    window.gtag?.("event", eventName, params);
  });
}

export function trackPageView(url: string) {
  if (!isGoogleAnalyticsEnabled()) {
    return;
  }

  runWhenGtagReady(() => {
    window.gtag?.("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  });
}

export type ProductPageContext = {
  productType: "bouquet" | "enhancement";
  slug: string;
};

export function getProductPageContext(pathname: string): ProductPageContext | null {
  const collectionProductMatch = pathname.match(/^\/collections\/[^/]+\/([^/]+)$/);
  if (collectionProductMatch) {
    return {
      productType: "bouquet",
      slug: collectionProductMatch[1],
    };
  }

  const enhancementProductMatch = pathname.match(/^\/enhancements\/([^/]+)$/);
  if (enhancementProductMatch) {
    return {
      productType: "enhancement",
      slug: enhancementProductMatch[1],
    };
  }

  return null;
}

export function trackProductPageView(context: ProductPageContext) {
  gtagEvent("view_item", {
    item_id: context.slug,
    item_category: context.productType,
  });
}

export function trackCheckoutVisit() {
  gtagEvent("begin_checkout");
}

export function trackPurchase(order: OrderSummary) {
  gtagEvent("purchase", {
    transaction_id: String(order.orderNumber),
    value: order.total,
    currency: "USD",
    items: order.items.map((item) => ({
      item_id: item.slug,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
      item_category: item.productType,
    })),
  });
}
