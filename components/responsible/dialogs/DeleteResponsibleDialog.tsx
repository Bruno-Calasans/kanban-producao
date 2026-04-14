import CustomDialog from "@/components/custom/CustomDialog";
import CancelButton from "@/components/custom/buttons/CancelButton";
import DeleteButton from "@/components/custom/buttons/DeleteButton";
import useDeleteResponsible from "@/hooks/responsible/useDeleteResponsible";
import { toast } from "sonner";
import type { ResponsibleWithDepartament } from "@/types/database.type";
import useDialog from "@/hooks/dialog/useDialog";
import errorHandler from "@/utils/errorHandler";

type DeleteResponsibleDialogProps = {
  responsible: ResponsibleWithDepartament;
  children?: React.ReactNode;
};

export default function DeleteResponsibleDialog({
  responsible,
  children,
}: DeleteResponsibleDialogProps) {
  const { closeDialog } = useDialog();
  const { mutateAsync, isPending } = useDeleteResponsible();

  const handleDelete = async () => {
    try {
      await mutateAsync({ id: responsible.id });
      toast.success("Responsável excluído com sucesso!");
      closeDialog("delete-responsible");
    } catch (error) {
      errorHandler(error, {
        default: "Erro: não foi possível excluir responsável. Tente novamente.",
      });
    }
  };

  return (
    <CustomDialog id="delete-responsible" title="Excluir responsável" trigger={children}>
      <div className="flex flex-col gap-2">
        <p>
          Tem certeza que deseja excluir o responsável <strong>{responsible.name}</strong>?
        </p>
        <p>Essa ação não pode ser desfeita.</p>
        <p></p>
        <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
          <CancelButton isLoading={isPending} />
          <DeleteButton isLoading={isPending} onclick={handleDelete} />
        </div>
      </div>
    </CustomDialog>
  );
}
