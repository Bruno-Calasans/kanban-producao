import {
  updateInitialMovimentation,
  UpdateInitialMovimentation,
} from "@/service/api/movimentationApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productionKeys } from "@/constants/productionKeys";
import { movimentationKeys } from "@/constants/movimentationKeys";

export default function useUpdateInicialMovimentation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateInitialMovimentation) => updateInitialMovimentation(data),
    onSuccess: ({ data: updatedMovimentation }) => {
      const productionId = updatedMovimentation?.production_id;

      // Atualiza produção
      queryClient.invalidateQueries({
        queryKey: productionKeys.detail(productionId),
      });

      // Atualiza todas as movimentações relacionadas com aquela movimentação
      queryClient.invalidateQueries({
        queryKey: movimentationKeys.list(productionId),
      });
    },
  });
}
