import {
  UpdateMovimentationDeadlineData,
  updateMovimentationDeadline,
} from "@/service/api/movimentationDeadline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { movimentationDeadlineKeys } from "@/constants/movimentationDeadlineKeys";
import { productionFlowTemplateKeys } from "@/constants/productionFlowTemplateKeys";
import { processExecutationKeys } from "@/constants/movimentationKeys";

export default function useUpdateMovimentationDeadline() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      movimentationDeadlineId: number;
      updateData: UpdateMovimentationDeadlineData;
    }) => updateMovimentationDeadline(data.movimentationDeadlineId, data.updateData),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: movimentationDeadlineKeys.lists(),
        exact: false,
      });

      if (data) {
        queryClient.invalidateQueries({
          queryKey: [
            ...productionFlowTemplateKeys.all,
            ...processExecutationKeys.all,
            data.movimentation_id,
          ],
          exact: false,
        });
      }
    },
  });
}
