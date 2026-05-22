import { MovimentationPopulated, MovimentationStatus } from "@/types/database.type";
import { Badge } from "@/components/ui/badge";
import CustomTooltip from "@/components/custom/CustomTooltip";

type MovimentationStatusBadgeProps = {
  movimentation: MovimentationPopulated;
};

export default function MovimentationStatusBadge({ movimentation }: MovimentationStatusBadgeProps) {
  const { status } = movimentation;
  if (status == "PENDING")
    return (
      <CustomTooltip content="Nenhum processo em execução" side="right">
        <Badge className="bg-amber-400 text-white">PENDENTE</Badge>
      </CustomTooltip>
    );

  if (status == "IN_PROGRESS")
    return (
      <CustomTooltip content="Um ou mais processos em execução" side="right">
        <Badge className="bg-indigo-400 text-white">EM PROGRESSO</Badge>
      </CustomTooltip>
    );

  if (status == "CANCELLED")
    return (
      <CustomTooltip content="Movimentação parou" side="right">
        <Badge className="bg-red-400 text-white">CANCELADA</Badge>
      </CustomTooltip>
    );

  if (status == "REPROCESSING")
    return (
      <CustomTooltip content="Movimentação está sendo refeita" side="right">
        <Badge className="bg-orange-400 text-white">REPROCESSANDO</Badge>
      </CustomTooltip>
    );

  return (
    <CustomTooltip content="Movimentação finalizada com sucesso" side="right">
      <Badge className="bg-emerald-400 text-white">CONCLUÍDO</Badge>
    </CustomTooltip>
  );
}
