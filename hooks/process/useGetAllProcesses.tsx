import { useQuery } from "@tanstack/react-query"
import { processKeys } from "@/constants/processKeys"
import { getAllProcesses } from "@/service/api/processApi"

export default function useGetAllProcesses() {
    return useQuery({
        queryKey: processKeys.lists(),
        queryFn: getAllProcesses,
    })

}