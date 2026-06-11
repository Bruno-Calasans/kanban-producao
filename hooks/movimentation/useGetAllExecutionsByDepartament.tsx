import { getAllExecutionsByDepartament } from "@/service/api/movimentationApi";
import { useQuery } from "@tanstack/react-query";
import { movimentationKeys } from "@/constants/productionKeys";

export default function useGetAllExecutionsByDepartament(departamentId: number) {
  return useQuery({
    queryKey: movimentationKeys.list(departamentId),
    queryFn: () => getAllExecutionsByDepartament(departamentId),
    enabled: !!departamentId,
  });
}
