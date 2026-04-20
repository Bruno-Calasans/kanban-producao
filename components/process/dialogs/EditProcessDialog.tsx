import CustomDialog from "@/components/custom/CustomDialog";
import { ProcessWithDepartament } from "@/types/database.type";
import EditProcessForm from "@/components/process/forms/EditProcessForm";

type EditProcessDialogProps = {
  process: ProcessWithDepartament;
  children?: React.ReactNode;
  hideSequenceField?: boolean;
  hideDepartamentField?: boolean;
};

export default function EditProcessDialog({
  process,
  hideSequenceField,
  hideDepartamentField,
  children,
}: EditProcessDialogProps) {
  return (
    <CustomDialog id="edit-process" title="Editar processo" trigger={children}>
      <EditProcessForm
        process={process}
        hideDepartamentField={hideDepartamentField}
        hideSequenceField={hideSequenceField}
      />
    </CustomDialog>
  );
}
