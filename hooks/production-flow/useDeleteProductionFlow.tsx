import { deleteProductionFlow } from "@/service/api/productionFlow"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { productionFlowKeys } from "@/constants/productionFlowKeys"

export default function useDeleteProductionFlow() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: { id: number }) => deleteProductionFlow(data.id),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: productionFlowKeys.lists(),
                exact: false,
                refetchType: "active",
            });

        },
    })
}


