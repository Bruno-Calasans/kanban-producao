import { updateProductLog, UpdateProductLogData } from "@/service/api/productLogApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { productlogKeys } from "@/constants/productLogKeys"


export default function useUpdateProductLog() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (
            data: { id: number, updateData: UpdateProductLogData }
        ) => updateProductLog(data.id, data.updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: productlogKeys.lists(),
            });
        },
    });

}   