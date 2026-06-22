import { useQuery } from "@tanstack/react-query";
import { getAllDeadlinesByProduction } from "@/service/api/productionDeadline";
import { productionDeadlineKeys } from "@/constants/keys/productionDeadlineKeys";

export default function useGetAllDeadlinesByProduction(productionId: number | undefined) {
  return useQuery({
    queryFn: () => getAllDeadlinesByProduction(productionId!),
    queryKey: productionDeadlineKeys.list(productionId!),
    enabled: !!productionId,
  });
}
