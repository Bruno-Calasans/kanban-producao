import { getAllActiveDepartaments } from "@/service/api/departamentApi";
import { useQuery } from "@tanstack/react-query";
import { departamentKeys } from "@/constants/departamentKeys";

export default function useGetAllActiveDepartaments() {
  return useQuery({
    queryKey: departamentKeys.lists(),
    queryFn: getAllActiveDepartaments,
  });
}
