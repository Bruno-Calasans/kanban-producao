import { useQuery } from "@tanstack/react-query"
import { productlogKeys } from "@/constants/productLogKeys"
import { getAllProductLogs } from "@/service/api/productLogApi"

export default function useGetAllProductLogs() {
    return useQuery({
        queryKey: productlogKeys.lists(),
        queryFn: getAllProductLogs,
    })

}