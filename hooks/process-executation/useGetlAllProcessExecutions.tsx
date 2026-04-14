import { useQuery } from "@tanstack/react-query";
import { processExecutationKeys } from "@/constants/processExecutationKeys";
import { getAllProcessExecutions } from "@/service/api/processExecutationApi";

export default function useGetlAllProcessExecutions() {
  return useQuery({
    queryKey: processExecutationKeys.lists(),
    queryFn: getAllProcessExecutions,
  });
}
