import { deleteDepartament } from "@/service/api/departamentApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { departamentKeys } from "@/constants/keys/departamentKeys";

export default function useDeleteDepartament() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: number }) => deleteDepartament(data.id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: departamentKeys.lists(),
      });
    },
  });
}
