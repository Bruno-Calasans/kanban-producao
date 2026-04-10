import { productionFlowKeys } from "@/constants/productionFlowKeys";
import { createProductionFlowTemplate, CreateProductionFlowTemplateData } from "@/service/api/processFlowTemplate";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateProductionFlowTemplate() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateProductionFlowTemplateData[]) => createProductionFlowTemplate(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: productionFlowKeys.lists(),
                exact: false,
                refetchType: "active",
            });
        },
    });
}