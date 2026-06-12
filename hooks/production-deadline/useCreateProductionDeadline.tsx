import {
  CreateProductionDeadlineData,
  createProductionnDeadline,
} from "@/service/api/productionDeadline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productionDeadlineKeys } from "@/constants/productionDeadlineKeys";

export default function useCreateProductionDeadline() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductionDeadlineData) => createProductionnDeadline(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productionDeadlineKeys.lists(),
        exact: false,
        refetchType: "active",
      });
    },
  });
}
