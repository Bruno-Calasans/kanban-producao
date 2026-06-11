import { useQuery } from "@tanstack/react-query";
import { getAllExecutionsByProcess } from "@/service/api/movimentationApi";
import { processExecutationKeys } from "@/constants/movimentationKeys";

export default function useGetAllProcessExecutionsByProcess(processId: number) {
  return useQuery({
    queryKey: processExecutationKeys.list(processId),
    queryFn: () => getAllExecutionsByProcess(processId),
    enabled: !!processId,
  });
}
