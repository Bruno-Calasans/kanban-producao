import { useQuery } from "@tanstack/react-query";
import { metaKeys } from "@/constants/metaKeys";
import { getAllMetasInRange } from "@/service/api/dailyGoal";

export default function useGetAllMetasInRange(fromDate: Date, toDate: Date, deadlineId: number) {
  return useQuery({
    queryKey: metaKeys.list(deadlineId),
    queryFn: () => getAllMetasInRange(fromDate, toDate, deadlineId),
    enabled: !!fromDate && !!toDate,
  });
}
