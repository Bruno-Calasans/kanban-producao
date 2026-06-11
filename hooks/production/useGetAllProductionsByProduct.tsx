import { getAllProductionsByProduct } from "@/service/api/productionApi";
import { useQuery } from "@tanstack/react-query";
import { productionKeys } from "@/constants/productionKeys";

export default function useGetAllProductionsByProduct(productId: number | undefined) {
  return useQuery({
    queryKey: productionKeys.list(productId),
    queryFn: () => getAllProductionsByProduct(productId!),
    enabled: !!productId,
  });
}
