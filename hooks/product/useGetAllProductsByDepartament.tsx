import { useQuery } from "@tanstack/react-query"
import { productKeys } from "@/constants/productKeys"
import { getAllProductsByDepartamentId } from "@/service/api/productApi"

export default function getAllProductsByDepartament(departamentId: number) {
    return useQuery({
        queryKey: productKeys.list(departamentId),
        queryFn: () => getAllProductsByDepartamentId(departamentId),
        enabled: !!departamentId
    })

}