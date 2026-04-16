"use client";

import { Button } from "@/components/ui/button";
import { ProcessState } from "@/types/database.type";
import CreateProcessExecutionDialog from "./dialogs/CreateProcessExecutionDialog";
import CreateReprocessExecutionDialog from "./dialogs/CreateReprocessExecutionDialog";

type ProcessExecutionActionsProps = {
  processState: ProcessState;
};

export default function ProcessExecutionActions({ processState }: ProcessExecutionActionsProps) {
  const { previousProcess, nextProcess, movimentation } = processState;

  if (processState.avaliableAmount == 0) return null;

  if (movimentation.status === "CANCELLED" || movimentation.status == "COMPLETED") {
    return null;
  }

  return (
    <div className="flex gap-1">
      {nextProcess && <CreateProcessExecutionDialog processState={processState} />}
      {previousProcess && <CreateReprocessExecutionDialog processState={processState} />}
      {/* <Button size="xs">Ajustar</Button> */}
    </div>
  );
}
