export const PHONE_NUMBER_ERROR =
  "Please enter a valid 10-digit phone number.";

export function sanitizePhoneInput(value: string): string {
  return value.replace(/\D/g, "").slice(0, 10);
}

export function isValidPhoneNumber(phone: string): boolean {
  return /^\d{10}$/.test(phone);
}
