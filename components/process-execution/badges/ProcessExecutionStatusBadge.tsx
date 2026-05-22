import { ProcessExecutionStatus } from "@/types/database.type";
import CustomTooltip from "@/components/custom/CustomTooltip";
import { Badge } from "@/components/ui/badge";

type ProcessExecutionStatusBadgeProps = {
  status: ProcessExecutionStatus;
};

export default function ProcessExecutionStatusBadge({ status }: ProcessExecutionStatusBadgeProps) {
  if (status == "PENDING")
    return (
      <CustomTooltip content="Processo ainda não começou" side="top">
        <Badge className="bg-amber-400 text-white">PENDENTE</Badge>
      </CustomTooltip>
    );

  if (status == "IN_PROGRESS")
    return (
      <CustomTooltip content="Processo começou, mas não terminou" side="top">
        <Badge className="bg-indigo-400 text-white">FAZENDO</Badge>
      </CustomTooltip>
    );

  if (status == "ERROR")
    return (
      <CustomTooltip content="Algo deu errado" side="top">
        <Badge className="bg-gray-400 text-white">ERROR</Badge>
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
      <CustomTooltip content="Está sendo refeito" side="top">
        <Badge className="bg-orange-400 text-white">REPROCESSANDO</Badge>
      </CustomTooltip>
    );

  return (
    <CustomTooltip content="Processo terminou" side="top">
      <Badge className="bg-emerald-400 text-white">FEITO</Badge>
    </CustomTooltip>
  );
}
