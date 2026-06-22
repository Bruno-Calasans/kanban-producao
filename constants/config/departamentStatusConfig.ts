import { DepartamentState } from "@/types/database.type";
import {
  HourglassIcon,
  CheckIcon,
  TriangleAlertIcon,
  CircleDashedIcon,
  ClockAlertIcon,
  RotateCcwIcon,
} from "lucide-react";

type DepartamentStatusConfigItem = {
  label: string | ((...args: any) => string);
  className: string;
  tooltip: string;
  Icon?: any;
};

export function getDepartamentStatusConfig({
  status,
  flags,
}: DepartamentState): DepartamentStatusConfigItem {
  const hasPendingReprocess = flags?.hasPendingReprocess;

  const config = {
    SKIPPED: {
      label: "PULADO",
      tooltip: "Departamento foi pulado",
      className: "bg-stone-400 text-white",
    },
    EXTERNAL: {
      label: (expireDays: number) => `ATRASADO (${expireDays} dias atrás)`,
      className: "bg-red-400 text-white",
      tooltip: "Prazo expirado",
      Icon: ClockAlertIcon,
    },
    IN_PROGRESS: {
      label: "ANDAMENTO",
      className: "bg-indigo-400 text-white",
      tooltip: hasPendingReprocess
        ? "Departamento trabalhando com reprocesso"
        : "Departamento trabalhando",
      Icon: hasPendingReprocess ? TriangleAlertIcon : CircleDashedIcon,
    },
    PENDING: {
      label: "PENDENTE",
      className: "bg-yellow-400 text-white",
      tooltip: "Departamento ainda não começou a trabalhar",
      Icon: HourglassIcon,
    },
    REPROCESSING: {
      label: "REABERTO",
      className: "bg-orange-400 text-white",
      tooltip: "Prazo reaberto para edição",
      Icon: RotateCcwIcon,
    },
    COMPLETED: {
      label: "CONCLUÍDO",
      className: "bg-emerald-400 text-white",
      tooltip: "Departamento concluído",
      Icon: CheckIcon,
    },
  };

  return config[status];
}
