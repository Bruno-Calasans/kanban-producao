import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button";
import { ProcessState } from "@/types/database.type";
import { RotateCcwIcon } from "lucide-react";
import CreateReprocessForm from "../forms/reprocess-form/CreateReprocessForm";

type CreateReprocessExecutionDialogProps = {
  processState: ProcessState;
  processStates: ProcessState[];
};

export default function CreateReprocessExecutionDialog({
  processState,
  processStates,
}: CreateReprocessExecutionDialogProps) {
  return (
    <CustomDialog
      id={`create-reprocess-execution-${processState.process.id}`}
      title="Reprocessar Execução"
      trigger={
        <Button className="bg-amber-400 hover:bg-amber-500" size="xs">
          Reprocessar
          <RotateCcwIcon />
        </Button>
      }
    >
      <CreateReprocessForm processStates={processStates} processState={processState} />
    </CustomDialog>
  );
}
