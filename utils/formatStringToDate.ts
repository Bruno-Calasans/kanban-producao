export default function formatStringToDate(value: string | Date | unknown, onlyDate?: boolean) {
  const date = new Date(value as string);

  if (onlyDate) return date.toLocaleDateString();

  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}
