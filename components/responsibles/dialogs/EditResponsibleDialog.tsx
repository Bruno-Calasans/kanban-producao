import CustomDialog from "@/components/custom/CustomDialog";
import { ResponsibleWithDepartament } from "@/types/database.type";
import EditResponsibleForm from "@/components/responsibles/forms/EditResponsibleForm";

type EditResponsibleDialogProps = {
  responsible: ResponsibleWithDepartament;
  hideDepartamentField?: boolean;
  children?: React.ReactNode;
};

export default function EditResponsibleDialog({
  responsible,
  hideDepartamentField,
  children,
}: EditResponsibleDialogProps) {
  return (
    <CustomDialog id="edit-responsible" title="Editar Responsável" trigger={children}>
      <EditResponsibleForm responsible={responsible} hideDepartamentField={hideDepartamentField} />
    </CustomDialog>
  );
}
