import formatStringToDate from "@/utils/formatStringToDate";
import { ArrowDown } from "lucide-react";

type DatesDiffProps = {
  oldDate: Date | string | null;
  newDate: Date | string | null;
};

export default function DatesDiff({ oldDate, newDate }: DatesDiffProps) {
  if (oldDate == null && newDate == null) return;

  // Acabou de criar data
  if (newDate && !oldDate) {
    return <p className="font-bold text-emerald-600">{formatStringToDate(newDate, true)} (novo)</p>;
  }

  const oldDateValue = oldDate ? new Date(oldDate).getTime() : 0;
  const newDateValue = newDate ? new Date(newDate).getTime() : 0;
  const hasChanged = oldDateValue != newDateValue;

  if (!hasChanged)
    return (
      <p className="font-bold text-stone-800">{formatStringToDate(oldDate, true)} (não mudou)</p>
    );

  return (
    <div className="flex gap-1 w-fit flex-col-reverse">
      <p className="font-bold text-red-600">{formatStringToDate(oldDate, true)} (antigo)</p>
      <ArrowDown className="self-center rotate-180" />
      <p className="font-bold text-emerald-600">{formatStringToDate(newDate, true)} (novo)</p>
    </div>
  );
}
