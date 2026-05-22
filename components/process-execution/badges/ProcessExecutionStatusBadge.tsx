import { ProcessExecutionStatus, ProcessState } from "@/types/database.type";
import CustomTooltip from "@/components/custom/CustomTooltip";
import { Badge } from "@/components/ui/badge";
import { CircleAlertIcon, TriangleAlertIcon } from "lucide-react";

type ProcessExecutionStatusBadgeProps = {
  processState: ProcessState;
};

export default function ProcessExecutionStatusBadge({
  processState,
}: ProcessExecutionStatusBadgeProps) {
  const { status, flags } = processState;

  if (status == "PENDING")
    return (
      <CustomTooltip content="Processo ainda não começou" side="top">
        <Badge className="bg-amber-400 text-white">PENDENTE</Badge>
      </CustomTooltip>
    );

  if (status == "IN_PROGRESS")
    return (
      <div className="relative w-fit cursor-default">
        <CustomTooltip
          content={flags?.hasPendingReprocess ? "Fazendo com reprocesso" : "Fazendo"}
          side="top"
        >
          <Badge className="bg-indigo-400 text-white">FAZENDO</Badge>
        </CustomTooltip>
        {flags?.hasPendingReprocess && (
          <CircleAlertIcon
            className="text-white fill-red-500 absolute -top-1.5 -right-2"
            size={18}
          />
        )}
      </div>
    );

  if (status == "ERROR")
    return (
      <CustomTooltip content="Algo deu errado" side="top">
        <Badge className="bg-red-400 text-white">ERROR</Badge>
      </CustomTooltip>
    );

  if (status == "SKIPPED")
    return (
      <CustomTooltip content="Não passou por este processo" side="top">
        <Badge className="bg-stone-400 text-white">PULADO</Badge>
      </CustomTooltip>
    );

  if (status == "REPROCESSING")
    return (
      <CustomTooltip content="Agurdando retrabalho" side="top">
        <Badge className="bg-orange-600 text-white">REPROCESSO TOTAL</Badge>
      </CustomTooltip>
    );

  return (
    <div className="relative w-fit cursor-default">
      <CustomTooltip
        content={flags?.hasReprocess ? "Terminou com reprocesso" : "Terminou normalmente"}
        side="top"
      >
        <Badge className="bg-emerald-400 text-white">FEITO</Badge>
      </CustomTooltip>
      {flags?.hasReprocess && (
        <CircleAlertIcon className="text-white fill-red-500 absolute -top-1.5 -right-2" size={18} />
      )}
    </div>
  );
}
