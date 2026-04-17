import { toast } from "sonner";
import useUpdateProductionFlow from "./useUpdateProductionFlow";
import errorHandler from "@/utils/errorHandler";

type UseSetDefaultProductionFlowProps = {
  productionFlowId: number;
};

export default function useSetDefaultProductionFlow({
  productionFlowId,
}: UseSetDefaultProductionFlowProps) {
  const { mutateAsync: updateProductionFlow, error, isPending } = useUpdateProductionFlow();

  const setDefault = async () => {
    if (isPending) return;
    try {
      await updateProductionFlow({
        productionFlowId,
        updateData: {
          is_default: true,
        },
      });
      toast.success("Fluxo de produção padrão atualizado com sucesso.");
    } catch (error) {
      errorHandler(error, {
        default: "Error: não foi possível definir fluxo de produção padrão.",
      });
    }
  };

  return {
    setDefault,
    isPending,
    error,
  };
}
