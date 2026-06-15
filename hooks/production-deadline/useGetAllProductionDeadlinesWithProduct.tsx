import { useQuery } from "@tanstack/react-query";
import { productionDeadlineKeys } from "@/constants/productionDeadlineKeys";
import { getAllProductionDeadlinesWithProduct } from "@/service/api/productionDeadline";

export default function useGetAllProductionDeadlinesWithProduct() {
  return useQuery({
    queryKey: productionDeadlineKeys.lists(),
    queryFn: getAllProductionDeadlinesWithProduct,
  });
}
