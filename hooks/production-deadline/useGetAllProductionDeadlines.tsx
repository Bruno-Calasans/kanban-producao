import { useQuery } from "@tanstack/react-query";
import { getAllProductionDeadlines } from "@/service/api/productionDeadline";
import { movimentationDeadlineKeys } from "@/constants/productionDeadlineKeys";

export default function useGetAllProductionDeadlines() {
  return useQuery({
    queryKey: movimentationDeadlineKeys.lists(),
    queryFn: getAllProductionDeadlines,
  });
}
