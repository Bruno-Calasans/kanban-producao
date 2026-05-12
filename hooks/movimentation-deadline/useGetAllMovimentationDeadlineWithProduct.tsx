import { useQuery } from "@tanstack/react-query";
import { movimentationDeadlineKeys } from "@/constants/movimentationDeadlineKeys";
import { getAllMovimentationDeadlinesWithProduct } from "@/service/api/movimentationDeadline";

export default function useGetAllMovimentationDeadlinesWithProduct() {
  return useQuery({
    queryKey: movimentationDeadlineKeys.lists(),
    queryFn: getAllMovimentationDeadlinesWithProduct,
  });
}
