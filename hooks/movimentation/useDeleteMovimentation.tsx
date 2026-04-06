import { deleteMovimentation } from "@/service/api/movimentationApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { movimentationKeys } from "@/constants/movimentationKeys"

export default function useDeleteMovimentation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: { movimentationId: number, productId: number }) => deleteMovimentation(data),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: movimentationKeys.lists(),
                exact: false,
                refetchType: "active",
            });

        },
    })
}


