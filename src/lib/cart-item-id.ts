type CartItemIdOptions = {
  personalizedMessage?: string;
  balloonNumber?: number;
};

export function buildCartItemId(
  baseId: string,
  options?: CartItemIdOptions | string
): string {
  if (typeof options === "string") {
    const message = options.trim();
    return message ? `${baseId}::${message}` : baseId;
  }

  if (options?.personalizedMessage?.trim()) {
    return `${baseId}::${options.personalizedMessage.trim()}`;
  }

  if (options?.balloonNumber !== undefined) {
    return `${baseId}::${options.balloonNumber}`;
  }

  return baseId;
}
