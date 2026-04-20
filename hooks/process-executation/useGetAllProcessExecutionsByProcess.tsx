import { useQuery } from "@tanstack/react-query";
import { getAllExecutionsByProcess } from "@/service/api/processExecutationApi";
import { processExecutationKeys } from "@/constants/processExecutationKeys";

export default function useGetAllProcessExecutionsByProcess(processId: number) {
  return useQuery({
    queryKey: processExecutationKeys.list(processId),
    queryFn: () => getAllExecutionsByProcess(processId),
    enabled: !!processId,
  });
}
