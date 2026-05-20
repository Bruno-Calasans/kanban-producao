import { ProcessExecution, ProcessExecutionPopulated } from "@/types/database.type";
import CustomTooltip from "@/components/custom/CustomTooltip";
import { Badge } from "@/components/ui/badge";

type ProcessExecutionBadgeProps = {
  processExecution: ProcessExecutionPopulated;
};

export default function ProcessExecutionTypeBadge({
  processExecution,
}: ProcessExecutionBadgeProps) {
  const { type } = processExecution;

  if (type == "INIT")
    return (
      <CustomTooltip content="Primeira execução">
        <Badge>INICIAL</Badge>
      </CustomTooltip>
    );

  if (type == "REPROCESS")
    return (
      <CustomTooltip content="Voltou a um processo anterior">
        <Badge>REPROCESSO</Badge>
      </CustomTooltip>
    );

  if (type == "ADJUSTMENT")
    return (
      <CustomTooltip content="Ajuste de quantidade">
        <Badge>AJUSTE</Badge>
      </CustomTooltip>
    );

  if (type == "EXTERNAL")
    return (
      <CustomTooltip content="Movido a um processo externo">
        <Badge>EXTERNO</Badge>
      </CustomTooltip>
    );

  if (type == "RETURN")
    return (
      <CustomTooltip content="Voltou de um processo externo">
        <Badge>RETORNO</Badge>
      </CustomTooltip>
    );

  return (
    <CustomTooltip content="Avançou para o próximo processo">
      <Badge>TRANSFERÊNCIA</Badge>
    </CustomTooltip>
  );
}
