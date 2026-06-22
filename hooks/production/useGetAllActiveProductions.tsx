import { getAllActiveProductions } from "@/service/api/productionApi";
import { useQuery } from "@tanstack/react-query";
import { productionKeys } from "@/constants/keys/productionKeys";

export default function useGetAllActiveProductions() {
  return useQuery({
    queryKey: productionKeys.lists(),
    queryFn: getAllActiveProductions,
  });
}
