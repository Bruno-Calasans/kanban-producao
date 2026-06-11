import { useQuery } from "@tanstack/react-query";
import { processExecutationKeys } from "@/constants/movimentationKeys";
import { getAllProcessExecutions } from "@/service/api/movimentationApi";

export default function useGetlAllProcessExecutions() {
  return useQuery({
    queryKey: processExecutationKeys.lists(),
    queryFn: getAllProcessExecutions,
  });
}
