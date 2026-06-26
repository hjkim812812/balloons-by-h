import Link from "next/link";
import { BRAND, BUSINESS_HOURS } from "@/data/site";

const NAV_LINKS = [
  { href: "/collections", label: "Collections" },
  { href: "/delivery", label: "Delivery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Inquire" },
  { href: "/#faq", label: "FAQ" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-champagne/15 bg-charcoal text-ivory/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-2 md:px-8 md:py-16 lg:grid-cols-4 lg:gap-12">
        <div>
          <p className="font-display text-xl text-ivory">{BRAND.name}</p>
          <p className="mt-2 font-display text-sm italic opacity-60">
            {BRAND.tagline}
          </p>
        </div>

        <div>
          <p className="mb-4 text-[0.65rem] uppercase tracking-luxury text-champagne">
            Business Hours
          </p>
          <p className="text-sm text-ivory/85">{BUSINESS_HOURS.days}</p>
          <p className="mt-1 text-sm text-ivory/85">{BUSINESS_HOURS.hours}</p>
        </div>

        <div>
          <p className="mb-4 text-[0.65rem] uppercase tracking-luxury text-champagne">
            Connect
          </p>
          <a
            href={`mailto:${BRAND.email}`}
            className="block min-h-[44px] py-1 text-sm transition-colors hover:text-ivory"
          >
            {BRAND.email}
          </a>
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block min-h-[44px] py-1 text-sm transition-colors hover:text-ivory"
          >
            @{BRAND.instagramHandle}
          </a>
        </div>

        <div>
          <p className="mb-4 text-[0.65rem] uppercase tracking-luxury text-champagne">
            Navigate
          </p>
          <ul className="space-y-1 text-sm">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex min-h-[44px] items-center transition-colors hover:text-ivory"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10 py-6 text-center sm:py-7">
        <p className="text-[0.65rem] tracking-wide opacity-40">
          &copy; {year} {BRAND.name}. Beverly Hills balloon delivery. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
