import { updateResponsible, UpdateResponsibleData } from "@/service/api/responsibleApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { responsibleKeys } from "@/constants/responsibleKeys"


export default function useUpdateResponsible() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (
            data: { responsibleId: number, updateData: UpdateResponsibleData }
        ) => updateResponsible(data.responsibleId, data.updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: responsibleKeys.lists(),
            });
        },
    });

}   