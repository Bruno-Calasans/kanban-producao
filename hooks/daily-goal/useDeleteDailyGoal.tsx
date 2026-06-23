import { deleteDailyGoal } from "@/service/api/dailyGoal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dailyGoalKeys } from "@/constants/keys/dailyGoalKeys";

export default function useDeleteDailyGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteDailyGoal(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: dailyGoalKeys.lists(),
      });
    },
  });
}
