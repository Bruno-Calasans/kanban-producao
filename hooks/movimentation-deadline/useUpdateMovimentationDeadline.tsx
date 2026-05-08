import {
  UpdateMovimentationDeadlineData,
  updateMovimentationDeadline,
} from "@/service/api/movimentationDeadline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { movimentationDeadlineKeys } from "@/constants/movimentationDeadlineKeys";

export default function useUpdateMovimentationDeadline() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      movimentationDeadlineId: number;
      updateData: UpdateMovimentationDeadlineData;
    }) => updateMovimentationDeadline(data.movimentationDeadlineId, data.updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: movimentationDeadlineKeys.details(),
        exact: false,
      });
    },
  });
}
