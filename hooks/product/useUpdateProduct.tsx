import { updateProduct, UpdateProductData } from "@/service/api/productApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { productKeys } from "@/constants/productKeys"


export default function useUpdateProduct() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (
            data: { id: number, updateData: UpdateProductData }
        ) => updateProduct(data.id, data.updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: productKeys.lists(),
            });
        },
    });

}   