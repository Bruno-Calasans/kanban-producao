import { useQuery } from "@tanstack/react-query";
import { getOneProductionById } from "@/service/api/productionApi";
import { productionKeys } from "@/constants/keys/productionKeys";

export default function useGetOneProduction(id: number) {
  return useQuery({
    queryKey: productionKeys.detail(id),
    queryFn: () => getOneProductionById(id),
    enabled: !!id,
  });
}
