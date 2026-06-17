import { useQuery } from "@tanstack/react-query";
import { getAllProductionDeadlineLogsByDeadlines } from "@/service/api/productionDeadlineLogApi";
import { productionDeadlineLogKeys } from "@/constants/productionDeadlineLogKeys";

export default function useGetAllProductionDeadlineLogsByDeadlines(deadlinesId: number[]) {
  return useQuery({
    queryFn: () => getAllProductionDeadlineLogsByDeadlines(deadlinesId!),
    queryKey: productionDeadlineLogKeys.list(deadlinesId!),
    enabled: !!deadlinesId,
  });
}
