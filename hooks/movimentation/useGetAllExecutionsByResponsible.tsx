import { getAllExecutionsByResponsible } from "@/service/api/movimentationApi";
import { useQuery } from "@tanstack/react-query";
import { movimentationKeys } from "@/constants/productionKeys";

export default function useGetAllExecutionsByResponsible(responsibleId: number) {
  return useQuery({
    queryKey: movimentationKeys.list(responsibleId),
    queryFn: () => getAllExecutionsByResponsible(responsibleId),
    enabled: !!responsibleId,
  });
}
