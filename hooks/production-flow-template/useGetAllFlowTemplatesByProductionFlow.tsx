import { useQuery } from "@tanstack/react-query";
import { productionFlowTemplateKeys } from "@/constants/keys/productionFlowTemplateKeys";
import { getAllFlowTemplatesByProductionFlow } from "@/service/api/productionFlowTemplate";

export default function useGetAllFlowTemplatesByProductionFlow(
  productionFlowId: number | undefined,
) {
  return useQuery({
    queryKey: productionFlowTemplateKeys.list(productionFlowId),
    queryFn: () => getAllFlowTemplatesByProductionFlow(productionFlowId!),
    enabled: !!productionFlowId,
  });
}
