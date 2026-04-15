import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button";
import CreateProcessExecutionForm from "../forms/execution-form/CreateProcessExecutionForm";
import { ProcessState } from "@/types/database.type";

type CreateProcessExecutionDialogProps = {
  processState: ProcessState;
};

export default function CreateProcessExecutionDialog({
  processState,
}: CreateProcessExecutionDialogProps) {
  return (
    <CustomDialog
      id="create-process-execution"
      title="Criar nova execução"
      trigger={
        <Button className="bg-indigo-400 hover:bg-indigo-500" size="xs">
          Executar
        </Button>
      }
    >
      <CreateProcessExecutionForm processState={processState} />
    </CustomDialog>
  );
}
