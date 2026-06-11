import { CreateMovimentationData } from "@/service/api/movimentationApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMovimentationAction } from "@/app/actions/movimentation/create";
import { ProductionPopulated } from "@/types/database.type";
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
      queryClient.invalidateQueries({
        queryKey: productionKeys.lists(),
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: movimentationKeys.detail(data.id),
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: movimentationKeys.list(data.id),
        exact: false,
      });
    },
  });
}
