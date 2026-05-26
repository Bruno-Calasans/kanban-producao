"use client";

import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button";
import { MoveDownLeftIcon } from "lucide-react";
import ReturnProcessForm from "../forms/return-form/ReturnProcessForm";
import { ProcessWithDepartament } from "@/types/database.type";
import { ExternalProcessState } from "@/utils/calcDepartamentExternalState";

type ReturnProcessExecutionDialogProps = {
  externalProcessState: ExternalProcessState;
  avaliableProcesses: ProcessWithDepartament[];
};

export default function ReturnProcessExecutionDialog({
  externalProcessState,
  avaliableProcesses,
}: ReturnProcessExecutionDialogProps) {
  return (
    <CustomDialog
      id={`return-process-execution-${externalProcessState.process.id}`}
      title="Retornar produtos"
      trigger={
        <Button
          className="bg-indigo-400 hover:bg-indigo-500"
          size="xs"
          onClick={(e) => e.currentTarget.blur()}
        >
          Retornar
          <MoveDownLeftIcon />
        </Button>
      }
    >
      <ReturnProcessForm
        avaliableProcesses={avaliableProcesses}
        externalProcessState={externalProcessState}
      />
    </CustomDialog>
  );
}
