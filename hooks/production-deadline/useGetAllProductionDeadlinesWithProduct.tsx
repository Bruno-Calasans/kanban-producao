import { useQuery } from "@tanstack/react-query";
import { movimentationDeadlineKeys } from "@/constants/productionDeadlineKeys";
import { getAllProductionDeadlinesWithProduct } from "@/service/api/productionDeadline";

export default function useGetAllProductionDeadlinesWithProduct() {
  return useQuery({
    queryKey: movimentationDeadlineKeys.lists(),
    queryFn: getAllProductionDeadlinesWithProduct,
  });
}
