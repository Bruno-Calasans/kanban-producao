import { createMovimentation, CreateMovimentationtData } from "@/service/api/movimentationApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { movimentationKeys } from "@/constants/movimentationKeys"

export default function useCreateMovimentation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateMovimentationtData) => createMovimentation(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: movimentationKeys.lists(),
                exact: false,
                refetchType: "active",
            });
        },
    });

}