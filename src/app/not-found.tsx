import type { Metadata } from "next";
import Link from "next/link";
import { NOT_FOUND_SEO } from "@/data/page-seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: NOT_FOUND_SEO.title,
  description: NOT_FOUND_SEO.description,
  path: "/404",
  absoluteTitle: true,
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 pt-16 text-center md:pt-[4.5rem]">
      <p className="text-[0.65rem] uppercase tracking-luxury text-champagne">404</p>
      <h1 className="mt-4 font-display text-3xl text-charcoal">Page Not Found</h1>
      <p className="mt-4 font-body text-sm text-charcoal-soft">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="btn-luxury-primary mt-8">
        Return Home
      </Link>
    </div>
  );
}
