import CustomTooltip from "@/components/custom/CustomTooltip";
import { cn } from "@/lib/utils";
import { ProductionDeadlinePopulated } from "@/types/database.type";
import { checkDeadlineType } from "@/utils/checkDeadlineType";
import { FlagIcon, GoalIcon, Calendar1Icon } from "lucide-react";

type DeadlineTypeBadgeProps = {
  deadline: ProductionDeadlinePopulated;
  isExpectedThisWeekDay?: boolean;
  isStartedThisWeekDay?: boolean;
  isShort?: boolean;
};

export default function DeadlineTypeBadge({
  deadline,
  isExpectedThisWeekDay,
  isStartedThisWeekDay,
  isShort,
}: DeadlineTypeBadgeProps) {
  const deadlineType = checkDeadlineType(deadline);

  if (deadlineType === "ONLY_EXPECTED" && isExpectedThisWeekDay) {
    return (
      <div
        className={cn(
          "absolute bg-black rounded-full flex w-fit h-fit p-0.5 bottom-0.5 right-0.5",
          isShort && "top-px right-px",
        )}
      >
        <CustomTooltip content="Termina e começa neste dia" side="right">
          <GoalIcon size={14} className="text-white" />
        </CustomTooltip>
      </div>
    );
  }

  if (deadlineType === "RANGE" && isExpectedThisWeekDay) {
    return (
      <div
        className={cn(
          "absolute bg-black rounded-full flex w-fit h-fit p-0.5 bottom-0.5 right-0.5",
          isShort && "top-px right-px",
        )}
      >
        <CustomTooltip content="Termina neste dia" side="right">
          <FlagIcon size={14} className="text-white" />
        </CustomTooltip>
      </div>
    );
  }

  if (deadlineType === "RANGE" && isStartedThisWeekDay) {
    return (
      <div
        className={cn(
          "absolute bg-black rounded-full flex w-fit h-fit p-0.5 bottom-0.5 right-0.5",
          isShort && "top-px right-px",
        )}
      >
        <CustomTooltip content="Começa neste dia" side="right">
          <Calendar1Icon size={14} className="text-white " />
        </CustomTooltip>
      </div>
    );
  }
}
