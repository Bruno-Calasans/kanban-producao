import { Departament } from "@/types/database.type";
import useUpdateDepartament from "./useUpdateDepartament";
import { toast } from "sonner";
import errorHandler from "@/utils/errorHandler";

type UseActiveDepartamentProps = {
  departament: Departament;
};

export default function useActiveDepartament({ departament }: UseActiveDepartamentProps) {
  const { mutateAsync: updateDepartament, error, isPending } = useUpdateDepartament();

  const toggleActive = async () => {
    const isActiveBefore = departament.is_active;
    try {
      await updateDepartament({
        id: departament.id,
        updateData: {
          is_active: !departament.is_active,
        },
      });
      toast.success(`Departamento ${!isActiveBefore ? "ativado" : "desativado"} com sucesso.`);
    } catch (error) {
      errorHandler(error, {
        default: `Erro: não foi possível ${isActiveBefore ? "desativar" : "ativar"} o departamento.`,
      });
    }
  };

  return {
    toggleActive,
    isPending,
    error,
  };
}
