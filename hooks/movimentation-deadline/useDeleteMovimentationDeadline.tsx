import { deleteMovimentationDeadline } from "@/service/api/movimentationDeadline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { movimentationDeadlineKeys } from "@/constants/movimentationDeadlineKeys";

export default function useDeleteMovimentationDeadline() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { movimenttionDeadlineId: number }) =>
      deleteMovimentationDeadline(data.movimenttionDeadlineId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: movimentationDeadlineKeys.lists(),
        exact: false,
        refetchType: "active",
      });
    },
  });
}
