
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { productionFlowKeys } from "@/constants/productionFlowKeys"
import { deleteFlowTemplates } from "@/service/api/processFlowTemplate"


export default function useDeleteProductionFlowTemplates() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: { productionFlowTemplateIds: number[] }) => deleteFlowTemplates(data.productionFlowTemplateIds),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: productionFlowKeys.lists(),
                exact: false,
                refetchType: "active",
            });

        },
    })
}


