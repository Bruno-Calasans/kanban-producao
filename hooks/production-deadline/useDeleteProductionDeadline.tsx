import { deleteProductionDeadline } from "@/service/api/productionDeadline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productionDeadlineKeys } from "@/constants/productionDeadlineKeys";

export default function useDeleteProductionDeadline() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProductionDeadline,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: productionDeadlineKeys.lists(),
        exact: false,
        refetchType: "active",
      });
    },
  });
}
