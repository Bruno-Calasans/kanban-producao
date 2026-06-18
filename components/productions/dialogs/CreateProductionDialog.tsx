import CustomDialog from "@/components/custom/CustomDialog";
import AddButton from "@/components/custom/buttons/AddButton";
import CreateProductionForm from "@/components/productions/forms/CreateProductionForm";

export default function CreateProductionDialog() {
  return (
    <CustomDialog
      id="create-production"
      title="Criar nova Produção"
      trigger={<AddButton label="Nova Produção" />}
    >
      <CreateProductionForm />
    </CustomDialog>
  );
}
