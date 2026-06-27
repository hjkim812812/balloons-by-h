"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BRAND } from "@/data/site";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/collections", label: "Collections" },
  { href: "/enhancements", label: "Enhancements" },
  { href: "/about", label: "About" },
  { href: "/delivery", label: "Delivery" },
  { href: "/contact", label: "Contact" },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 48);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxury",
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-champagne/15 bg-ivory/92 backdrop-blur-md"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[4.5rem] md:px-8">
        <Link
          href="/"
          className={cn(
            "font-display text-lg tracking-wide transition-colors duration-300 md:text-xl",
            transparent
              ? "text-ivory hover:text-champagne-muted"
              : "text-charcoal hover:text-champagne-dark"
          )}
          onClick={() => setOpen(false)}
        >
          {BRAND.name}
        </Link>

        <div className="flex items-center">
          <ul className="hidden items-center gap-8 md:flex md:mr-8">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "inline-flex min-h-[44px] items-center font-body text-[0.68rem] uppercase tracking-luxury transition-colors duration-300",
                    transparent
                      ? pathname === href || pathname.startsWith(href + "/")
                        ? "text-champagne-muted"
                        : "text-ivory/80 hover:text-ivory"
                      : pathname === href || pathname.startsWith(href + "/")
                        ? "text-champagne-dark"
                        : "text-charcoal-soft hover:text-charcoal"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center max-md:-space-x-1">
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow ${BRAND.name} on Instagram`}
              className={cn(
                "inline-flex h-11 w-9 items-center justify-center transition-colors duration-300 md:w-11",
                transparent
                  ? "text-ivory/85 hover:text-ivory"
                  : "text-charcoal-soft hover:text-charcoal"
              )}
            >
              <InstagramIcon className="h-[1.125rem] w-[1.125rem]" />
            </a>

            <button
              type="button"
              className="flex h-11 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
            <span
              className={cn(
                "block h-px w-5 transition-all duration-300",
                transparent ? "bg-ivory" : "bg-charcoal",
                open && "translate-y-[3.5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-px w-5 transition-all duration-300",
                transparent ? "bg-ivory" : "bg-charcoal",
                open && "-translate-y-[3.5px] -rotate-45"
              )}
            />
          </button>
          </div>
        </div>
      </nav>

      <div
        className={cn(
          "border-t transition-all duration-500 ease-luxury md:hidden",
          transparent ? "border-ivory/20 bg-charcoal/95" : "border-champagne/20 bg-ivory",
          open ? "max-h-80 opacity-100" : "max-h-0 overflow-hidden opacity-0"
        )}
      >
        <ul className="flex flex-col items-center gap-2 px-5 py-8">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "inline-flex min-h-[44px] items-center font-body text-xs uppercase tracking-luxury",
                  transparent ? "text-ivory" : "text-charcoal"
                )}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
