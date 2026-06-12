import { ProductionPopulated } from "@/types/database.type";
import { Badge } from "@/components/ui/badge";
import CustomTooltip from "@/components/custom/CustomTooltip";

type ProductionStatusBadgeProps = {
  production: ProductionPopulated;
};

export default function ProductionStatusBadge({ production }: ProductionStatusBadgeProps) {
  const { status } = production;

  if (status == "PENDING")
    return (
      <CustomTooltip content="Nada sendo executado" side="right">
        <Badge className="bg-amber-400 text-white">PENDENTE</Badge>
      </CustomTooltip>
    );

  if (status == "IN_PROGRESS")
    return (
      <CustomTooltip content="Em execução" side="right">
        <Badge className="bg-indigo-400 text-white">EM PROGRESSO</Badge>
      </CustomTooltip>
    );

  if (status == "CANCELLED")
    return (
      <CustomTooltip content="Produção parou" side="right">
        <Badge className="bg-red-400 text-white">CANCELADA</Badge>
      </CustomTooltip>
    );

  if (status == "REPROCESSING")
    return (
      <CustomTooltip content="Produção está sendo refeita" side="right">
        <Badge className="bg-orange-400 text-white">REPROCESSANDO</Badge>
      </CustomTooltip>
    );

  return (
    <CustomTooltip content="Produção finalizada com sucesso" side="right">
      <Badge className="bg-emerald-400 text-white">CONCLUÍDO</Badge>
    </CustomTooltip>
  );
}
