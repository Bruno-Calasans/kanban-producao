import { CreateProductionFlowData, createProductionFlow } from "@/service/api/productionFlow"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { productionFlowKeys } from "@/constants/productionFlowKeys"


export default function useCreateProductionFlow() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateProductionFlowData) => createProductionFlow(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: productionFlowKeys.lists(),
                exact: false,
                refetchType: "active",
            });
        },
    });

}