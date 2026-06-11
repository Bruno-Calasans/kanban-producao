import { updateMovimentation, UpdateMovimentationData } from "@/service/api/movimentationApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { movimentationKeys } from "@/constants/movimentationKeys";

export default function useUpdateMovimentation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { movimentationId: number; updateData: UpdateMovimentationData }) =>
      updateMovimentation(data.movimentationId, data.updateData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: movimentationKeys.detail(data.data?.id),
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: movimentationKeys.lists(),
        exact: false,
      });
    },
  });
}
