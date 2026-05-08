import { useQuery } from "@tanstack/react-query";
import { movimentationDeadlineKeys } from "@/constants/movimentationDeadlineKeys";
import { getAllMovimentationDeadlinesByMovimentation } from "@/service/api/movimentationDeadline";

export default function useGetAllMovimentationDeadlinesByMovimentation(
  movimentationId: number | undefined,
) {
  return useQuery({
    queryFn: () => getAllMovimentationDeadlinesByMovimentation(movimentationId!),
    queryKey: movimentationDeadlineKeys.list(movimentationId!),
    enabled: !!movimentationId,
  });
}
