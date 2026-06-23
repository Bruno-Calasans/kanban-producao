import { ProductionStatus } from "@/types/database.type";
import { HourglassIcon, CheckIcon, CircleDashedIcon, RotateCcwIcon, XIcon } from "lucide-react";

type ProductionStatusConfigItem = Record<
  ProductionStatus,
  {
    label: string;
    className: string;
    tooltip: string;
    icon?: any;
  }
>;

export const PRODUCTION_STATUS_CONFIG: ProductionStatusConfigItem = {
  IN_PROGRESS: {
    label: "ANDAMENTO",
    className: "bg-indigo-400 text-white",
    tooltip: "Produção sendo executada",
    icon: CircleDashedIcon,
  },
  REPROCESSING: {
    label: "REPROCESSANDO",
    className: "bg-orange-400 text-white",
    tooltip: "Produção está em reprocesso",
    icon: RotateCcwIcon,
  },
  PENDING: {
    label: "PENDENTE",
    className: "bg-yellow-400 text-white",
    tooltip: "Produção aguardando início",
    icon: HourglassIcon,
  },
  CANCELLED: {
    label: "CANCELADA",
    className: "bg-red-400 text-white",
    tooltip: "Produção foi parada",
    icon: XIcon,
  },
  COMPLETED: {
    label: "CONCLUÍDA",
    className: "bg-emerald-400 text-white",
    tooltip: "Produção terminou",
    icon: CheckIcon,
  },
} as const;
