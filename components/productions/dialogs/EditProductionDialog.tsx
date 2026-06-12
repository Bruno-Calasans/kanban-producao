import CustomDialog from "@/components/custom/CustomDialog";
import type { ProductionPopulated } from "@/types/database.type";
import EditMovimentationForm from "../forms/EditProductionForm";

type EditProductionDialogProps = {
  production: ProductionPopulated;
  children?: React.ReactNode;
  hideProductionFlowField?: boolean;
};

export default function EditProductionDialog({
  production,
  hideProductionFlowField,
  children,
}: EditProductionDialogProps) {
  return (
    <CustomDialog
      id={`edit-production-${production.id}`}
      title="Editar Movimentação"
      trigger={children}
    >
      <EditMovimentationForm
        production={production}
        hideProductionFlowField={hideProductionFlowField}
      />
    </CustomDialog>
  );
}
