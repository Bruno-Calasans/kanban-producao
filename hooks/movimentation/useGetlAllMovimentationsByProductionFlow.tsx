import { useQuery } from "@tanstack/react-query";
import { movimentationKeys } from "@/constants/movimentationKeys";
import { getAllMovimentationsByProductionFlow } from "@/service/api/movimentationApi";

export default function useGetlAllMovimentationsByProductionFlow(
  productionFlow: number | undefined,
) {
  return useQuery({
    queryKey: movimentationKeys.list(productionFlow),
    queryFn: () => getAllMovimentationsByProductionFlow(productionFlow!),
    enabled: !!productionFlow,
  });
}
