import CustomDialog from "@/components/custom/CustomDialog";
import AddButton from "@/components/custom/buttons/AddButton";
import CreateDepartamentForm from "@/components/departament/forms/CreateDepartamentForm";

export default function CreateDepartamentDialog() {
  return (
    <CustomDialog
      id="create-departament"
      title="Criar novo departamento"
      trigger={<AddButton label="Novo departamento" />}
    >
      <CreateDepartamentForm />
    </CustomDialog>
  );
}
