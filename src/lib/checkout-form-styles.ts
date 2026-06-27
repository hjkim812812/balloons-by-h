const CHECKOUT_FIELD_BASE =
  "box-border w-full h-12 min-h-12 border border-solid bg-ivory px-4 font-body text-base leading-normal text-charcoal-soft outline-none transition-all placeholder:text-charcoal-soft focus:border-champagne focus:bg-white focus:ring-2 focus:ring-champagne/15";

export function getCheckoutFieldClass(hasError = false) {
  return `${CHECKOUT_FIELD_BASE} ${hasError ? "border-red-300" : "border-champagne/20"}`;
}

export const CHECKOUT_SELECT_CLASS =
  "appearance-none invalid:text-charcoal-soft bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10 [background-image:url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235A5A5A%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')]";

export const CHECKOUT_DATE_BUTTON_CLASS = "flex items-center text-left";
