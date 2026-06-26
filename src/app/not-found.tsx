import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 pt-16 text-center md:pt-[4.5rem]">
      <p className="text-[0.65rem] uppercase tracking-luxury text-champagne">404</p>
      <h1 className="mt-4 font-display text-3xl text-charcoal">Page Not Found</h1>
      <p className="mt-4 font-body text-sm text-charcoal-soft">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 border border-champagne px-8 py-3 font-body text-[0.68rem] uppercase tracking-luxury text-charcoal transition-colors hover:bg-champagne hover:text-ivory"
      >
        Return Home
      </Link>
    </div>
  );
}
