import { useQuery } from "@tanstack/react-query";
import { getAllMovimentations } from "@/service/api/movimentationApi";
import { movimentationKeys } from "@/constants/keys/movimentationKeys";

export default function useGetAllMovimentations() {
  return useQuery({
    queryKey: movimentationKeys.lists(),
    queryFn: getAllMovimentations,
  });
}
