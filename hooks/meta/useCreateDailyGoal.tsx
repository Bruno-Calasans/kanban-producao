import { createDailyGoal, CreateDailyGoalData } from "@/service/api/dailyGoal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { metaKeys } from "@/constants/metaKeys";

export default function useCreateMeta() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDailyGoalData) => createDailyGoal(data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: metaKeys.list(data.deadline_id),
        exact: false,
        refetchType: "active",
      });
    },
  });
}
