import { deleteProduction, DeleteProductionData } from "@/service/api/productionApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productionKeys } from "@/constants/productionKeys";

export default function useDeleteProduction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteProductionData) => deleteProduction(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: productionKeys.lists(),
        exact: false,
        refetchType: "active",
      });
    },
  });
}
