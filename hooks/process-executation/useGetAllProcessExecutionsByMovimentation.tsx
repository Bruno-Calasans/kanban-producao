import { useQuery } from "@tanstack/react-query";
import { getAllProcessExecutionsByMovimentation } from "@/service/api/processExecutationApi";
import { processExecutationKeys } from "@/constants/processExecutationKeys";

export default function useGetAllProcessExecutionsByMovimentation(movimentationId: number) {
  return useQuery({
    queryKey: processExecutationKeys.list(movimentationId),
    queryFn: () => getAllProcessExecutionsByMovimentation(movimentationId),
    enabled: !!movimentationId,
  });
}
