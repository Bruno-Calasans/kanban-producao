import { useQuery } from "@tanstack/react-query";
import { metaKeys } from "@/constants/metaKeys";
import { ProductionDeadlinePopulated } from "@/types/database.type";
import { groupAllGoalsInRangeByDeadline } from "@/utils/groupAllGoalsInRangeByDeadline";

type UseGroupAllGoalsInRangeByDeadlineProps = {
  from: Date;
  to: Date;
  deadlines: ProductionDeadlinePopulated[];
};

export default function useGroupAllGoalsInRangeByDeadline({
  from,
  to,
  deadlines,
}: UseGroupAllGoalsInRangeByDeadlineProps) {
  const deadlineIds = deadlines.map((deadline) => deadline.id);

  return useQuery({
    queryKey: [...metaKeys.lists(), ...deadlineIds],
    queryFn: () => groupAllGoalsInRangeByDeadline(from, to, deadlineIds),
    enabled: !!deadlines && deadlines.length > 0 && !!from && !!to,
  });
}
