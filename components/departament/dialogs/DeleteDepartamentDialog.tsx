import CustomDialog from "@/components/custom/CustomDialog";
import CancelButton from "@/components/custom/buttons/CancelButton";
import DeleteButton from "@/components/custom/buttons/DeleteButton";
import useDeleteDepartament from "@/hooks/departament/useDeleteDepartament";
import { toast } from "sonner";
import type { Departament } from "@/types/database.type";
import useDialog from "@/hooks/dialog/useDialog";
import errorHandler from "@/utils/errorHandler";

type DeleteDepartamentDialogProps = {
  departament: Departament;
  children?: React.ReactNode;
};

export default function DeleteDepartamentDialog({
  departament,
  children,
}: DeleteDepartamentDialogProps) {
  const { mutateAsync, isPending } = useDeleteDepartament();
  const { closeDialog } = useDialog();

  const handleDelete = async () => {
    try {
      await mutateAsync({ id: departament.id });
      toast.success("Departamento excluído com sucesso!");
      closeDialog("delete-departament");
    } catch (error) {
      errorHandler(error, {
        default: "Não foi possível excluir departamento. Tente novamente.",
      });
    }
  };

  return (
    <CustomDialog id="delete-departament" title="Excluir departamento" trigger={children}>
      <div className="flex flex-col gap-2">
        <p>
          Tem certeza que deseja excluir o departamento <strong>{departament.name}</strong>?
        </p>
        <p>Essa ação não pode ser desfeita.</p>
        <p></p>
        <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
          <CancelButton isLoading={isPending} onclick={() => closeDialog("delete-departament")} />
          <DeleteButton isLoading={isPending} onclick={handleDelete} />
        </div>
      </div>
    </CustomDialog>
  );
}
