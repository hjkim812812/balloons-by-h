import Link from "next/link";
import { BRAND, DELIVERY_AREAS } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-champagne/15 bg-charcoal text-ivory/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4 md:px-8 md:py-16">
        <div className="md:col-span-1">
          <p className="font-display text-xl text-ivory">{BRAND.name}</p>
          <p className="mt-2 font-display text-sm italic opacity-60">
            {BRAND.tagline}
          </p>
        </div>

        <div>
          <p className="mb-4 text-[0.65rem] uppercase tracking-luxury text-champagne">
            Navigate
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/collections" className="transition-colors hover:text-ivory">
                Collections
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition-colors hover:text-ivory">
                About
              </Link>
            </li>
            <li>
              <Link href="/delivery" className="transition-colors hover:text-ivory">
                Delivery
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-ivory">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-[0.65rem] uppercase tracking-luxury text-champagne">
            Delivery
          </p>
          <p className="text-sm">Los Angeles local delivery</p>
          <p className="mt-1 text-sm opacity-60">
            {DELIVERY_AREAS.slice(0, 3).join(" · ")}
          </p>
          <p className="text-sm opacity-60">
            {DELIVERY_AREAS.slice(3).join(" · ")}
          </p>
        </div>

        <div>
          <p className="mb-4 text-[0.65rem] uppercase tracking-luxury text-champagne">
            Connect
          </p>
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm transition-colors hover:text-ivory"
          >
            @{BRAND.instagramHandle}
          </a>
          <a
            href={`mailto:${BRAND.email}`}
            className="mt-2 block text-sm transition-colors hover:text-ivory"
          >
            {BRAND.email}
          </a>
        </div>
      </div>

      <div className="border-t border-ivory/10 py-5 text-center">
        <p className="text-[0.65rem] tracking-wide opacity-40">
          &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
