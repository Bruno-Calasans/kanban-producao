import { useMutation, useQueryClient } from "@tanstack/react-query"
import { departamentKeys } from "@/constants/departamentKeys"
import { setDefaultProcess } from "@/service/api/processApi";


export default function useSetDefaultProcess() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (
            data: { id: number }
        ) => setDefaultProcess(data.id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: departamentKeys.lists(),
            });
        },
    });

}   