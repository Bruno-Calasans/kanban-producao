import CustomDialog from "@/components/custom/CustomDialog";
import AddButton from "@/components/custom/buttons/AddButton";
import CreateMovimentationForm from "@/components/movimentations/forms/CreateMovimentationForm";

export default function CreateMovimentationDialog() {
  return (
    <CustomDialog
      id="create-movimentation"
      title="Criar nova Movimentação"
      trigger={<AddButton label="Nova Movimentação" />}
    >
      <CreateMovimentationForm />
    </CustomDialog>
  );
}
