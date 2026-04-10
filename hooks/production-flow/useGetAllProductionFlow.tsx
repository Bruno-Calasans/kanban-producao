import { useQuery } from "@tanstack/react-query"
import { productionFlowKeys } from "@/constants/productionFlowKeys"
import { getAllProductionFlows } from "@/service/api/productionFlow"

export default function useGetAllProductionFlow() {
    return useQuery({
        queryKey: productionFlowKeys.lists(),
        queryFn: getAllProductionFlows,
    })

}