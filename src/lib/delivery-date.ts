export function getTomorrowLocalDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function isValidDeliveryDate(date: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && date >= getTomorrowLocalDateString();
}
