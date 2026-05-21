import CustomDialog from "@/components/custom/CustomDialog";
import type { MovimentationPopulated } from "@/types/database.type";
import EditProductMovimentationForm from "../forms/EditProductMovimentationForm";

type EditProductMovimentationDialogProps = {
  movimentation: MovimentationPopulated;
  children?: React.ReactNode;
};

export default function EditProductMovimentationDialog({
  movimentation,
  children,
}: EditProductMovimentationDialogProps) {
  return (
    <CustomDialog
      id={`edit-movimentation-${movimentation.id}`}
      title="Editar Movimentação do produto"
      trigger={children}
    >
      <EditProductMovimentationForm movimentation={movimentation} />
    </CustomDialog>
  );
}
