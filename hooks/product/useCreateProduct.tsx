import { createProduct, CreateProductData } from "@/service/api/productApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { productKeys } from "@/constants/productKeys"

export default function useCreateProduct() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateProductData) => createProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: productKeys.lists(),
                exact: false,
                refetchType: "active",
            });
        },
    });

}