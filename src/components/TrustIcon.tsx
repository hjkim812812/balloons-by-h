type TrustIconProps = {
  name: string;
};

export function TrustIcon({ name }: TrustIconProps) {
  const className =
    "h-6 w-6 stroke-charcoal/70 stroke-[1.25] [stroke-linecap:round] [stroke-linejoin:round] fill-none";

  switch (name) {
    case "handmade":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M12 3v4M8 7h8M7 11l2 10h6l2-10M9 11h6" />
        </svg>
      );
    case "delivery":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7V10z" />
          <circle cx="7" cy="18" r="1.5" />
          <circle cx="17" cy="18" r="1.5" />
        </svg>
      );
    case "art":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M12 21c4-3 7-7 7-11a7 7 0 10-14 0c0 4 3 8 7 11z" />
        </svg>
      );
    case "secure":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" />
        </svg>
      );
    case "response":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l3 2" />
        </svg>
      );
    case "custom":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path d="M4 20l4-1 9-9-3-3-9 9-1 4zM14 5l3 3" />
        </svg>
      );
    default:
      return null;
  }
}
