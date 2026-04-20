import { useQuery } from "@tanstack/react-query";
import { productionFlowKeys } from "@/constants/productionFlowKeys";
import { getAllActiveProductionFlows } from "@/service/api/productionFlow";

export default function useGetAllActiveProductionFlows() {
  return useQuery({
    queryKey: productionFlowKeys.lists(),
    queryFn: getAllActiveProductionFlows,
  });
}
