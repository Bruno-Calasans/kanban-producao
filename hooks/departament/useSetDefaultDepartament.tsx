import { setDefaultDepartament } from "@/service/api/departamentApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { departamentKeys } from "@/constants/departamentKeys"


export default function useSetDefaultDepartament() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (
            data: { id: number }
        ) => setDefaultDepartament(data.id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: departamentKeys.lists(),
            });
        },
    });

}   