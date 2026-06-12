import CustomDialog from "@/components/custom/CustomDialog";
import CancelButton from "@/components/custom/buttons/CancelButton";
import { toast } from "sonner";
import type { ProductionPopulated } from "@/types/database.type";
import useDialog from "@/hooks/dialog/useDialog";
import useUpdateProduction from "@/hooks/production/useUpdateProduction";
import errorHandler from "@/utils/errorHandler";
import CancelActionButton from "@/components/custom/buttons/CancelActionButton";
import { DialogID } from "@/hooks/dialog/DialogContext";

type CancelProductionDialogProps = {
  production: ProductionPopulated;
  children?: React.ReactNode;
};

export default function CancelProductionDialog({
  production,
  children,
}: CancelProductionDialogProps) {
  const dialogId: DialogID = `cancel-production-${production.id}`;
  const { closeDialog } = useDialog();
  const { mutateAsync: updateProduction, isPending } = useUpdateProduction();

  const handleCancel = async () => {
    try {
      await updateProduction({
        productionId: production.id,
        updateData: {
          status: "CANCELLED",
          updated_at: new Date().toISOString(),
        },
      });
      toast.success("Produção cancelada com sucesso!");
      closeDialog(dialogId);
    } catch (error) {
      errorHandler(error, {
        default: "Erro ao cancelar produção. Tente novamente.",
      });
    }
  };

  return (
    <CustomDialog id={dialogId} title="Cancelar produção" trigger={children}>
      <div className="flex flex-col gap-2">
        <p>
          Tem certeza que deseja cancelar a <strong>produção {production.op}</strong> do produto{" "}
          <strong>{production.product.name}</strong>?
        </p>
        <p>Essa ação não pode ser desfeita.</p>
        <p></p>
        <div className="flex flex-row mt-4 p-2 gap-2 justify-end">
          <CancelButton hiddenIcon isLoading={isPending} onClick={() => closeDialog(dialogId)} />
          <CancelActionButton
            label="Cancelar produção"
            isLoading={isPending}
            onClick={handleCancel}
          />
        </div>
      </div>
    </CustomDialog>
  );
}
