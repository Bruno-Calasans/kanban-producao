import { useMutation, useQueryClient } from "@tanstack/react-query";
import { movimentationKeys } from "@/constants/keys/movimentationKeys";
import { deleteMovimentation } from "@/service/api/movimentationApi";

export default function useDeleteMovimentation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteMovimentation(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: movimentationKeys.lists(),
        exact: false,
        refetchType: "active",
      });
    },
  });
}
