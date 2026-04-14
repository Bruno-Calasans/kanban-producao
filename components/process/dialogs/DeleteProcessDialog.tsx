import CustomDialog from "@/components/custom/CustomDialog";
import CancelButton from "@/components/custom/buttons/CancelButton";
import DeleteButton from "@/components/custom/buttons/DeleteButton";
import useDeleteProcess from "@/hooks/process/useDeleteProcess";
import { toast } from "sonner";
import useDialog from "@/hooks/dialog/useDialog";
import type { ProcessWithDepartament } from "@/types/database.type";
import handleFormError from "@/utils/errorHandler";

type DeleteProcessDialogProps = {
  process: ProcessWithDepartament;
  children?: React.ReactNode;
};

export default function DeleteProcessDialog({ process, children }: DeleteProcessDialogProps) {
  const { closeDialog } = useDialog();
  const { mutateAsync, isPending } = useDeleteProcess();

  const handleDelete = async () => {
    try {
      await mutateAsync({ id: process.id });
      toast.success("Processo excluído com sucesso!");
      closeDialog("delete-process");
    } catch (error) {
      handleFormError(error, {
        default: "Erro: Não foi possível excluir o processo. Tente novamente.",
      });
    }
  };

  return (
    <CustomDialog id="delete-process" title="Excluir processo" trigger={children}>
      <div className="flex flex-col gap-2">
        <p>
          Tem certeza que deseja excluir o processo <strong>{process.name}</strong>?
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
