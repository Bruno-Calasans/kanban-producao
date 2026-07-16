import { DepartamentDeadlineState } from "@/utils/calcDepartamentDeadlineState";

type ShortVersionInternalWeekDeadlineCardProps = {
  deadlineState: DepartamentDeadlineState;
  goalAmount: number;
};

export function ShortVersionInternalWeekDeadlineCard({
  deadlineState,
  goalAmount,
}: ShortVersionInternalWeekDeadlineCardProps) {
  const { production, status } = deadlineState;
  const { op, amount } = production;

  if (status == "IN_PROGRESS")
    return (
      <div className="mr-4">
        <p className="font-bold mb-1 text-md">OP: {op}</p>
        <p className="font-bold mb-1 text-md">Meta: {goalAmount}</p>
      </div>
    );

  if (status == "WAITING")
    return (
      <div>
        <p className="font-bold mb-1 text-md">OP: {op}</p>
        <p className="flex gap-0.5 items-center justify-center text-xs">
          <span className="font-bold">AGUARDANDO</span>
        </p>
      </div>
    );

  if (status == "EXPIRED")
    return (
      <div>
        <p className="font-bold mb-1 text-md">OP: {op}</p>
        <p className="font-bold mb-1 text-md">Meta: {goalAmount}</p>
      </div>
    );

  return (
    <div>
      <p className="font-bold mb-1 text-md">OP: {op}</p>
      <p className="flex gap-0.5 items-center justify-center text-xs">
        <span className="font-bold">
          Concluído: {goalAmount}/{amount}
        </span>
      </p>
    </div>
  );
}
