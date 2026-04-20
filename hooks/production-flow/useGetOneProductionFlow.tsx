import { useQuery } from "@tanstack/react-query";
import { productionFlowKeys } from "@/constants/productionFlowKeys";
import { getOneProductionFlow } from "@/service/api/productionFlow";

export default function useGetOneProductionFlow(productionFlowId: number) {
  return useQuery({
    queryKey: productionFlowKeys.detail(productionFlowId),
    queryFn: () => getOneProductionFlow(productionFlowId),
    enabled: !!productionFlowId,
  });
}
