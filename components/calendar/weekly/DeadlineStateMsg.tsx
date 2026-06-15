import DeadlineStatusBadge from "@/components/custom/badges/DeadlineStatusBadge";
import { ProductionDeadlinePopulated } from "@/types/database.type";
import { differenceInDays } from "date-fns";
import {
  HashIcon,
  FactoryIcon,
  ShirtIcon,
  CalendarMinus2Icon,
  CalendarClockIcon,
} from "lucide-react";

type DeadlineStateMsgProps = {
  deadline: ProductionDeadlinePopulated;
  departamentAvaliableAmount: number;
};

export default function DeadlineStateMsg({
  deadline,
  departamentAvaliableAmount,
}: DeadlineStateMsgProps) {
  const plannedStartDate = deadline.planned_start_at
    ? new Date(deadline.planned_start_at)
    : undefined;

  const plannedEndDate = deadline.planned_end_at ? new Date(deadline.planned_end_at) : undefined;
  const today = new Date();

  const isExpired =
    plannedEndDate && plannedStartDate && plannedEndDate.getTime() < today.getTime();

  const remainingDays = plannedEndDate ? differenceInDays(plannedEndDate, today) + 1 : 0;

  // Inclue o dia de início e o dia de término no cálculo, por isso o +2 (1 para incluir o dia de início e 1 para incluir o dia de término)
  const totalDays =
    plannedEndDate && plannedStartDate ? differenceInDays(plannedEndDate, plannedStartDate) + 1 : 0;

  const expiredDays = isExpired ? differenceInDays(today, plannedEndDate) : 0;

  return (
    <div className="flex flex-col gap-3 mb-4">
      <div className="flex justify-between gap-1 mb-1">
        <div className="flex items-center gap-0.5">
          <FactoryIcon size={14} />
          <p>
            <span className="font-bold">Departamento:</span> {deadline.departament.name}
          </p>
        </div>

        {/* Quantidade disponível no departamento */}
        <div className="flex items-center gap-0.5">
          <HashIcon size={14} />
          <p>
            <span className="font-bold">Quant. Disponível:</span> {departamentAvaliableAmount}
          </p>
        </div>
      </div>

      <div className="flex justify-between gap-1">
        <div className="flex items-center gap-0.5">
          <ShirtIcon size={14} />
          <p>
            <span className="font-bold">Produto:</span> {deadline.production?.product?.name}
          </p>
        </div>
        <p>
          <span className="font-bold">OP:</span> {deadline.production?.op}
        </p>
      </div>

      <div className="flex justify-between gap-1 pb-1 mb-2">
        <div className="flex items-center gap-0.5">
          <CalendarMinus2Icon size={14} />
          <p>
            <span className="font-bold">Dias restantes:</span>{" "}
            {remainingDays ? `${remainingDays}/${totalDays}` : "N/A"}
          </p>
        </div>

        <DeadlineStatusBadge isExpired={isExpired} expiredDays={expiredDays} />
      </div>
    </div>
  );
}
