import { createDepartament, CreateDepartamentData } from "@/service/api/departamentApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { departamentKeys } from "../../constants/departamentKeys"

export default function useCreateDepartament() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateDepartamentData) => createDepartament(data.name, data.order),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: departamentKeys.lists(),
                exact: false,
                refetchType: "active",
            });
        },
    });

}