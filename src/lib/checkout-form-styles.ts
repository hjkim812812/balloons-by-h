export function getCheckoutFieldClass(hasError = false) {
  return hasError
    ? "checkout-field checkout-field-error"
    : "checkout-field checkout-field-default";
}

export const CHECKOUT_SELECT_CLASS = "checkout-select";
