import { getAllDepartaments } from "@/service/api/departamentApi"
import { useQuery } from "@tanstack/react-query"
import { departamentKeys } from "@/constants/departamentKeys"

export default function useGetAllDepartaments() {
    return useQuery({
        queryKey: departamentKeys.lists(),
        queryFn: getAllDepartaments,
    })

}