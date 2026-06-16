import { ProductionPopulated } from "@/types/database.type";
import { Badge } from "@/components/ui/badge";
import { DESC } from "@/constants/desc";
import CustomTooltip from "@/components/custom/CustomTooltip";

type ProductionStatusBadgeProps = {
  production: ProductionPopulated;
};

export default function ProductionStatusBadge({ production }: ProductionStatusBadgeProps) {
  const { status } = production;

  if (status == "PENDING")
    return (
      <CustomTooltip content={DESC.production.pending} side="right">
        <Badge className="bg-amber-400 text-white">PENDENTE</Badge>
      </CustomTooltip>
    );

  if (status == "IN_PROGRESS")
    return (
      <CustomTooltip content={DESC.production.inProgress} side="right">
        <Badge className="bg-indigo-400 text-white">EM PROGRESSO</Badge>
      </CustomTooltip>
    );

  if (status == "CANCELLED")
    return (
      <CustomTooltip content={DESC.production.cancelled} side="right">
        <Badge className="bg-red-400 text-white">CANCELADA</Badge>
      </CustomTooltip>
    );

  if (status == "REPROCESSING")
    return (
      <CustomTooltip content={DESC.production.reprocessing} side="right">
        <Badge className="bg-orange-400 text-white">REPROCESSANDO</Badge>
      </CustomTooltip>
    );

  return (
    <CustomTooltip content={DESC.production.completed} side="right">
      <Badge className="bg-emerald-400 text-white">CONCLUÍDO</Badge>
    </CustomTooltip>
  );
}
