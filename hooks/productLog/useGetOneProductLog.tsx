
import { useQuery } from "@tanstack/react-query"
import { productlogKeys } from "@/constants/productLogKeys"
import { getOneProductLog } from "@/service/api/productLogApi"

export default function useGetOneProductLog(id: number) {
    return useQuery({
        queryKey: productlogKeys.detail(id),
        queryFn: () => getOneProductLog(id),
        enabled: !!id
    })

}