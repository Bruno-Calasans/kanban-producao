import { useQuery } from "@tanstack/react-query";
import { movimentationDeadlineKeys } from "@/constants/movimentationDeadlineKeys";
import { getAllMovimentationDeadlinesInRange } from "@/service/api/movimentationDeadline";

export default function useGetAllMovimentationDeadlineInRange(fromDate: Date, toDate: Date) {
  return useQuery({
    queryKey: movimentationDeadlineKeys.lists(),
    queryFn: () => getAllMovimentationDeadlinesInRange(fromDate, toDate),
    enabled: !!fromDate && !!toDate,
  });
}
