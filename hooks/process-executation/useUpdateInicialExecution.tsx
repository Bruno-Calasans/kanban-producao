import {
  updateInitialExecution,
  UpdateInitialExecutionData,
} from "@/service/api/processExecutationApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { movimentationKeys } from "@/constants/movimentationKeys";
import { processExecutationKeys } from "@/constants/processExecutationKeys";

export default function useUpdateInicialExecution() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateInitialExecutionData) => updateInitialExecution(data),
    onSuccess: ({ data: updatedExecution }) => {
      queryClient.invalidateQueries({
        queryKey: movimentationKeys.detail(updatedExecution?.movimentation_id),
      });

      queryClient.invalidateQueries({
        queryKey: processExecutationKeys.list(updatedExecution?.movimentation_id),
      });
    },
  });
}
