import { MovimentationPopulated } from "@/types/database.type";
import { Badge } from "@/components/ui/badge";
import CustomTooltip from "@/components/custom/CustomTooltip";

type MovimentationStatusBadgeProps = {
  movimentation: MovimentationPopulated;
};

export default function MovimentationStatusBadge({ movimentation }: MovimentationStatusBadgeProps) {
  const { status } = movimentation;

  if (status == "PENDING")
    return (
      <CustomTooltip content="Nenhum processo em execução, exceto o inicial">
        <Badge className="bg-amber-400 text-white">PENDENTE</Badge>
      </CustomTooltip>
    );

  if (status == "IN_PROGRESS")
    return (
      <CustomTooltip content="Um ou mais processos em execução">
        <Badge className="bg-indigo-400 text-white">EM PROGRESSO</Badge>
      </CustomTooltip>
    );

  if (status == "CANCELLED")
    return (
      <CustomTooltip content="Movimentação parou">
        <Badge className="bg-red-400 text-white">CANCELADO</Badge>
      </CustomTooltip>
    );

  return (
    <CustomTooltip content="Movimentação finalizada com sucesso">
      <Badge className="bg-emerald-400 text-white">CONCLUÍDO</Badge>
    </CustomTooltip>
  );
}
