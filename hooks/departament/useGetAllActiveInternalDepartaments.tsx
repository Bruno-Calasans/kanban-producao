import { getAllActiveInternalDepartaments } from "@/service/api/departamentApi";
import { useQuery } from "@tanstack/react-query";
import { departamentKeys } from "@/constants/departamentKeys";

export default function useGetAllActiveInternalDepartaments() {
  return useQuery({
    queryKey: departamentKeys.lists(),
    queryFn: getAllActiveInternalDepartaments,
  });
}
