"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BRAND } from "@/data/site";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/delivery", label: "Delivery" },
  { href: "/contact", label: "Contact" },
];

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

        <ul className="hidden items-center gap-8 md:flex">
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

        <button
          type="button"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
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
