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

const baseStyles =
  "inline-flex items-center justify-center font-body text-[0.68rem] uppercase tracking-luxury transition-all duration-500 ease-luxury";

const variants = {
  primary:
    "bg-champagne text-ivory border border-champagne px-8 py-3.5 hover:bg-champagne-dark hover:border-champagne-dark hover:-translate-y-px",
  outline:
    "bg-transparent text-charcoal border border-charcoal/30 px-8 py-3.5 hover:border-charcoal hover:bg-charcoal hover:text-ivory",
  minimal:
    "bg-transparent text-charcoal border-b border-charcoal/40 pb-1 px-0 hover:border-champagne hover:text-champagne-dark",
};

export function BookButton({
  bouquetName,
  slug,
  variant = "primary",
  className,
  fullWidth,
}: BookButtonProps) {
  const href = getBookBouquetHref(bouquetName, slug);
  const classNames = cn(baseStyles, variants[variant], fullWidth && "w-full", className);

  // Custom booking — SMS when configured, otherwise on-site contact form
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
