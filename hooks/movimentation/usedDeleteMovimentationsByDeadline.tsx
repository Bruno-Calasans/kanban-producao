import { deleteMovimentationsByDeadline } from "@/service/api/movimentationApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { movimentationKeys } from "@/constants/movimentationKeys";

export default function usedDeleteMovimentationsByDeadline() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMovimentationsByDeadline,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: movimentationKeys.lists(),
        exact: false,
        refetchType: "active",
      });
    },
  });
}
