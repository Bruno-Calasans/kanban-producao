import { useQuery } from "@tanstack/react-query";
import { getAllFlowTemplatesByDepartament } from "@/service/api/processFlowTemplate";
import { productionFlowTemplateKeys } from "@/constants/productionFlowTemplateKeys";

export default function useGetlAllFlowTemplatesByDepartament(departamentId: number) {
  return useQuery({
    queryKey: productionFlowTemplateKeys.list(departamentId),
    queryFn: () => getAllFlowTemplatesByDepartament(departamentId),
    enabled: !!departamentId,
  });
}
