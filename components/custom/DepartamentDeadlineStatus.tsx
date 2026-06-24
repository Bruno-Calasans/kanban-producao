import {
  Departament,
  ProductionDeadlineLogPopulated,
  ProductionDeadlinePopulated,
} from "@/types/database.type";

import { CalendarCheckIcon, CalendarXIcon } from "lucide-react";
import CustomTooltip from "./CustomTooltip";

type DepartamentDeadlineStatusProps = {
  departament: Departament;
  deadlines: ProductionDeadlinePopulated[];
};

export default function DepartamentDeadlineStatus({
  departament,
  deadlines,
}: DepartamentDeadlineStatusProps) {
  if (departament.is_final) return departament.name;
  const hasDeadline = deadlines.find((d) => d.departament.id === departament.id);

  return (
    <div className="flex items-center gap-1">
      {departament.name}
      <CustomTooltip
        content={
          hasDeadline
            ? "Tem prazo definido"
            : "Sem prazo definido. É necessário para poder fazer movimentações internas"
        }
        side="top"
      >
        {hasDeadline ? (
          <CalendarCheckIcon className="text-emerald-500" size={16} />
        ) : (
          <CalendarXIcon className="text-red-600" size={16} />
        )}
      </CustomTooltip>
    </div>
  );
}
