import { ProductionDeadlinePopulated } from "@/types/database.type";
import { differenceInDays } from "date-fns";
import { HashIcon, FactoryIcon, ShirtIcon, CalendarMinus2Icon } from "lucide-react";
import ItemInfo from "@/components/custom/ItemInfo";
import DeadlineStatusBadge from "@/components/custom/badges/DeadlineStatusBadge";

type DeadlineStateMsgProps = {
  deadline: ProductionDeadlinePopulated;
  departamentAvaliableAmount: number;
  hidePlannedDateSection?: boolean;
};

export default function DeadlineStateMsg({
  deadline,
  departamentAvaliableAmount,
  hidePlannedDateSection,
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
    <div className="flex flex-col gap-4 mb-1">
      {/* Departamento e quantidade disponível */}
      <div className="flex justify-between gap-1">
        <ItemInfo
          item={{
            label: "Departamento",
            value: deadline.departament.name,
            icon: FactoryIcon,
          }}
        />
        <ItemInfo
          item={{
            label: "Quant. Disponível",
            value: departamentAvaliableAmount,
            icon: HashIcon,
          }}
        />
      </div>

      {/* Seção de Produto e OP */}
      <div className="flex justify-between gap-1">
        <ItemInfo
          vertical
          item={{
            label: "Produto",
            value: deadline.production?.product?.name,
            icon: ShirtIcon,
          }}
        />

        <ItemInfo
          vertical
          item={{
            label: "OP",
            value: deadline.production?.op,
          }}
        />
      </div>

      {/* Seção de datas */}
      {!hidePlannedDateSection && (
        <div className="flex justify-between">
          <ItemInfo
            vertical
            item={{
              label: "Data de início planejada",
              value: plannedStartDate ? plannedStartDate.toLocaleDateString() : "N/A",
              icon: CalendarMinus2Icon,
            }}
          />

          <ItemInfo
            vertical
            item={{
              label: "Data de FIM planejada",
              value: plannedEndDate ? plannedEndDate.toLocaleDateString() : "N/A",
              icon: CalendarMinus2Icon,
            }}
          />
        </div>
      )}

      {/*  Seção de dias restantes e situação */}
      <div className="flex justify-between gap-1 pb-1">
        <ItemInfo
          vertical
          item={{
            label: "Dias restantes:",
            value: remainingDays ? `${remainingDays}/${totalDays}` : "N/A",
            icon: CalendarMinus2Icon,
          }}
        />
        <ItemInfo
          vertical
          item={{
            label: "Status",
            value: <DeadlineStatusBadge isExpired={isExpired} expiredDays={expiredDays} />,
            icon: CalendarMinus2Icon,
          }}
        />
      </div>
    </div>
  );
}
