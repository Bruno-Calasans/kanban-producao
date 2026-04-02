import { getAllMovimentations } from "@/service/api/movimentationApi"
import { useQuery } from "@tanstack/react-query"
import { movimentationKeys } from "@/constants/movimentationKeys"

export default function useGetAllMovimentations() {
    return useQuery({
        queryKey: movimentationKeys.lists(),
        queryFn: getAllMovimentations,
    })

}