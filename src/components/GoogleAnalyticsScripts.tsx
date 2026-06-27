import { GoogleAnalytics } from "@next/third-parties/google";
import { GoogleAnalyticsTracker } from "@/components/GoogleAnalyticsTracker";
import { GA_MEASUREMENT_ID, isGoogleAnalyticsEnabled } from "@/lib/analytics";

export function GoogleAnalyticsScripts() {
  if (!isGoogleAnalyticsEnabled()) {
    return null;
  }

  // Loaded from NEXT_PUBLIC_GA_MEASUREMENT_ID (for example: G-XXXXXXXXXX).
  return (
    <>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      <GoogleAnalyticsTracker />
    </>
  );
}
