import { useQuery } from "@tanstack/react-query";
import { movimentationDeadlineKeys } from "@/constants/movimentationDeadlineKeys";
import { getOneMovmentationDeadline } from "@/service/api/movimentationDeadline";

export default function useGetOneMovimentationDeadline(movimentationDeadlineId: number) {
  return useQuery({
    queryKey: movimentationDeadlineKeys.lists(),
    queryFn: () => getOneMovmentationDeadline(movimentationDeadlineId),
    enabled: !!movimentationDeadlineId,
  });
}
