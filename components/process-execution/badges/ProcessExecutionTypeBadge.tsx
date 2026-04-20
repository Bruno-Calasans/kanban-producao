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
      <CustomTooltip content="Execução inicial do fluxo">
        <Badge>INICIAL</Badge>
      </CustomTooltip>
    );

  if (type == "REPROCESS")
    return (
      <CustomTooltip content="Execução voltou ao processo anterior">
        <Badge>REPROCESSO</Badge>
      </CustomTooltip>
    );

  if (type == "ADJUSTMENT")
    return (
      <CustomTooltip content="Execução para corrigir quantidade">
        <Badge>AJUSTE</Badge>
      </CustomTooltip>
    );

  return (
    <CustomTooltip content="Execução normal">
      <Badge>TRANSFERÊNCIA</Badge>
    </CustomTooltip>
  );
}
