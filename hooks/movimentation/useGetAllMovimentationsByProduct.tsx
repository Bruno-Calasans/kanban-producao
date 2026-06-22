import { getAllMovimentationsByProduct } from "@/service/api/movimentationApi";
import { useQuery } from "@tanstack/react-query";
import { movimentationKeys } from "@/constants/keys/movimentationKeys";

export default function useGetAllMovimentationsByProduct(productId: number | undefined) {
  return useQuery({
    queryKey: movimentationKeys.lists(),
    queryFn: () => getAllMovimentationsByProduct(productId!),
    enabled: !!productId,
  });
}
