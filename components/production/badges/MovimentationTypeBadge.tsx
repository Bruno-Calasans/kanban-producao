import { MovimentationPopulated } from "@/types/database.type";
import CustomTooltip from "@/components/custom/CustomTooltip";
import { Badge } from "@/components/ui/badge";

type MovimentationTypeBadgeProps = {
  movimentation: MovimentationPopulated;
};

export default function ProcessExecutionTypeBadge({ movimentation }: MovimentationTypeBadgeProps) {
  const { type } = movimentation;

  if (type == "INIT")
    return (
      <CustomTooltip content="Primeira movimentação">
        <Badge>INICIAL</Badge>
      </CustomTooltip>
    );

  if (type == "REPROCESS")
    return (
      <CustomTooltip content="Refeito">
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
      <CustomTooltip content="Movido para um departamento externo">
        <Badge>EXTERNO</Badge>
      </CustomTooltip>
    );

  if (type == "RETURN")
    return (
      <CustomTooltip content="Voltou de um departamento externo">
        <Badge>RETORNO</Badge>
      </CustomTooltip>
    );

  if (type == "SKIP")
    return (
      <CustomTooltip content="Pulou um ou mais departamentos(s)">
        <Badge>PULADO</Badge>
      </CustomTooltip>
    );

  return (
    <CustomTooltip content="Avançou para o próximo departamento">
      <Badge>TRANSFERÊNCIA</Badge>
    </CustomTooltip>
  );
}
