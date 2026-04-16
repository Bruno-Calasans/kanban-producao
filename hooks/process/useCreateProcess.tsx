import { createProcess, CreateProcesstData } from "@/service/api/processApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { processKeys } from "@/constants/processKeys"

export default function useCreateProcess() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateProcesstData) => createProcess(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: processKeys.lists(),
                exact: false,
                refetchType: "active",
            });
        },
    });

}