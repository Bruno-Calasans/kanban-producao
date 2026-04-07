import { useQuery } from "@tanstack/react-query"
import { productlogKeys } from "@/constants/productLogKeys"
import { getAllProductLogsByDepartament } from "@/service/api/productLogApi"

export default function useGetAllProductLogsByDepartament(departamentId: number) {
    return useQuery({
        queryKey: productlogKeys.list(departamentId),
        queryFn: () => getAllProductLogsByDepartament(departamentId),
        enabled: !!departamentId
    })

}