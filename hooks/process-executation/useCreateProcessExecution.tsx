import {
  CreateProcessExecutionData,
  createProcessExecution,
} from "@/service/api/processExecutationApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { processExecutationKeys } from "@/constants/processExecutationKeys";

export default function useCreateProcessExecution() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProcessExecutionData) => createProcessExecution(data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: processExecutationKeys.lists(),
        exact: false,
      });
    },
  });
}
