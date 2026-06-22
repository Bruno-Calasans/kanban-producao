import { MovimentationPopulated } from "@/types/database.type";
import { getMovimentationTypeConfig } from "@/constants/config/movimentationTypeConfig";
import { Badge } from "@/components/ui/badge";
import CustomTooltip from "@/components/custom/CustomTooltip";

type MovimentationTypeBadgeProps = {
  movimentation: MovimentationPopulated;
};

export default function ProcessExecutionTypeBadge({ movimentation }: MovimentationTypeBadgeProps) {
  const config = getMovimentationTypeConfig(movimentation);

  return (
    <CustomTooltip content={config.tooltip} side="right">
      <Badge className={config.className}>
        {config.icon && <config.icon />}
        {config.label as string}
      </Badge>
    </CustomTooltip>
  );
}
