import Link from "next/link";
import { getBookBouquetHref } from "@/lib/utils";
import { cn } from "@/lib/utils";

type BookButtonProps = {
  bouquetName: string;
  slug?: string;
  variant?: "primary" | "outline" | "minimal";
  className?: string;
  fullWidth?: boolean;
};

const variants = {
  primary: "btn-luxury-primary",
  outline: "btn-luxury-outline-dark",
  minimal:
    "inline-flex min-h-[44px] items-center bg-transparent font-body text-[0.68rem] uppercase tracking-luxury text-charcoal border-b border-charcoal/40 pb-1 px-0 transition-all duration-500 ease-luxury hover:border-champagne hover:text-champagne-dark",
};

export function BookButton({
  bouquetName,
  slug,
  variant = "primary",
  className,
  fullWidth,
}: BookButtonProps) {
  const href = getBookBouquetHref(bouquetName, slug);
  const classNames = cn(variants[variant], fullWidth && "w-full", className);

  if (href.startsWith("sms:")) {
    return (
      <a href={href} className={classNames} data-book-bouquet={bouquetName}>
        Inquire
      </a>
    );
  }

  return (
    <Link href={href} className={classNames} data-book-bouquet={bouquetName}>
      Inquire
    </Link>
  );
}
