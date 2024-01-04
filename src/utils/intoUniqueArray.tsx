export function intoUniqueArray<T>(array: T[] | null | undefined): T[] {
  return array ? Array.from(new Set(array)) : [];
}
