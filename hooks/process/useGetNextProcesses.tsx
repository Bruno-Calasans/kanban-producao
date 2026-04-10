
import { useQuery } from "@tanstack/react-query"
import { processKeys } from "@/constants/processKeys"
import { getNextProcesses } from "@/service/api/processApi"

export default function useGetNextProcesses(productId: number) {
    return useQuery({
        queryKey: processKeys.list(productId),
        queryFn: () => getNextProcesses(productId),
        enabled: !!productId
    })

}