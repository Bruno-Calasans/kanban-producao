import { createDailyGoal, CreateDailyGoalData } from "@/service/api/dailyGoal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dailyGoalKeys } from "@/constants/keys/dailyGoalKeys";

export default function useCreateMeta() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDailyGoalData) => createDailyGoal(data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: dailyGoalKeys.list(data.deadline_id),
        exact: false,
        refetchType: "active",
      });
    },
  });
}
