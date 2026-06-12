import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button";
import { Edit2Icon, Trash2Icon, BanIcon } from "lucide-react";
import { ProductionPopulated } from "@/types/database.type";
import DeleteProductionDialog from "@/components/productions/dialogs/DeleteProductionDialog";
import CancelProductionDialog from "@/components/productions/dialogs/CancelProductionDialog";
import EditProductionForm from "@/components/productions/forms/EditProductionForm";

type ProductionHeaderActionsProps = {
  production: ProductionPopulated;
};

export default function ProductionHeaderActions({ production }: ProductionHeaderActionsProps) {
  const productionStatus = production.status;
  const canEdit = productionStatus == "PENDING";
  const canDelete = productionStatus == "PENDING";
  const canCancel = productionStatus != "CANCELLED" && productionStatus != "COMPLETED";

  return (
    <div className="flex gap-2 border-black my-3">
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
