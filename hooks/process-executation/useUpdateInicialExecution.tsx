import { updateInitialExecution } from "@/service/api/processExecutationApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { processExecutationKeys } from "@/constants/processExecutationKeys";

export default function useUpdateInicialExecution() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { movimentationId: number; amount: number }) =>
      updateInitialExecution(data.movimentationId, data.amount),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: processExecutationKeys.lists(),
      });
    },
  });
}
