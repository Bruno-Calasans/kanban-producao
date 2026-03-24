import { getAllDepartaments } from "@/service/api/departamentApi"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { departamentKeys } from "./departamentKeys"

export default function useGetAllDepartaments() {
    const queryClient = useQueryClient()

    return useQuery({
        queryKey: [departamentKeys.all],
        queryFn: getAllDepartaments,
    })

}