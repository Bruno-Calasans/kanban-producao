import { getAllExecutionsByDepartament } from "@/service/api/processExecutationApi";
import { useQuery } from "@tanstack/react-query";
import { movimentationKeys } from "@/constants/movimentationKeys";

export default function useGetAllExecutionsByDepartament(departamentId: number) {
  return useQuery({
    queryKey: movimentationKeys.list(departamentId),
    queryFn: () => getAllExecutionsByDepartament(departamentId),
    enabled: !!departamentId,
  });
}
