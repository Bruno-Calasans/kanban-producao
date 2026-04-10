import { useQuery } from "@tanstack/react-query"
import { responsibleKeys } from "@/constants/responsibleKeys"
import { getOneResponsible } from "@/service/api/responsibleApi"

export default function useGetOneResponsible(responsibleId: number) {
    return useQuery({
        queryKey: responsibleKeys.detail(responsibleId),
        queryFn: () => getOneResponsible(responsibleId),
        enabled: !!responsibleId
    })

}