import { useQuery } from "@tanstack/react-query";
import { getAllMovimentationsByProduction } from "@/service/api/movimentationApi";
import { movimentationKeys } from "@/constants/movimentationKeys";

export default function useGetAllMovimentationsByProduction(movimentationId: number | undefined) {
  return useQuery({
    queryKey: movimentationKeys.list(movimentationId),
    queryFn: () => getAllMovimentationsByProduction(movimentationId!),
    enabled: !!movimentationId,
  });
}
