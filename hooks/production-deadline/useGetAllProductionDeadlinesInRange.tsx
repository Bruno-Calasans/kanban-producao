import { useQuery } from "@tanstack/react-query";
import { getAllProductionDeadlinesInRange } from "@/service/api/productionDeadline";
import { productionDeadlineKeys } from "@/constants/productionDeadlineKeys";

export default function useGetAllProductionDeadlinesInRange(fromDate: Date, toDate: Date) {
  return useQuery({
    queryKey: [...productionDeadlineKeys.lists(), fromDate.toDateString(), toDate.toDateString()],
    queryFn: () => getAllProductionDeadlinesInRange(fromDate, toDate),
    enabled: !!fromDate && !!toDate,
  });
}
