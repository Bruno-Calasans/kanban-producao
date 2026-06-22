import { ProductionPopulated } from "@/types/database.type";
import { Badge } from "@/components/ui/badge";
import { PRODUCTION_STATUS_CONFIG } from "@/constants/config/productionStatusConfig";
import CustomTooltip from "@/components/custom/CustomTooltip";

type ProductionStatusBadgeProps = {
  production: ProductionPopulated;
};

export default function ProductionStatusBadge({ production }: ProductionStatusBadgeProps) {
  const { status } = production;
  const config = PRODUCTION_STATUS_CONFIG[status];

  return (
    <CustomTooltip content={config.tooltip} side="right">
      <Badge className={config.className}>
        {config.icon && <config.icon />}
        {config.label}
      </Badge>
    </CustomTooltip>
  );
}
