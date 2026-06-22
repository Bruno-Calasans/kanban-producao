import { DeadlineStatus } from "@/utils/calcDeadlineStatus";
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

export const DEADLINE_STATUS_CONFIG: DeadlineStatusConfigItem = {
  NOT_DEFINED: {
    label: "SEM PRAZO",
    className: "bg-stone-400 text-white",
    tooltip: "Nenhum prazo definido",
  },
  EXPIRED: {
    label: (expireDays: number) => `ATRASADO (${expireDays} dias atrás)`,
    className: "bg-red-400 text-white",
    tooltip: "Prazo expirado",
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
  NOT_READY: {
    label: "AGUARDANDO",
    className: "bg-yellow-400 text-white",
    tooltip: "Prazo ainda não está pronto",
    icon: HourglassIcon,
  },
  COMPLETED_EXPIRED: {
    label: "CONCLUÍDO",
    className: "bg-orange-400 text-white",
    tooltip: "Prazo concluído com atraso",
    icon: TriangleAlertIcon,
  },
  COMPLETED: {
    label: "CONCLUÍDO",
    className: "bg-emerald-400 text-white",
    tooltip: "Prazo concluído sem atraso",
    icon: CheckIcon,
  },
} as const;
