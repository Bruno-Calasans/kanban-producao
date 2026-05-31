import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button";
import EditMovimentationForm from "../../movimentations/forms/EditMovimentationForm";
import { Edit2Icon, Trash2Icon, BanIcon } from "lucide-react";
import DeleteMovimentationDialog from "../../movimentations/dialogs/DeleteMovimentationDialog";
import CancelMovimentationDialog from "../../movimentations/dialogs/CancelMovimentationDialog";
import { MovimentationPopulated } from "@/types/database.type";

type MovimentationHeaderActionsProps = {
  movimentation: MovimentationPopulated;
};

export default function MovimentationHeaderActions({
  movimentation,
}: MovimentationHeaderActionsProps) {
  const movimentationStatus = movimentation.status;
  const canEdit = movimentationStatus == "PENDING";
  const canDelete = movimentationStatus == "PENDING";
  const canCancel = movimentationStatus != "CANCELLED" && movimentationStatus != "COMPLETED";

  return (
    <div className="flex gap-2 border-black">
      {canEdit && (
        <CustomDialog
          id="edit-movimentation"
          title="Editar Movimentação"
          trigger={
            <Button className="m-0" size="xs">
              <Edit2Icon />
              Editar
            </Button>
          }
        >
          <EditMovimentationForm movimentation={movimentation} />
        </CustomDialog>
      )}

      {canCancel && (
        <CustomDialog
          id="cancel-movimentation"
          title="Editar Movimentação"
          trigger={
            <Button variant="destructive" className="m-0" size="xs">
              <BanIcon />
              Cancelar
            </Button>
          }
        >
          <CancelMovimentationDialog movimentation={movimentation} />
        </CustomDialog>
      )}

      {canDelete && (
        <CustomDialog
          id="delete-movimentation"
          title="Excluir Movimentação"
          trigger={
            <Button variant="destructive" className="m-0" size="xs">
              <Trash2Icon />
              Excluir
            </Button>
          }
        >
          <DeleteMovimentationDialog movimentation={movimentation} />
        </CustomDialog>
      )}
    </div>
  );
}
