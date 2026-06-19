export default function toIsoDateString(date?: Date) {
  return date?.toISOString() ?? null;
}
