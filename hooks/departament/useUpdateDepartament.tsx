import { updateDepartament, UpdateDepartamentData } from "@/service/api/departamentApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { departamentKeys } from "@/constants/departamentKeys"


export default function useUpdateDepartament() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (
            data: { id: number, updateData: UpdateDepartamentData }
        ) => updateDepartament(data.id, data.updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: departamentKeys.lists(),
            });
        },
    });

}   