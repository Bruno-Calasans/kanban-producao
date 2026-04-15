import { ProcessExecutionStatus } from "@/types/database.type";
import CustomTooltip from "@/components/custom/CustomTooltip";
import { Badge } from "@/components/ui/badge";

type ProcessExecutionStatusBadgeProps = {
  status: ProcessExecutionStatus;
};

export default function ProcessExecutionStatusBadge({ status }: ProcessExecutionStatusBadgeProps) {
  if (status == "PENDING")
    return (
      <CustomTooltip content="Processo ainda não começou">
        <Badge className="bg-amber-400 text-white">PENDENTE</Badge>
      </CustomTooltip>
    );

  if (status == "IN_PROGRESS")
    return (
      <CustomTooltip content="Processo começou, mas não terminou">
        <Badge className="bg-indigo-400 text-white">EM PROGRESSO</Badge>
      </CustomTooltip>
    );

  if (status == "ERROR")
    return (
      <CustomTooltip content="Algo deu errado">
        <Badge className="bg-gray-700-400 text-white">CANCELADO</Badge>
      </CustomTooltip>
    );

  if (status == "SKIPPED")
    return (
      <CustomTooltip content="Processo foi pulado do fluxo">
        <Badge className="bg-gray-700-400 text-white">PULADO</Badge>
      </CustomTooltip>
    );

  return (
    <CustomTooltip content="Processo terminou sem problemas">
      <Badge className="bg-emerald-400 text-white">SUCESSO</Badge>
    </CustomTooltip>
  );
}
