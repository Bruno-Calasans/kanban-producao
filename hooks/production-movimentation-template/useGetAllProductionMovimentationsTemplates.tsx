import { useQuery } from "@tanstack/react-query";
import { getAllProductionMovimentationsTemplates } from "@/service/api/general";
import { ProductionPopulated } from "@/types/database.type";
import { productionFlowTemplateKeys } from "@/constants/keys/productionFlowTemplateKeys";
import { movimentationKeys } from "@/constants/keys/movimentationKeys";

export function useGetAllProductionMovimentationsTemplates(productions: ProductionPopulated[]) {
  const productionIds = productions?.map((m) => m.id);
  return useQuery({
    queryKey: [...productionFlowTemplateKeys.all, ...movimentationKeys.all, ...productionIds],
    queryFn: () => getAllProductionMovimentationsTemplates(productions),
    enabled: !!productionIds && productionIds.length > 0,
  });
}
