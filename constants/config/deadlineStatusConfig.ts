import { ProductionDeadline } from "@/types/database.type";
import { DeadlineStatus, DeadlineStatusData } from "@/utils/calcDeadlineStatus";
import {
  HourglassIcon,
  CheckIcon,
  TriangleAlertIcon,
  CircleDashedIcon,
  ClockAlertIcon,
  RotateCcwIcon,
} from "lucide-react";

type DeadlineStatusConfigItem = Record<
  DeadlineStatus,
  {
    label: string | ((...args: any) => string);
    className: string;
    tooltip: string;
    icon?: any;
  }
>;

export function getDeadlineStatusConfig(
  { status, expireDays, expireDaysAfterEnd }: DeadlineStatusData,
  deadline?: ProductionDeadline,
) {
  const actulEndDate = deadline?.actual_end_at ? new Date(deadline.actual_end_at) : null;

  const DEADLINE_STATUS_CONFIG: DeadlineStatusConfigItem = {
    NOT_DEFINED: {
      label: "SEM PRAZO",
      className: "bg-stone-400 text-white",
      tooltip: "Nenhum prazo definido",
    },
    EXPIRED: {
      label: "EXPIRADO",
      className: "bg-red-400 text-white",
      tooltip: `Prazo atrasado ${Math.abs(expireDays)} dia(s) atrás`,
      icon: ClockAlertIcon,
    },
    IN_PROGRESS: {
      label: "ANDAMENTO",
      className: "bg-indigo-400 text-white",
      tooltip: "Prazo ainda não expirou",
      icon: CircleDashedIcon,
    },
    REOPEN: {
      label: "REABERTO",
      className: "bg-orange-400 text-white",
      tooltip: "Prazo reaberto para edição",
      icon: RotateCcwIcon,
    },
    WAITING: {
      label: "AGUARDANDO",
      className: "bg-yellow-400 text-white",
      tooltip: "Prazo ainda não está pronto",
      icon: HourglassIcon,
    },
    COMPLETED_EXPIRED: {
      label: "CONCLUÍDO",
      className: "bg-emerald-400 text-white",
      tooltip: `Prazo concluído com atraso dia ${actulEndDate?.toLocaleDateString()}`,
      icon: TriangleAlertIcon,
    },
    COMPLETED: {
      label: "CONCLUÍDO",
      className: "bg-emerald-400 text-white",
      tooltip: `Prazo concluído dia ${actulEndDate?.toLocaleDateString()}`,
      icon: CheckIcon,
    },
  } as const;

  return DEADLINE_STATUS_CONFIG[status];
}
