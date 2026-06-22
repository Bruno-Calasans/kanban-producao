import { getAllMovimentationsByResponsible } from "@/service/api/movimentationApi";
import { useQuery } from "@tanstack/react-query";
import { movimentationKeys } from "@/constants/keys/movimentationKeys";

export default function useGetAllMovimentationsByResponsible(responsibleId: number) {
  return useQuery({
    queryKey: movimentationKeys.list(responsibleId),
    queryFn: () => getAllMovimentationsByResponsible(responsibleId),
    enabled: !!responsibleId,
  });
}
