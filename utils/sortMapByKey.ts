export default function sortMapByKey<T>(map: Map<number, T>) {
  return [...map.entries()].sort((a, b) => a[0] - b[0]);
}
