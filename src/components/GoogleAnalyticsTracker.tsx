"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import {
  getProductPageContext,
  isGoogleAnalyticsEnabled,
  trackCheckoutVisit,
  trackPageView,
  trackProductPageView,
} from "@/lib/analytics";

function GoogleAnalyticsRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isGoogleAnalyticsEnabled() || !pathname) {
      return;
    }

    const query = searchParams.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    trackPageView(url);

    const productPage = getProductPageContext(pathname);
    if (productPage) {
      trackProductPageView(productPage);
    }

    if (pathname === "/checkout") {
      trackCheckoutVisit();
    }
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalyticsTracker() {
  if (!isGoogleAnalyticsEnabled()) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsRouteTracker />
    </Suspense>
  );
}
