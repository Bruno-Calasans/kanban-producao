import { useQuery } from "@tanstack/react-query";
import { getAllFlowTemplatesByProcess } from "@/service/api/processFlowTemplate";
import { productionFlowTemplateKeys } from "@/constants/productionFlowTemplateKeys";

export default function useGetAllTemplatesFlowByProcess(processId: number) {
  return useQuery({
    queryKey: productionFlowTemplateKeys.list(processId),
    queryFn: () => getAllFlowTemplatesByProcess(processId),
    enabled: !!processId,
  });
}
