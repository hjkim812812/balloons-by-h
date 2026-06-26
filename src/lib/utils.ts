import { SMS_PHONE, BRAND } from "@/data/site";

export function getBookBouquetHref(bouquetName: string, slug?: string): string {
  const message = `Hello ${BRAND.name}, I'd like to book the ${bouquetName} bouquet.`;

  if (SMS_PHONE) {
    return `sms:${SMS_PHONE}?body=${encodeURIComponent(message)}`;
  }

  const params = new URLSearchParams({ bouquet: slug ?? bouquetName });
  return `/contact?${params.toString()}`;
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
