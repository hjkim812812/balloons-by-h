export function buildCartItemId(
  baseId: string,
  personalizedMessage?: string
): string {
  const message = personalizedMessage?.trim();
  if (!message) return baseId;
  return `${baseId}::${message}`;
}
