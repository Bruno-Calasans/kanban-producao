import CustomDialog from "@/components/custom/CustomDialog";
import AddButton from "@/components/custom/buttons/AddButton";
import CreateProcessForm from "@/components/process/forms/CreateProcessForm";

export default function CreateProcessExecutionDialog() {
  return (
    <CustomDialog
      id="create-process-execution"
      title="Criar nova execução"
      trigger={<AddButton label="Nova Execução" />}
    >
      <CreateProcessForm />
    </CustomDialog>
  );
}
