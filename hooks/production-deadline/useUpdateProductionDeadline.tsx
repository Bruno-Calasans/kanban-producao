import {
  UpdateProductionDeadlineData,
  updateProductionDeadline,
} from "@/service/api/productionDeadline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productionDeadlineKeys } from "@/constants/productionDeadlineKeys";
import { productionFlowTemplateKeys } from "@/constants/productionFlowTemplateKeys";
import { movimentationKeys } from "@/constants/movimentationKeys";

export default function useUpdateProductionDeadline() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      movimentationDeadlineId: number;
      updateData: UpdateProductionDeadlineData;
    }) => updateProductionDeadline(data.movimentationDeadlineId, data.updateData),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: productionDeadlineKeys.lists(),
        exact: false,
      });

      if (data) {
        queryClient.invalidateQueries({
          queryKey: [
            ...productionFlowTemplateKeys.all,
            ...movimentationKeys.all,
            data.production_id,
          ],
          exact: false,
        });
      }
    },
  });
}
