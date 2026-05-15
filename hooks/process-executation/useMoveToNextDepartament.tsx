import { moveToNextDepartament, MoveNextProcessDate } from "@/service/api/processExecutationApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { processExecutationKeys } from "@/constants/processExecutationKeys";
import { movimentationKeys } from "@/constants/movimentationKeys";

export default function useMoveToNextDepartament() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MoveNextProcessDate) => moveToNextDepartament(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: processExecutationKeys.lists(),
        exact: false,
      });

      if (data) {
        queryClient.invalidateQueries({
          queryKey: movimentationKeys.list(data?.data.movimentation_id),
          exact: false,
        });
      }
    },
  });
}
