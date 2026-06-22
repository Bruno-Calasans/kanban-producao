import { useQuery } from "@tanstack/react-query";
import { responsibleKeys } from "@/constants/keys/responsibleKeys";
import { getAllResponsiblesByDepartament } from "@/service/api/responsibleApi";

export function useGetAllResponsiblesByDepartament(departamentId: number) {
  return useQuery({
    queryKey: responsibleKeys.list(departamentId),
    queryFn: () => getAllResponsiblesByDepartament(departamentId),
    enabled: !!departamentId,
  });
}
