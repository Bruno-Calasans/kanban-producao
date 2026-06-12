import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { ProductionPopulated } from "@/types/database.type";
import CustomDialog from "@/components/custom/CustomDialog";
import CancelButton from "@/components/custom/buttons/CancelButton";
import DeleteButton from "@/components/custom/buttons/DeleteButton";
import useDeleteProduction from "@/hooks/production/useDeleteProduction";
import useDialog from "@/hooks/dialog/useDialog";
import { DialogID } from "@/hooks/dialog/DialogContext";

type DeleteProductionDialogProps = {
  production: ProductionPopulated;
  children?: React.ReactNode;
};

export default function DeleteProductionDialog({
  production,
  children,
}: DeleteProductionDialogProps) {
  const { closeDialog } = useDialog();
  const { mutateAsync: deleteProduction, isPending } = useDeleteProduction();
  const router = useRouter();
  const dialogId: DialogID = `delete-production-${production.id}`;

  const handleDelete = async () => {
    try {
      await deleteProduction({
        productionId: production.id,
      });
      toast.success("Produção excluída com sucesso!");
      closeDialog(dialogId);
      router.push("/productions");
    } catch (error) {
      toast.error("Erro ao excluir produção. Tente novamente.");
    }
  };

  return (
    <CustomDialog id={dialogId} title="Excluir produção" trigger={children}>
      <div className="flex flex-col gap-2">
        <p>
          Tem certeza que deseja excluir a <strong>produção {production.op}</strong> do produto{" "}
          <strong>{production.product.name}</strong>?
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
