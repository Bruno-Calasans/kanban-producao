import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button";
import { ProcessState } from "@/types/database.type";
import { RotateCcwIcon } from "lucide-react";
import CreateReprocessForm from "../forms/reprocess-form/CreateReprocessForm";

type CreateReprocessExecutionDialogProps = {
  processState: ProcessState;
};

export default function CreateReprocessExecutionDialog({
  processState,
}: CreateReprocessExecutionDialogProps) {
  return (
    <CustomDialog
      // não mexer, se não buga
      id={`create-reprocess-${processState.process.id}`}
      title="Reprocessar Execução"
      trigger={
        <Button className="bg-amber-400 hover:bg-amber-500" size="xs">
          Reprocessar
          <RotateCcwIcon />
        </Button>
      }
    >
      <CreateReprocessForm processState={processState} />
    </CustomDialog>
  );
}
