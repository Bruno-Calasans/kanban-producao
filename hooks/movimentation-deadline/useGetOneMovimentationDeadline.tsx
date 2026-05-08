import { useQuery } from "@tanstack/react-query";
import { movimentationDeadlineKeys } from "@/constants/movimentationDeadlineKeys";
import { getOneMovimentationDeadline } from "@/service/api/movimentationDeadline";

export default function useGetOneMovimentationDeadline(movimentationDeadlineId: number) {
  return useQuery({
    queryKey: movimentationDeadlineKeys.lists(),
    queryFn: () => getOneMovimentationDeadline(movimentationDeadlineId),
    enabled: !!movimentationDeadlineId,
  });
}
