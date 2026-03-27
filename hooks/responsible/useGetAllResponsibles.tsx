import { useQuery } from "@tanstack/react-query"
import { responsibleKeys } from "@/constants/responsibleKeys"
import { getAllResponsibles } from "@/service/api/responsibleApi"

export default function useGetAllResponsibles() {
    return useQuery({
        queryKey: responsibleKeys.lists(),
        queryFn: getAllResponsibles,
    })

}