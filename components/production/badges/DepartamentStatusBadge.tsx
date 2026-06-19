import { DepartamentState } from "@/types/database.type";
import { Badge } from "@/components/ui/badge";
import { getDepartamentStatusConfig } from "@/constants/departamentStatusConfig";
import CustomTooltip from "@/components/custom/CustomTooltip";

type DepartamentStatusBadgeProps = {
  departamentState: DepartamentState;
};

export default function DepartamentStatusBadge({ departamentState }: DepartamentStatusBadgeProps) {
  const { label, tooltip, className, Icon } = getDepartamentStatusConfig(departamentState);

  return (
    <CustomTooltip content={tooltip} side="left">
      <Badge className={className}>
        {Icon && <Icon />}
        {label as string}
      </Badge>
    </CustomTooltip>
  );
}
