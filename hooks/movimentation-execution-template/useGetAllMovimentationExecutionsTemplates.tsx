import { useQuery } from "@tanstack/react-query";
import { processExecutationKeys } from "@/constants/processExecutationKeys";
import { productionFlowTemplateKeys } from "@/constants/productionFlowTemplateKeys";
import { getAllMovimentationExecutionsTemplates } from "@/service/api/general";
import { MovimentationPopulated } from "@/types/database.type";

export default function useGetAllMovimentationExecutionsTemplates(
  movimentations: MovimentationPopulated[],
) {
  const movimentationIds = movimentations?.map((m) => m.id);
  return useQuery({
    queryKey: [
      ...productionFlowTemplateKeys.all,
      ...processExecutationKeys.all,
      ...movimentationIds,
    ],
    queryFn: () => getAllMovimentationExecutionsTemplates(movimentations),
    enabled: !!movimentations && movimentations.length > 0,
  });
}
