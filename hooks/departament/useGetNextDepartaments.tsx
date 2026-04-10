
import { useQuery } from "@tanstack/react-query"
import { departamentKeys } from "@/constants/departamentKeys"
import { getNextDepartaments } from "@/service/api/departamentApi"


export default function useGetNextDepartaments(productId: number) {
    return useQuery({
        queryKey: departamentKeys.list(productId),
        queryFn: () => getNextDepartaments(productId),
        enabled: !!productId
    })

}