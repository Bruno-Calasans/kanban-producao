"use client";

import { ProcessState } from "@/types/database.type";
import CreateProcessExecutionDialog from "./dialogs/CreateProcessExecutionDialog";
import CreateReprocessExecutionDialog from "./dialogs/CreateReprocessExecutionDialog";

type ProcessExecutionActionsProps = {
  processState: ProcessState;
};

export default function ProcessExecutionActions({ processState }: ProcessExecutionActionsProps) {
  const { previousProcess, nextProcess, movimentation } = processState;
  const isLastProcess = nextProcess == null;

  if (processState.avaliableAmount == 0) return null;

  if (movimentation.status == "CANCELLED") return null;

  if (movimentation.status == "COMPLETED" && !isLastProcess) {
    return null;
  }

  return (
    <div className="flex gap-1">
      {nextProcess && <CreateProcessExecutionDialog processState={processState} />}
      {previousProcess && <CreateReprocessExecutionDialog processState={processState} />}
    </div>
  );
}
