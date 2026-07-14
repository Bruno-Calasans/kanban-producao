import { Badge } from "@/components/ui/badge";
import { DeadlineStatusData } from "@/utils/calcDeadlineStatus";
import { getDeadlineStatusConfig } from "@/constants/config/deadlineStatusConfig";
import { ProductionDeadlinePopulated } from "@/types/database.type";
import CustomTooltip from "@/components/custom/CustomTooltip";

type ProductionDeadlineStatusBadgeProps = {
  deadline?: ProductionDeadlinePopulated;
  deadlineStatus: DeadlineStatusData;
};

export default function ProductionDeadlineStatusBadge({
  deadline,
  deadlineStatus,
}: ProductionDeadlineStatusBadgeProps) {
  const config = getDeadlineStatusConfig(deadlineStatus, deadline);
  return (
    <CustomTooltip content={config.tooltip}>
      <Badge className={config.className}>
        {config.icon && <config.icon />}
        {config.label as string}
      </Badge>
    </CustomTooltip>
  );
}
