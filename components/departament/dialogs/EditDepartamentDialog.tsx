import CustomDialog from "@/components/custom/CustomDialog";
import EditDepartamentForm from "@/components/departament/forms/EditDepartamentForm";
import type { Departament } from "@/types/database.type";

type EditDepartamentDialogProps = {
  departament: Departament;
  children?: React.ReactNode;
  hideExternalField?: boolean;
};

export default function EditDepartamentDialog({
  departament,
  hideExternalField,
  children,
}: EditDepartamentDialogProps) {
  return (
    <CustomDialog id="edit-departament" title="Editar departamento" trigger={children}>
      <EditDepartamentForm departament={departament} hideExternalField={hideExternalField} />
    </CustomDialog>
  );
}
