import { getAllProcessExecutionsByProduct } from "@/service/api/processExecutationApi";
import { useQuery } from "@tanstack/react-query";
import { processExecutationKeys } from "@/constants/processExecutationKeys";

export default function useGetAllProcessExecutionsByProduct(productId: number | undefined) {
  return useQuery({
    queryKey: processExecutationKeys.lists(),
    queryFn: () => getAllProcessExecutionsByProduct(productId!),
    enabled: !!productId,
  });
}
