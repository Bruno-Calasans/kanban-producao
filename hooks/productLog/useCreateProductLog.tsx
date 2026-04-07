import { createProductLog, CreateProductLogData } from "@/service/api/productLogApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { productlogKeys } from "@/constants/productLogKeys"

export default function useCreateProductLog() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateProductLogData) => createProductLog(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: productlogKeys.lists(),
                exact: false,
                refetchType: "active",
            });
        },
    });

}