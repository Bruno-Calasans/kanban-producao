import {
  CreateProductionDeadlineLogData,
  createProductionDeadlineLog,
} from "@/service/api/productionDeadlineLogApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productionDeadlineLogKeys } from "@/constants/productionDeadlineLogKeys";

export default function useCreateProductionDeadlineLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductionDeadlineLogData) => createProductionDeadlineLog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productionDeadlineLogKeys.lists(),
        exact: false,
        refetchType: "active",
      });
    },
  });
}
