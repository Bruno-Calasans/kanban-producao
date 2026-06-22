import { updateProduct, UpdateProductData } from "@/service/api/productApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productKeys } from "@/constants/keys/productKeys";
import { productionKeys } from "@/constants/keys/productionKeys";

export default function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: number; updateData: UpdateProductData }) =>
      updateProduct(data.id, data.updateData),
    onSuccess: ({ data: product }) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: productionKeys.list(product.id),
      });
    },
  });
}
