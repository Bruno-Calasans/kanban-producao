import { deleteProcess } from "@/service/api/processApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { processKeys } from "@/constants/processKeys"

export default function useDeleteProcess() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: { id: number }) => deleteProcess(data.id),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: processKeys.lists(),
                exact: false,
                refetchType: "active",
            });

        },
    })
}


