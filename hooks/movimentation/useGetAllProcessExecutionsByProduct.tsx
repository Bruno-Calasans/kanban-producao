import { getAllProcessExecutionsByProduct } from "@/service/api/movimentationApi";
import { useQuery } from "@tanstack/react-query";
import { processExecutationKeys } from "@/constants/movimentationKeys";

export default function useGetAllProcessExecutionsByProduct(productId: number | undefined) {
  return useQuery({
    queryKey: processExecutationKeys.lists(),
    queryFn: () => getAllProcessExecutionsByProduct(productId!),
    enabled: !!productId,
  });
}
