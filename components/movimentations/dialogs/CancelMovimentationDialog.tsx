import CustomDialog from "@/components/custom/CustomDialog";
import CancelButton from "@/components/custom/buttons/CancelButton";
import DeleteButton from "@/components/custom/buttons/DeleteButton";
import useDeleteMovimentation from "@/hooks/movimentation/useDeleteMovimentation";
import { toast } from "sonner";
import type { MovimentationPopulated } from "@/types/database.type";
import useDialog from "@/hooks/dialog/useDialog";
import useUpdateMovimentation from "@/hooks/movimentation/useUpdateMovimentation";
import errorHandler from "@/utils/errorHandler";
import CancelActionButton from "@/components/custom/buttons/CancelActionButton";

type CancelMovimentationDialogProps = {
  movimentation: MovimentationPopulated;
  children?: React.ReactNode;
};

export default function CancelMovimentationDialog({
  movimentation,
  children,
}: CancelMovimentationDialogProps) {
  const { closeDialog } = useDialog();
  const { mutateAsync: updateMovimentation, isPending } = useUpdateMovimentation();

  const handleCancel = async () => {
    try {
      await updateMovimentation({
        movimentationId: movimentation.id,
        updateData: {
          status: "CANCELLED",
        },
      });
      toast.success("Movimentação cancelada com sucesso!");
      closeDialog("delete-movimentation");
    } catch (error) {
      errorHandler(error, {
        default: "Erro ao cancelar movimentação. Tente novamente.",
      });
    }
  };

  return (
    <CustomDialog id="cancel-movimentation" title="Cancelar movimentação" trigger={children}>
      <div className="flex flex-col gap-2">
        <p>
          Tem certeza que deseja cancelar a <strong>movimentação #{movimentation.id}</strong> do
          produto <strong>{movimentation.product.name}</strong>?
        </p>
        <p>Essa ação não pode ser desfeita.</p>
        <p></p>
        <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
          <CancelButton
            hiddenIcon
            isLoading={isPending}
            onclick={() => closeDialog("cancel-movimentation")}
          />
          <CancelActionButton
            label="Cancelar movimentação"
            isLoading={isPending}
            onclick={handleCancel}
          />
        </div>
      </div>
    </CustomDialog>
  );
}
