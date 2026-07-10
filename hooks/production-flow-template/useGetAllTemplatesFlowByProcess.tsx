import { useQuery } from "@tanstack/react-query";
import { getAllFlowTemplatesByProcess } from "@/service/api/productionFlowTemplate";
import { productionFlowTemplateKeys } from "@/constants/keys/productionFlowTemplateKeys";

export default function useGetAllTemplatesFlowByProcess(processId: number) {
  return useQuery({
    queryKey: productionFlowTemplateKeys.list(processId),
    queryFn: () => getAllFlowTemplatesByProcess(processId),
    enabled: !!processId,
  });
}
