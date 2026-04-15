import { useQuery } from "@tanstack/react-query";
import { movimentationKeys } from "@/constants/movimentationKeys";
import { getOneMovimentationById } from "@/service/api/movimentationApi";

export default function getOneMovimentation(id: number) {
  return useQuery({
    queryKey: movimentationKeys.detail(id),
    queryFn: () => getOneMovimentationById(id),
    enabled: !!id,
  });
}
