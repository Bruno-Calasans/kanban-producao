import { useQuery } from "@tanstack/react-query";
import { metaKeys } from "@/constants/metaKeys";
import { MovimentationDeadlinePopulated } from "@/types/database.type";
import groupAllMetasInRangeByDeadline from "@/utils/groupAllMetasInRangeByDeadline";

type UseGroupAllMetasInRangeByDeadlineProps = {
  from: Date;
  to: Date;
  deadlines: MovimentationDeadlinePopulated[];
};

export default function useGroupAllMetasInRangeByDeadline({
  from,
  to,
  deadlines,
}: UseGroupAllMetasInRangeByDeadlineProps) {
  const deadlineIds = deadlines.map((deadline) => deadline.id);

  return useQuery({
    queryKey: [...metaKeys.lists(), ...deadlineIds],
    queryFn: () => groupAllMetasInRangeByDeadline(from, to, deadlineIds),
    enabled: !!deadlines && deadlines.length > 0 && !!from && !!to,
  });
}
