import { moveToNextDepartament, MoveNextProcessDate } from "@/service/api/movimentationApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { processExecutationKeys } from "@/constants/movimentationKeys";
import { movimentationKeys } from "@/constants/productionKeys";
import { productionFlowTemplateKeys } from "@/constants/productionFlowTemplateKeys";

export default function useMoveToNextDepartament() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MoveNextProcessDate) => moveToNextDepartament(data),
    onSuccess: (data) => {
      if (data?.data) {
        const { data: processExecution } = data;

        queryClient.invalidateQueries({
          queryKey: processExecutationKeys.list(processExecution.movimentation_id),

          exact: false,
        });

        queryClient.invalidateQueries({
          queryKey: movimentationKeys.list(processExecution.movimentation_id),
          exact: false,
        });

        queryClient.invalidateQueries({
          queryKey: [
            ...productionFlowTemplateKeys.all,
            ...processExecutationKeys.all,
            processExecution.movimentation_id,
          ],
        });
      }
    },
  });
}
