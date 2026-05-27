import CustomTooltip from "@/components/custom/CustomTooltip";
import { MovimentationDeadlinePopulated } from "@/types/database.type";
import { checkDeadlineType } from "@/utils/checkDeadlineType";
import { FlagIcon, GoalIcon, Calendar1Icon } from "lucide-react";

type DeadlineTypeBadgeProps = {
  deadline: MovimentationDeadlinePopulated;
  isExpectedThisWeekDay?: boolean;
  isStartedThisWeekDay?: boolean;
};

export default function DeadlineTypeBadge({
  deadline,
  isExpectedThisWeekDay,
  isStartedThisWeekDay,
}: DeadlineTypeBadgeProps) {
  const deadlineType = checkDeadlineType(deadline);

  if (deadlineType === "ONLY_EXPECTED" && isExpectedThisWeekDay) {
    return (
      <div className="absolute top-0.5 -right-1 bg-black rounded-full flex p-0.5">
        <CustomTooltip content="Termina e começa neste dia" side="right">
          <GoalIcon size={14} className="text-white" />
        </CustomTooltip>
      </div>
    );
  }

  if (deadlineType === "RANGE" && isExpectedThisWeekDay) {
    return (
      <div className="absolute top-0.5 -right-1 bg-black rounded-full flex p-0.5">
        <CustomTooltip content="Termina neste dia" side="right">
          <FlagIcon size={14} className="text-white" />
        </CustomTooltip>
      </div>
    );
  }

  if (deadlineType === "RANGE" && isStartedThisWeekDay) {
    return (
      <div className="absolute top-0.5 -right-1 bg-black rounded-full flex p-0.5">
        <CustomTooltip content="Começa neste dia" side="right">
          <Calendar1Icon size={14} className="text-white" />
        </CustomTooltip>
      </div>
    );
  }
}
