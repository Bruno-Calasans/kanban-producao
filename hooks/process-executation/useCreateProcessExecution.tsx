import { CreateProcessExecutionData } from "@/service/api/processExecutationApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { processExecutationKeys } from "@/constants/processExecutationKeys";
import { movimentationKeys } from "@/constants/movimentationKeys";
import { createExecution } from "@/app/actions/process-execution/create";
import { MovimentationPopulated } from "@/types/database.type";

export default function useCreateProcessExecution() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      createData,
      movimentation,
    }: {
      createData: CreateProcessExecutionData;
      movimentation: MovimentationPopulated;
    }) => createExecution(createData, movimentation),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: processExecutationKeys.lists(),
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: movimentationKeys.detail(data.movimentation_id),
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: movimentationKeys.list(data.movimentation_id),
        exact: false,
      });
    },
  });
}
