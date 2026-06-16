import { Badge } from "@/components/ui/badge";
import { DeadlineStatus } from "@/utils/calcDeadlineStatus";
import { DESC } from "@/constants/desc";
import CustomTooltip from "@/components/custom/CustomTooltip";

type ProductionDeadlineStatusBadgeProps = {
  status: DeadlineStatus;
  expiredDays: number;
};

export default function ProductionDeadlineStatusBadge({
  status,
  expiredDays,
}: ProductionDeadlineStatusBadgeProps) {
  if (status == "NOT_DEFINED")
    return (
      <CustomTooltip content={DESC.deadline.notDefined}>
        <Badge className="bg-stone-400 text-white">SEM PRAZO</Badge>
      </CustomTooltip>
    );

  if (status == "EXPIRED")
    return (
      <CustomTooltip content={DESC.deadline.expired}>
        <Badge className="bg-red-400 text-white">ATRASADO ({expiredDays} dias atrás)</Badge>
      </CustomTooltip>
    );

  if (status == "VALID")
    return (
      <CustomTooltip content={DESC.deadline.valid}>
        <Badge className="bg-indigo-400 text-white">VÁLIDO</Badge>
      </CustomTooltip>
    );

  return (
    <CustomTooltip content={DESC.deadline.completed}>
      <Badge className="bg-emerald-400 text-white">CONCLUÍDO</Badge>
    </CustomTooltip>
  );
}
