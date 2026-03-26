import { getDepartamentById } from "@/service/api/departamentApi"
import { useQuery } from "@tanstack/react-query"
import { departamentKeys } from "../../constants/departamentKeys"

export default function useGetOneDepartament(id: number) {
    return useQuery({
        queryKey: departamentKeys.detail(id),
        queryFn: () => getDepartamentById(id),
        enabled: !!id
    })

}