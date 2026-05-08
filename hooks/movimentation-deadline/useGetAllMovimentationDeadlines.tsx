import { useQuery } from "@tanstack/react-query";
import { movimentationDeadlineKeys } from "@/constants/movimentationDeadlineKeys";
import { getAllMovimentationDeadlines } from "@/service/api/movimentationDeadline";

export default function useGetAllMovimentationDeadlines() {
  return useQuery({
    queryKey: movimentationDeadlineKeys.lists(),
    queryFn: getAllMovimentationDeadlines,
  });
}
