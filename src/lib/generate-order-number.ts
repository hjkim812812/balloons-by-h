export function generateOrderNumber(): number {
  return 1048 + (Date.now() % 900000);
}