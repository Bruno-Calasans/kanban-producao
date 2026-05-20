import { getAllActiveExternalDepartaments } from "@/service/api/departamentApi";
import { useQuery } from "@tanstack/react-query";
import { departamentKeys } from "@/constants/departamentKeys";

export default function usGetAllActiveExternalDepartaments() {
  return useQuery({
    queryKey: departamentKeys.lists(),
    queryFn: getAllActiveExternalDepartaments,
  });
}
