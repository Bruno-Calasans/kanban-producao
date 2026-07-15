import {
  UpdateProductionDeadlineData,
  updateProductionDeadline,
} from "@/service/api/productionDeadline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productionDeadlineKeys } from "@/constants/keys/productionDeadlineKeys";
import { productionFlowTemplateKeys } from "@/constants/keys/productionFlowTemplateKeys";
import { movimentationKeys } from "@/constants/keys/movimentationKeys";

export default function useUpdateProductionDeadline() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { deadlineId: number; updateData: UpdateProductionDeadlineData }) =>
      updateProductionDeadline(data.deadlineId, data.updateData),
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
