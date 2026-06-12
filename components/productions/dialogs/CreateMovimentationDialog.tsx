import CustomDialog from "@/components/custom/CustomDialog";
import AddButton from "@/components/custom/buttons/AddButton";
import CreateMovimentationForm from "@/components/productions/forms/CreateMovimentationForm";

export default function CreateMovimentationDialog() {
  return (
    <CustomDialog
      id="create-movimentation"
      title="Criar nova Produção"
      trigger={<AddButton label="Nova Produção" />}
    >
      <CreateMovimentationForm />
    </CustomDialog>
  );
}
