import { createProduction, CreateProductionData } from "@/service/api/productionApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productionKeys } from "@/constants/keys/productionKeys";

export function useCreateProduction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductionData) => createProduction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productionKeys.lists(),
        exact: false,
        refetchType: "active",
      });
    },
  });
}
