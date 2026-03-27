import { deleteProduct } from "@/service/api/productApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { productKeys } from "@/constants/productKeys"

export default function useDeleteProduct() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: { id: number }) => deleteProduct(data.id),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: productKeys.lists(),
                exact: false,
                refetchType: "active",
            });

        },
    })
}


