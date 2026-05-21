"use client";

import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button";
import { ProcessState } from "@/types/database.type";
import { MoveUpRightIcon } from "lucide-react";
import MoveExternalForm from "@/components/process-execution/forms/move-external-form/MoveExternalForm";

type MoveExternalProcessExecutionDialogProps = {
  processState: ProcessState;
};

export default function MoveExternalProcessExecutionDialog({
  processState,
}: MoveExternalProcessExecutionDialogProps) {
  return (
    <CustomDialog
      id={`move-external-process-execution-${processState.process.id}`}
      title="Mover para departamento externo"
      trigger={
        <Button
          className="bg-emerald-400 hover:bg-emerald-500"
          size="xs"
          onClick={(e) => e.currentTarget.blur()}
        >
          Enviar para fora
          <MoveUpRightIcon />
        </Button>
      }
    >
      <MoveExternalForm processState={processState} />
    </CustomDialog>
  );
}
