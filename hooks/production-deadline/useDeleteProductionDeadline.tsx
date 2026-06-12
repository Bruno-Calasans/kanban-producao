import { deleteProductionDeadline } from "@/service/api/productionDeadline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productionDeadlineKeys } from "@/constants/productionDeadlineKeys";

export default function useDeleteProductionDeadline() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { movimenttionDeadlineId: number }) =>
      deleteProductionDeadline(data.movimenttionDeadlineId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: productionDeadlineKeys.lists(),
        exact: false,
        refetchType: "active",
      });
    },
  });
}
