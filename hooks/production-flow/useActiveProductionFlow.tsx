import { ProductionFlow } from "@/types/database.type";
import useUpdateProductionFlow from "./useUpdateProductionFlow";
import { toast } from "sonner";
import errorHandler from "@/utils/errorHandler";

type UseActiveProductionFlowProps = {
  productionFlow: ProductionFlow;
};

export default function useActiveProductionFlow({ productionFlow }: UseActiveProductionFlowProps) {
  const { mutateAsync: updateProductionflow, isPending } = useUpdateProductionFlow();

  const toggleActive = async () => {
    const isActiveBefore = productionFlow.is_active;
    try {
      await updateProductionflow({
        productionFlowId: productionFlow.id,
        updateData: {
          is_active: !productionFlow.is_active,
        },
      });
      toast.success(`Fluxo de Produção ${!isActiveBefore ? "ativado" : "desativado"} com sucesso.`);
    } catch (error) {
      errorHandler(error, {
        default: `Erro: não foi possível ${isActiveBefore ? "desativado" : "ativar"} o fluxo de produção.`,
      });
    }
  };

  return {
    toggleActive,
    isPending,
  };
}
