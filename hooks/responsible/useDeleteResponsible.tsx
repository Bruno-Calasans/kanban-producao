import { deleteResponsible } from "@/service/api/responsibleApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { responsibleKeys } from "@/constants/responsibleKeys"

export default function useDeleteResponsible() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: { id: number }) => deleteResponsible(data.id),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: responsibleKeys.lists(),
                exact: false,
                refetchType: "active",
            });

        },
    })
}


