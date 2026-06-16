import { toast } from "sonner";
import { DialogID } from "@/hooks/dialog/DialogContext";
import { ProductionDeadlinePopulated } from "@/types/database.type";
import { TrashIcon } from "lucide-react";
import CustomDialog from "@/components/custom/CustomDialog";
import CancelButton from "@/components/custom/buttons/CancelButton";
import DeleteButton from "@/components/custom/buttons/DeleteButton";
import useDialog from "@/hooks/dialog/useDialog";
import errorHandler from "@/utils/errorHandler";
import useDeleteProductionDeadline from "@/hooks/production-deadline/useDeleteProductionDeadline";

type DeleteDeadlineDialogDialogProps = {
  deadline: ProductionDeadlinePopulated;
  children?: React.ReactNode;
};

export default function DeleteDeadlineDialogDialog({
  deadline,
  children,
}: DeleteDeadlineDialogDialogProps) {
  const { closeDialog } = useDialog();
  const {
    mutateAsync: deleteDeadline,
    isPending: isDeadlinePending,
    isError: deadlineError,
  } = useDeleteProductionDeadline();

  const dialogId: DialogID = `delete-deadline-${deadline.id}`;

  const handleDelete = async () => {
    try {
      await deleteDeadline(deadline.id);
      toast.success("Prazo excluído com sucesso!");
      closeDialog(dialogId);
    } catch (error) {
      errorHandler(error, {
        default: "Error: Não foi possível excluir o prazo. Tente novamente.",
      });
    }
  };

  const isPending = isDeadlinePending;
  const isError = deadlineError;

  return (
    <CustomDialog
      id={dialogId}
      title="Excluir produto"
      trigger={
        <p className="flex hover:bg-muted cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus:*:[svg]:text-accent-foreground data-[variant=destructive]:*:[svg]:text-destructive">
          <TrashIcon size={16} />
          Remover prazo
        </p>
      }
    >
      <div className="flex flex-col gap-2">
        <p>
          Tem certeza que deseja excluir o prazo do departamento{" "}
          <strong>{deadline.departament.name}</strong>?
        </p>
        <p>Essa ação não pode ser desfeita.</p>
        <p></p>
        <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
          <CancelButton isLoading={isPending} onClick={() => closeDialog(dialogId)} />
          <DeleteButton isLoading={isPending} onClick={handleDelete} />
        </div>
      </div>
    </CustomDialog>
  );
}
