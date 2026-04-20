import { ResponsibleWithDepartament } from "@/types/database.type";
import useUpdateResponsible from "./useUpdateResponsible";
import { toast } from "sonner";
import errorHandler from "@/utils/errorHandler";

type UseActiveResponsibleProps = {
  responsible: ResponsibleWithDepartament;
};

export default function useActiveResponsible({ responsible }: UseActiveResponsibleProps) {
  const { mutateAsync: updateResponsible, error, isPending } = useUpdateResponsible();

  const toggleActive = async () => {
    const isActiveBefore = responsible.is_active;
    try {
      await updateResponsible({
        responsibleId: responsible.id,
        updateData: {
          is_active: !responsible.is_active,
        },
      });
      toast.success(`Responsável ${!isActiveBefore ? "ativado" : "desativado"} com sucesso.`);
    } catch (error) {
      errorHandler(error, {
        default: `Erro: não foi possível ${isActiveBefore ? "desativado" : "ativar"} o responsável.`,
      });
    }
  };

  return {
    toggleActive,
    isPending,
    error,
  };
}
