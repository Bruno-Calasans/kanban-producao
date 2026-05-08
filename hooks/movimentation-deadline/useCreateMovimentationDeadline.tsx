import {
  CreateMovimentationDeadlineData,
  createMovimentationDeadline,
} from "@/service/api/movimentationDeadline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { movimentationDeadlineKeys } from "@/constants/movimentationDeadlineKeys";

export default function useCreateMovimentationDeadline() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMovimentationDeadlineData) => createMovimentationDeadline(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: movimentationDeadlineKeys.lists(),
        exact: false,
        refetchType: "active",
      });
    },
  });
}
