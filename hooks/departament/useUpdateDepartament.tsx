import { updateDepartament, UpdateDepartamentData } from "@/service/api/departamentApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { departamentKeys } from "./departamentKeys"

export default function useUpdateDepartament() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: UpdateDepartamentData) => updateDepartament(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: departamentKeys.lists(),
            });
        },
    });

}   