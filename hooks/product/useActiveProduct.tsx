import { ProductWithProductionFlow } from "@/types/database.type";
import useUpdateProduct from "./useUpdateProduct";
import { toast } from "sonner";
import errorHandler from "@/utils/errorHandler";

type UseActiveProductProps = {
  product: ProductWithProductionFlow;
};

export default function useActiveProduct({ product }: UseActiveProductProps) {
  const { mutateAsync: updateProduct, isPending } = useUpdateProduct();

  const toggleActive = async () => {
    const isActiveBefore = product.is_active;
    try {
      await updateProduct({
        id: product.id,
        updateData: {
          is_active: !product.is_active,
        },
      });
      toast.success(`Produto ${!isActiveBefore ? "ativado" : "desativado"} com sucesso.`);
    } catch (error) {
      errorHandler(error, {
        default: `Erro: não foi possível ${isActiveBefore ? "desativado" : "ativar"} o produto.`,
      });
    }
  };

  return {
    toggleActive,
    isPending,
  };
}
