import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduction, UpdateProductionData } from "@/service/api/productionApi";
import { productionKeys } from "@/constants/keys/productionKeys";

export default function useUpdateProduction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { productionId: number; updateData: UpdateProductionData }) =>
      updateProduction(data.productionId, data.updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productionKeys.lists(),
        exact: false,
      });
    },
  });
}
