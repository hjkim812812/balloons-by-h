export const DELIVERY_FEE = 50;

export function getOrderTotal(subtotal: number): number {
  return subtotal + DELIVERY_FEE;
}
