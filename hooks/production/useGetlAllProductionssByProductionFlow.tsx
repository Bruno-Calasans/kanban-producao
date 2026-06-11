import { useQuery } from "@tanstack/react-query";
import { getAllProductionsByProductionFlow } from "@/service/api/productionApi";
import { productionKeys } from "@/constants/productionKeys";

export default function useGetlAllProductionssByProductionFlow(productionFlow: number | undefined) {
  return useQuery({
    queryKey: productionKeys.list(productionFlow),
    queryFn: () => getAllProductionsByProductionFlow(productionFlow!),
    enabled: !!productionFlow,
  });
}
