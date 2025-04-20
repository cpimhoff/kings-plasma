export function partition<T, U extends T>(array: T[], predicate: (item: T, idx: number) => item is U): [U[], T[]];
export function partition<T>(array: T[], predicate: (item: T, idx: number) => boolean): [T[], T[]];
export function partition<T>(array: T[], predicate: (item: T, idx: number) => boolean): [T[], T[]] {
  const trueItems: T[] = [];
  const falseItems: T[] = [];
  for (let idx = 0; idx < array.length; idx++) {
    const item = array[idx];
    if (predicate(item, idx)) trueItems.push(item);
    else falseItems.push(item);
  }
  return [trueItems, falseItems];
}
