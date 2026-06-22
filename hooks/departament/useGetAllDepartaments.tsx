import { getAllDepartaments } from "@/service/api/departamentApi";
import { useQuery } from "@tanstack/react-query";
import { departamentKeys } from "@/constants/keys/departamentKeys";

export default function useGetAllDepartaments() {
  return useQuery({
    queryKey: departamentKeys.lists(),
    queryFn: getAllDepartaments,
  });
}
