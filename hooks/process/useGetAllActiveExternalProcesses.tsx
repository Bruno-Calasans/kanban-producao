import { useQuery } from "@tanstack/react-query";
import { processKeys } from "@/constants/processKeys";
import { getAllActiveExternalProcesses } from "@/service/api/processApi";

export default function useGetAllActiveExternalProcesses() {
  return useQuery({
    queryKey: processKeys.lists(),
    queryFn: getAllActiveExternalProcesses,
  });
}
