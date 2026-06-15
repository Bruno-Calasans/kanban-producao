import { useQuery } from "@tanstack/react-query";
import { getAllProductionDeadlines } from "@/service/api/productionDeadline";
import { productionDeadlineKeys } from "@/constants/productionDeadlineKeys";

export default function useGetAllProductionDeadlines() {
  return useQuery({
    queryKey: productionDeadlineKeys.lists(),
    queryFn: getAllProductionDeadlines,
  });
}
