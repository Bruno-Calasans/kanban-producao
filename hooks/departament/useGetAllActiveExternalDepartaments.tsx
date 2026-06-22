import { getAllActiveExternalDepartaments } from "@/service/api/departamentApi";
import { useQuery } from "@tanstack/react-query";
import { departamentKeys } from "@/constants/keys/departamentKeys";

export default function usGetAllActiveExternalDepartaments() {
  return useQuery({
    queryKey: departamentKeys.lists(),
    queryFn: getAllActiveExternalDepartaments,
  });
}
