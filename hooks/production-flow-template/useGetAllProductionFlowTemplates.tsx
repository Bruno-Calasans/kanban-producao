import { useQuery } from "@tanstack/react-query"
import { productionFlowKeys } from "@/constants/productionFlowKeys"
import { getAllProductionFlowTemplates } from "@/service/api/processFlowTemplate"

export default function useGetAllProductionFlowTemplates(productionFlowId: number) {
    return useQuery({
        queryKey: productionFlowKeys.list(productionFlowId),
        queryFn: () => getAllProductionFlowTemplates(productionFlowId),
        enabled: !!productionFlowId
    })

}