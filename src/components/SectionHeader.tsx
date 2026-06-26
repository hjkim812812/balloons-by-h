import Link from "next/link";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`${align === "center" ? "text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <p className="mb-3 text-[0.65rem] uppercase tracking-luxury text-champagne">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl text-charcoal md:text-4xl">{title}</h2>
      {description && (
        <p
          className={`mt-4 max-w-xl font-body text-sm leading-relaxed text-charcoal-soft md:text-base${align === "center" ? " mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

type EditorialLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function EditorialLink({ href, children }: EditorialLinkProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 font-body text-[0.68rem] uppercase tracking-luxury text-charcoal transition-colors hover:text-champagne-dark"
    >
      <span>{children}</span>
      <span className="block h-px w-8 bg-charcoal/30 transition-all duration-500 group-hover:w-12 group-hover:bg-champagne" />
    </Link>
  );
}
