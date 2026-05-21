"use client";

import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button";
import { ProcessState } from "@/types/database.type";
import { SkipForwardIcon } from "lucide-react";
import SkipForm from "../forms/skip-form/SkipForm";

type SkipProcessExecutionDialogProps = {
  processStates: ProcessState[];
  processState: ProcessState;
};

export default function SkipProcessExecutionDialog({
  processState,
  processStates,
}: SkipProcessExecutionDialogProps) {
  return (
    <CustomDialog
      id={`skip-process-execution-${processState.process.id}`}
      title="Pular processo"
      trigger={
        <Button
          className="bg-gray-600 hover:bg-gray-800"
          size="xs"
          onClick={(e) => e.currentTarget.blur()}
        >
          Pular
          <SkipForwardIcon />
        </Button>
      }
    >
      <SkipForm processStates={processStates} processState={processState} />
    </CustomDialog>
  );
}
