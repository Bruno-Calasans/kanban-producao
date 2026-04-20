import { getAllExecutionsByResponsible } from "@/service/api/processExecutationApi";
import { useQuery } from "@tanstack/react-query";
import { movimentationKeys } from "@/constants/movimentationKeys";

export default function useGetAllExecutionsByResponsible(responsibleId: number) {
  return useQuery({
    queryKey: movimentationKeys.list(responsibleId),
    queryFn: () => getAllExecutionsByResponsible(responsibleId),
    enabled: !!responsibleId,
  });
}
