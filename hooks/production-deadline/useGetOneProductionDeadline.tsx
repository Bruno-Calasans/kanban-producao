import { useQuery } from "@tanstack/react-query";
import { getOneProductionDeadline } from "@/service/api/productionDeadline";
import { productionDeadlineKeys } from "@/constants/productionDeadlineKeys";

export default function useGetOneProductionDeadline(movimentationDeadlineId: number) {
  return useQuery({
    queryKey: productionDeadlineKeys.lists(),
    queryFn: () => getOneProductionDeadline(movimentationDeadlineId),
    enabled: !!movimentationDeadlineId,
  });
}
