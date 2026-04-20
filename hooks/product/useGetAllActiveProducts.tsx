import { useQuery } from "@tanstack/react-query";
import { productKeys } from "@/constants/productKeys";
import { getAllActiveProducts } from "@/service/api/productApi";

export default function useGetAllActiveProducts() {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: getAllActiveProducts,
  });
}
