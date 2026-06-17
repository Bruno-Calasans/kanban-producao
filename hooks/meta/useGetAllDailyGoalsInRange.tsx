import { useQuery } from "@tanstack/react-query";
import { dailyGoalKeys } from "@/constants/dailyGoalKeys";
import { getAllMetasInRange } from "@/service/api/dailyGoal";

export default function useGetAllDailyGoalsInRange(
  fromDate: Date,
  toDate: Date,
  deadlineId: number,
) {
  return useQuery({
    queryKey: dailyGoalKeys.list(deadlineId),
    queryFn: () => getAllMetasInRange(fromDate, toDate, deadlineId),
    enabled: !!fromDate && !!toDate,
  });
}
