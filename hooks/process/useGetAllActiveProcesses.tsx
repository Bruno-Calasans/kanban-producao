import { useQuery } from "@tanstack/react-query";
import { processKeys } from "@/constants/processKeys";
import { getAllActiveProcesses } from "@/service/api/processApi";

export default function useGetAllActiveProcesses() {
  return useQuery({
    queryKey: processKeys.lists(),
    queryFn: getAllActiveProcesses,
  });
}
