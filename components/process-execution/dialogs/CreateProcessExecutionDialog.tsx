import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button";
import CreateProcessExecutionForm from "../forms/execution-form/CreateProcessExecutionForm";
import { ProcessState, ProcessWithDepartament } from "@/types/database.type";
import { Play } from "lucide-react";

type CreateProcessExecutionDialogProps = {
  processState: ProcessState;
  nextProcess: ProcessWithDepartament;
};

export default function CreateProcessExecutionDialog({
  processState,
  nextProcess,
}: CreateProcessExecutionDialogProps) {

  return (
    <CustomDialog
      id="create-process-execution"
      title="Criar nova execução"
      trigger={
        <Button className="bg-indigo-400 hover:bg-indigo-500" size="xs">
          Executar
          <Play />
        </Button>
      }
    >
      <CreateProcessExecutionForm processState={processState} nextProcess={nextProcess} />
    </CustomDialog>
  );
}
