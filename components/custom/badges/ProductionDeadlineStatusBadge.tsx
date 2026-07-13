import { Badge } from "@/components/ui/badge";
import { DeadlineStatusData } from "@/utils/calcDeadlineStatus";
import { getDeadlineStatusConfig } from "@/constants/config/deadlineStatusConfig";
import { ProductionDeadlinePopulated } from "@/types/database.type";
import CustomTooltip from "@/components/custom/CustomTooltip";

type ProductionDeadlineStatusBadgeProps = {
  deadline?: ProductionDeadlinePopulated;
} & DeadlineStatusData;

export default function ProductionDeadlineStatusBadge({
  deadline,
  ...statusData
}: ProductionDeadlineStatusBadgeProps) {
  const config = getDeadlineStatusConfig(statusData, deadline);

  return (
    <CustomTooltip content={config.tooltip}>
      <Badge className={config.className}>
        {config.icon && <config.icon />}
        {config.label as string}
      </Badge>
    </CustomTooltip>
  );
}
