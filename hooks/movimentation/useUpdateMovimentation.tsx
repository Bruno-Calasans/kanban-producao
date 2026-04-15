import { updateMovimentation, UpdateMovimentationData } from "@/service/api/movimentationApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { movimentationKeys } from "@/constants/movimentationKeys";

export default function useUpdateMovimentation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { movimentationId: number; updateData: UpdateMovimentationData }) =>
      updateMovimentation(data.movimentationId, data.updateData),
    onSuccess: ({ data: movimentation }) => {
      queryClient.invalidateQueries({
        queryKey: movimentationKeys.detail(movimentation.id),
        exact: false,
      });
    },
  });
}
