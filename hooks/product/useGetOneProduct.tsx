
import { useQuery } from "@tanstack/react-query"
import { productKeys } from "@/constants/productKeys"
import { getOneProduct } from "@/service/api/productApi"

export default function useGetOneProduct(productId: number) {
    return useQuery({
        queryKey: productKeys.detail(productId),
        queryFn: () => getOneProduct(productId),
        enabled: !!productId
    })

}