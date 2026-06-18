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

  if (status == "IN_PROGRESS")
    return (
      <CustomTooltip content={DESC.deadline.inProgress}>
        <Badge className="bg-indigo-400 text-white">ANDAMENTO</Badge>
      </CustomTooltip>
    );

  if (status == "REOPEN")
    return (
      <CustomTooltip content={DESC.deadline.reopen}>
        <Badge className="bg-orange-400 text-white">REABERTO</Badge>
      </CustomTooltip>
    );

  if (status == "NOT_READY")
    return (
      <CustomTooltip content={DESC.deadline.notReady}>
        <Badge className="bg-yellow-400 text-white">AGUARDANDO</Badge>
      </CustomTooltip>
    );

  if (status == "COMPLETED_EXPIRED")
    return (
      <CustomTooltip content={DESC.deadline.completedExpired}>
        <Badge className="bg-orange-400 text-white">CONCLUÍDO</Badge>
      </CustomTooltip>
    );

  return (
    <CustomTooltip content={DESC.deadline.completed}>
      <Badge className="bg-emerald-400 text-white">CONCLUÍDO</Badge>
    </CustomTooltip>
  );
}
