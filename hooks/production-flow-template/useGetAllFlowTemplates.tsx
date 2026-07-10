import { useQuery } from "@tanstack/react-query";
import { productionFlowKeys } from "@/constants/keys/productionFlowKeys";
import { getAllFlowTemplates } from "@/service/api/productionFlowTemplate";

export default function useGetAllFlowTemplates() {
  return useQuery({
    queryKey: productionFlowKeys.lists(),
    queryFn: getAllFlowTemplates,
  });
}
