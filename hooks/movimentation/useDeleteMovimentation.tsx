import { deleteMovimentation } from "@/service/api/movimentationApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { movimentationKeys } from "@/constants/movimentationKeys"

export default function useDeleteMovimentation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: { id: number }) => deleteMovimentation(data.id),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: movimentationKeys.lists(),
                exact: false,
                refetchType: "active",
            });

        },
    })
}


