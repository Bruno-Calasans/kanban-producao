import { createResponsible, CreateResponsibleData } from "@/service/api/responsibleApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { responsibleKeys } from "@/constants/responsibleKeys"

export default function useCreateResponsible() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateResponsibleData) => createResponsible(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: responsibleKeys.lists(),
                exact: false,
                refetchType: "active",
            });
        },
    });

}