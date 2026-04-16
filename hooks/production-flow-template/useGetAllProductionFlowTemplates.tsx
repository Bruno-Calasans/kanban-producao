import { useQuery } from "@tanstack/react-query";
import { productionFlowTemplateKeys } from "@/constants/productionFlowTemplateKeys";
import { getAllProductionFlowTemplates } from "@/service/api/processFlowTemplate";

export default function useGetAllProductionFlowTemplates(productionFlowId: number) {
  return useQuery({
    queryKey: productionFlowTemplateKeys.list(productionFlowId),
    queryFn: () => getAllProductionFlowTemplates(productionFlowId),
    enabled: !!productionFlowId,
  });
}
