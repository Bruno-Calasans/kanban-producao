import { UpdateproductionFlowData, updateProductionFlow } from "@/service/api/productionFlow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productionFlowKeys } from "@/constants/productionFlowKeys";

export default function useUpdateProductionFlow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { productionFlowId: number; updateData: UpdateproductionFlowData }) =>
      updateProductionFlow(data.productionFlowId, data.updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productionFlowKeys.lists(),
      });
    },
  });
}
