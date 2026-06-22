import { MovimentationPopulated, MovimentationType } from "@/types/database.type";
import {
  TriangleAlertIcon,
  FlagIcon,
  ArrowLeftRightIcon,
  RotateCwIcon,
  WrenchIcon,
  MoveUpRightIcon,
  MoveDownLeftIcon,
  RedoIcon,
} from "lucide-react";

type MovimentationTypeConfigItem = Record<
  MovimentationType,
  {
    label: string | ((...args: any) => string);
    tooltip: string;
    className?: string;
    icon?: any;
  }
>;

export function getMovimentationTypeConfig({ type, reason }: MovimentationPopulated) {
  const config: MovimentationTypeConfigItem = {
    INIT: {
      label: "INICIAL",
      tooltip: "Primeira movimentação. Criada pelo sistema.",
      icon: FlagIcon,
    },
    REPROCESS: {
      label: "REPROCESSO",
      tooltip: reason ? `Voltou no fluxo. Motivo: ${reason}` : "Voltou no fluxo",
      icon: RotateCwIcon,
    },
    ADJUSTMENT: {
      label: "AJUSTE",
      tooltip: "Quantidade foi reajustada",
      icon: WrenchIcon,
    },
    EXTERNAL: {
      label: "EXTERNO",
      tooltip: "Enviado para fora",
      icon: MoveUpRightIcon,
    },
    RETURN: {
      label: "RETORNO",
      tooltip: "Recebido de fora",
      icon: MoveDownLeftIcon,
    },
    SKIP: {
      label: "PULO",
      tooltip: "Pulou um ou mais departamentos",
      icon: RedoIcon,
    },
    TRANSFER: {
      label: "TRANSFERÊNCIA",
      tooltip: "Avançou no fluxo",
      icon: ArrowLeftRightIcon,
    },
  } as const;

  return config[type];
}
