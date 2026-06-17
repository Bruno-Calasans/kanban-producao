import { useQuery } from "@tanstack/react-query";
import { metaKeys } from "@/constants/metaKeys";
import { ProductionDeadlinePopulated } from "@/types/database.type";
import { groupAllGoalsByDeadline } from "@/utils/groupAllGoalsInByDeadline";

type UseGroupAllGoalsInRangeByDeadlineProps = {
  deadlines: ProductionDeadlinePopulated[];
};

export default function useGroupAllGoalsInRangeByDeadline({
  deadlines,
}: UseGroupAllGoalsInRangeByDeadlineProps) {
  const deadlineIds = deadlines.map((deadline) => deadline.id);

  return useQuery({
    queryKey: [...metaKeys.lists(), ...deadlineIds],
    queryFn: () => groupAllGoalsByDeadline(deadlineIds),
    enabled: !!deadlines && deadlines.length > 0,
  });
}
