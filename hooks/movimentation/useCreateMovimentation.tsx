import { CreateMovimentationData } from "@/service/api/movimentationApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMovimentationAction } from "@/app/actions/movimentation/create";
import { ProductionPopulated } from "@/types/database.type";
import { productionDeadlineKeys } from "@/constants/productionDeadlineKeys";
import { movimentationKeys } from "@/constants/movimentationKeys";
import { productionKeys } from "@/constants/productionKeys";

export default function useCreateMovimentation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      createData,
      production,
    }: {
      createData: CreateMovimentationData;
      production: ProductionPopulated;
    }) => createMovimentationAction(createData, production),
    onSuccess: ({ data }) => {
      // Refetch produção
      queryClient.invalidateQueries({
        queryKey: productionKeys.detail(data.production_id),
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: productionDeadlineKeys.list(data.production_id),
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: movimentationKeys.list(data.production_id),
        exact: false,
      });
    },
  });
}
