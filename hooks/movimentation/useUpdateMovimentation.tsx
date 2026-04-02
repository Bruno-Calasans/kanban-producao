import { updateMovimentation, UpdateMovimentationData } from "@/service/api/movimentationApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { movimentationKeys } from "../../constants/movimentationKeys"


export default function useUpdateMovimentation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (
            data: { id: number, updateData: UpdateMovimentationData }
        ) => updateMovimentation(data.id, data.updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: movimentationKeys.lists(),
            });
        },
    });

}   