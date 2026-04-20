import { Process, ProcessWithDepartament } from "@/types/database.type";
import useUpdateProcess from "./useUpdateProcess";
import { toast } from "sonner";
import errorHandler from "@/utils/errorHandler";

type UseActiveProcessProps = {
  process: ProcessWithDepartament;
};

export default function useActiveProcess({ process }: UseActiveProcessProps) {
  const { mutateAsync: updateProcess, error, isPending } = useUpdateProcess();

  const toggleActive = async () => {
    const isActiveBefore = process.is_active;
    try {
      await updateProcess({
        id: process.id,
        updateData: {
          is_active: !process.is_active,
        },
      });
      toast.success(`Processo ${!isActiveBefore ? "ativado" : "desativado"} com sucesso.`);
    } catch (error) {
      errorHandler(error, {
        default: `Erro: não foi possível ${isActiveBefore ? "desativar" : "ativar"} o processo.`,
      });
    }
  };

  return {
    toggleActive,
    isPending,
    error,
  };
}
