import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button";
import { Edit2Icon, Trash2Icon, BanIcon, UndoIcon } from "lucide-react";
import { MovimentationPopulated, ProductionPopulated } from "@/types/database.type";
import DeleteProductionDialog from "@/components/productions/dialogs/DeleteProductionDialog";
import CancelProductionDialog from "@/components/productions/dialogs/CancelProductionDialog";
import EditProductionForm from "@/components/productions/forms/EditProductionForm";
import UndoMovimentationDialog from "@/components/productions/dialogs/UndoMovimentationDialog";
import { useEffect } from "react";
import useDialog from "@/hooks/dialog/useDialog";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

type ProductionHeaderActionsProps = {
  production: ProductionPopulated;
  movimentations: MovimentationPopulated[];
};

export default function ProductionHeaderActions({
  production,
  movimentations,
}: ProductionHeaderActionsProps) {
  const { openDialog } = useDialog();
  const productionStatus = production.status;
  const canEdit = productionStatus == "PENDING";
  const canDelete = productionStatus == "PENDING";
  const canCancel = productionStatus != "CANCELLED" && productionStatus != "COMPLETED";
  const canUndoMovimentation = productionStatus != "CANCELLED" && movimentations.length > 1;
  // movimentação tá na ordem crescente de data de criação
  const lastMovimentation = movimentations[0];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (canUndoMovimentation && event.ctrlKey && event.key.toLowerCase() === "z") {
        event.preventDefault();
        openDialog(`delete-movimentation-${lastMovimentation.id}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex gap-2 border-black my-3 mt-1">
      {canEdit && (
        <CustomDialog
          id={`edit-production-${production.id}`}
          title="Editar Produção"
          trigger={
            <Button className="m-0" size="xs">
              <Edit2Icon />
              Editar
            </Button>
          }
        >
          <EditProductionForm production={production} />
        </CustomDialog>
      )}

      {canUndoMovimentation && lastMovimentation && (
        <CustomDialog
          id={`delete-movimentation-${lastMovimentation.id}`}
          title="Desfazer última movimentação"
          trigger={
            <Button variant="destructive" size="xs">
              <UndoIcon />
              Desfazer <span className="font-bold text-red-900">Ctrl + Z</span>
            </Button>
          }
        >
          <UndoMovimentationDialog production={production} movimentation={lastMovimentation} />
        </CustomDialog>
      )}

      {canCancel && (
        <CustomDialog
          id={`cancel-production-${production.id}`}
          title="Editar Produção"
          trigger={
            <Button variant="destructive" className="m-0" size="xs">
              <BanIcon />
              Cancelar
            </Button>
          }
        >
          <CancelProductionDialog production={production} />
        </CustomDialog>
      )}

      {canDelete && (
        <CustomDialog
          id={`delete-production-${production.id}`}
          title="Excluir Produção"
          trigger={
            <Button variant="destructive" className="m-0" size="xs">
              <Trash2Icon />
              Excluir
            </Button>
          }
        >
          <DeleteProductionDialog production={production} />
        </CustomDialog>
      )}
    </div>
  );
}
