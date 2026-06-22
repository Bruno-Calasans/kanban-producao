import { useQuery } from "@tanstack/react-query";
import { productionFlowKeys } from "@/constants/keys/productionFlowKeys";
import { getDefaultProductionFlow } from "@/service/api/productionFlow";

export default function useGetDefaultProductionFlow() {
  return useQuery({
    queryKey: productionFlowKeys.details(),
    queryFn: () => getDefaultProductionFlow(),
  });
}
