import { Badge } from "@/components/ui/badge";
import { DeadlineStatusData } from "@/utils/calcDeadlineStatus";
import { DEADLINE_STATUS_CONFIG } from "@/constants/config/deadlineStatusConfig";
import CustomTooltip from "@/components/custom/CustomTooltip";

type ProductionDeadlineStatusBadgeProps = DeadlineStatusData;

export default function ProductionDeadlineStatusBadge({
  status,
  expireDays,
  expireDaysAfterEnd,
}: ProductionDeadlineStatusBadgeProps) {
  let config = DEADLINE_STATUS_CONFIG[status];

  if (status == "COMPLETED_EXPIRED" && typeof config.label == "function") {
    config.label = config.label(Math.abs(expireDaysAfterEnd));
  }

  if (status == "EXPIRED" && typeof config.label == "function") {
    config.label = config.label(Math.abs(expireDays));
  }

  return (
    <CustomTooltip content={config.tooltip}>
      <Badge className={config.className}>
        {config.icon && <config.icon />}
        {config.label as string}
      </Badge>
    </CustomTooltip>
  );
}
