import { useQuery } from "@tanstack/react-query";
import { movimentationKeys } from "@/constants/movimentationKeys";
import { getAllMovimentationExecutionsTemplates } from "@/service/api/general";
import { MovimentationPopulated } from "@/types/database.type";

export default function useGetAllMovimentationExecutionsTemplates(
  movimentations: MovimentationPopulated[],
) {
  return useQuery({
    queryKey: [...movimentationKeys.lists(), movimentations?.map(m => m.id)],
    queryFn: () => getAllMovimentationExecutionsTemplates(movimentations),
    enabled: movimentations && movimentations.length > 0,
  });
}
