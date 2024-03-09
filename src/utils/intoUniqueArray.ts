export function intoUniqueArray<T, K extends keyof T>(arr: T[] | null | undefined, key?: K) {
  if (!arr) {
    return [];
  }

  if (!key) {
    return Array.from(new Set(arr));
  }

  const setKeys: T[] = [];
  return arr.reduce((acc, item) => {
    if (item[key] && !setKeys.includes(item[key] as T)) {
      acc.push(item);
      setKeys.push(item[key] as T);
    }

    return acc;
  }, [] as T[]);
}
