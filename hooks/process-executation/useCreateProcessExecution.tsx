import {
  CreateProcessExecutionData,
  createProcessExecution,
} from "@/service/api/processExecutationApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productKeys } from "@/constants/productKeys";

export default function useCreateProcessExecution() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProcessExecutionData) => createProcessExecution(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
        exact: false,
        refetchType: "active",
      });
    },
  });
}
