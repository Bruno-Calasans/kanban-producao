import CustomDialog from "@/components/custom/CustomDialog";
import type { MovimentationPopulated } from "@/types/database.type";
import EditMovimentationForm from "../forms/EditMovimentationForm";

type EditMovimentationDialogProps = {
  movimentation: MovimentationPopulated;
  hideProductionFlowField?: boolean;
  children?: React.ReactNode;
};

export default function EditMovimentationDialog({
  hideProductionFlowField,
  movimentation,
  children,
}: EditMovimentationDialogProps) {
  return (
    <CustomDialog
      id={`edit-movimentation-${movimentation.id}`}
      title="Editar Movimentação"
      trigger={children}
    >
      <EditMovimentationForm
        movimentation={movimentation}
        hideProductionFlowField={hideProductionFlowField}
      />
    </CustomDialog>
  );
}
