import { useQuery } from "@tanstack/react-query";
import { getAllProcessExecutionsByMovimentation } from "@/service/api/movimentationApi";
import { processExecutationKeys } from "@/constants/movimentationKeys";

export default function useGetAllProcessExecutionsByMovimentation(
  movimentationId: number | undefined,
) {
  return useQuery({
    queryKey: processExecutationKeys.list(movimentationId),
    queryFn: () => getAllProcessExecutionsByMovimentation(movimentationId!),
    enabled: !!movimentationId,
  });
}
