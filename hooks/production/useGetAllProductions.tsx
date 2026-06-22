import { getAllProductions } from "@/service/api/productionApi";
import { useQuery } from "@tanstack/react-query";
import { productionKeys } from "@/constants/keys/productionKeys";

export default function useGetAllProductions() {
  return useQuery({
    queryKey: productionKeys.lists(),
    queryFn: getAllProductions,
  });
}
