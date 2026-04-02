import { useQuery } from "@tanstack/react-query"
import { productKeys } from "@/constants/productKeys"
import { getAllProducts } from "@/service/api/productApi"

export default function useGetAllProducts() {
    return useQuery({
        queryKey: productKeys.lists(),
        queryFn: getAllProducts,
    })

}