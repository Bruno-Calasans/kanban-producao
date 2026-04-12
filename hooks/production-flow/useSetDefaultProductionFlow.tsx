import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productionFlowKeys } from "@/constants/productionFlowKeys";
import { setDefaultProductionFlow } from "@/service/api/productionFlow";

export default function useSetDefaultProductionFlow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { productionFlowId: number }) =>
      setDefaultProductionFlow(data.productionFlowId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productionFlowKeys.lists(),
      });
    },
  });
}
