import { DepartamentDeadlineState } from "@/utils/calcDepartamentDeadlineState";
import { AsteriskIcon, HashIcon, ShirtIcon, TargetIcon } from "lucide-react";

type FullVersionInternalWeekDeadlineCardProps = {
  deadlineState: DepartamentDeadlineState;
  amountDoneInThisDay: number;
  goalAmount: number;
};

export default function FullVersionInternalWeekDeadlineCard({
  deadlineState,
  goalAmount,
  amountDoneInThisDay,
}: FullVersionInternalWeekDeadlineCardProps) {
  const { status, departamentState } = deadlineState;
  const { production, avaliableAmount } = departamentState;
  const { op, amount } = production;

  if (status == "IN_PROGRESS" || status == "EXPIRED") {
    return (
      <>
        <p className="font-bold mb-1 text-md text-wrap">
          {production.product.name} | {production.op}
        </p>
        <p className="flex gap-0.5 items-center justify-center text-xs">
          <TargetIcon size={16} />
          <span className="font-bold">META DIÁRIA:</span> {goalAmount}
        </p>
        <p className="flex gap-0.5 items-center justify-center text-xs">
          <ShirtIcon size={16} />
          <span className="font-bold">META FEITA:</span> {amountDoneInThisDay}
        </p>
        <p className="flex gap-0.5 items-center justify-center text-xs">
          <AsteriskIcon size={16} />
          <span className="font-bold">RESTANTE TOTAL:</span> {avaliableAmount}
        </p>
        <p className="flex gap-0.5 items-center justify-center text-xs">
          <HashIcon size={16} />
          <span className="font-bold">TOTAL:</span>
          {amount}
        </p>
      </>
    );
  }

  if (status == "WAITING") {
    return (
      <>
        <p className="font-bold mb-1 text-md text-wrap">
          {production.product.name} | {op}
        </p>
        <p className="flex gap-0.5 items-center justify-center text-xs">
          <span className="font-bold">AGUARDANDO ENTRADA</span>
        </p>
        <p className="flex gap-0.5 items-center justify-center text-xs">
          <HashIcon size={16} />
          <span className="font-bold">TOTAL:</span>
          {amount}
        </p>
      </>
    );
  }

  return (
    <>
      <p className="font-bold mb-1 text-md text-wrap">
        {production.product.name} | {op}
      </p>
      <p className="flex gap-0.5 items-center justify-center text-xs">
        <HashIcon size={16} />
        <span className="font-bold">CONCLUÍDO</span>
        {/* {amount} */}
      </p>
    </>
  );
}
