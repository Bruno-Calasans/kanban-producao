import { deleteProductLog } from "@/service/api/productLogApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { productlogKeys } from "@/constants/productLogKeys"

export function useDeleteProductLog() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: { productlogId: number }) => deleteProductLog(data.productlogId),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: productlogKeys.lists(),
                exact: false,
                refetchType: "active",
            });

        },
    })
}


