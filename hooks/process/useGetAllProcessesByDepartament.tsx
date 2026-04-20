import { useQuery } from "@tanstack/react-query";
import { processKeys } from "@/constants/processKeys";
import { getAllProcessesByDepartamentId } from "@/service/api/processApi";

export default function useGetAllProcessesByDepartament(departamentId: number | undefined) {
  return useQuery({
    queryKey: processKeys.list(departamentId),
    queryFn: () => getAllProcessesByDepartamentId(departamentId!),
    enabled: !!departamentId,
  });
}
