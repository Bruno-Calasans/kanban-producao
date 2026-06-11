import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduction, UpdateProductionData } from "@/service/api/productionApi";
import { productionKeys } from "@/constants/productionKeys";

export default function useUpdateProduction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { movimentationId: number; updateData: UpdateProductionData }) =>
      updateProduction(data.movimentationId, data.updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productionKeys.lists(),
        exact: false,
      });
    },
  });
}
