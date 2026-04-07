
import { useQuery } from "@tanstack/react-query"
import { productlogKeys } from "@/constants/productLogKeys"
import { getAllProductLogsByProduct } from "@/service/api/productLogApi"

export default function useGetAllProductLogsByProduct(productId: number) {
    return useQuery({
        queryKey: productlogKeys.list(productId),
        queryFn: () => getAllProductLogsByProduct(productId),
        enabled: !!productId
    })

}