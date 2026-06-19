export default function normalizeDate(date?: string | Date | null) {
  if (!date) return undefined;

  const d = new Date(date);
  d.setHours(0, 0, 0, 0);

  return d;
}
