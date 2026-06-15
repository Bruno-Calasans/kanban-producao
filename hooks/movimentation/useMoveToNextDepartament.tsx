import { moveToNextDepartament, MoveNextDepartamentData } from "@/service/api/movimentationApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { movimentationKeys } from "@/constants/movimentationKeys";
import { productionKeys } from "@/constants/productionKeys";
import { productionFlowTemplateKeys } from "@/constants/productionFlowTemplateKeys";

export default function useMoveToNextDepartament() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MoveNextDepartamentData) => moveToNextDepartament(data),
    onSuccess: (data) => {
      if (data?.data) {
        const { data: movimentation } = data;

        queryClient.invalidateQueries({
          queryKey: movimentationKeys.list(movimentation.production_id),
          exact: false,
        });

        queryClient.invalidateQueries({
          queryKey: productionKeys.list(movimentation.production_id),
          exact: false,
        });

        queryClient.invalidateQueries({
          queryKey: [
            ...productionFlowTemplateKeys.all,
            ...movimentationKeys.all,
            movimentation.production_id,
          ],
        });
      }
    },
  });
}
