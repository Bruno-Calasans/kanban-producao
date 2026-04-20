import { updateMovimentation, UpdateMovimentationData } from "@/service/api/movimentationApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { movimentationKeys } from "@/constants/movimentationKeys";
import { processExecutationKeys } from "@/constants/processExecutationKeys";

export default function useUpdateMovimentation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { movimentationId: number; updateData: UpdateMovimentationData }) =>
      updateMovimentation(data.movimentationId, data.updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: movimentationKeys.details(),
        exact: false,
      });
    },
  });
}
