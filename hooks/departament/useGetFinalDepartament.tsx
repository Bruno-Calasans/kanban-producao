import { getFinalDepartament } from "@/service/api/departamentApi";
import { useQuery } from "@tanstack/react-query";
import { departamentKeys } from "@/constants/departamentKeys";

export default function useGetFinalDepartament() {
  return useQuery({
    queryKey: departamentKeys.detail("final"),
    queryFn: getFinalDepartament,
  });
}
