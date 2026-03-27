import { updateProcess, UpdateProcessData } from "@/service/api/processApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { processKeys } from "@/constants/processKeys"


export default function useUpdateProcess() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (
            data: { id: number, updateData: UpdateProcessData }
        ) => updateProcess(data.id, data.updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: processKeys.lists(),
            });
        },
    });

}   