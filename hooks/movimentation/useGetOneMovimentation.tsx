
import { useQuery } from "@tanstack/react-query"
import { departamentKeys } from "@/constants/departamentKeys"
import { getOneMovimentationById } from "@/service/api/movimentationApi"

export default function getOneMovimentation(id: number) {
    return useQuery({
        queryKey: departamentKeys.detail(id),
        queryFn: () => getOneMovimentationById(id),
        enabled: !!id
    })

}