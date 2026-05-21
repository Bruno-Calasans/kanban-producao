"use client";

import { ProcessState } from "@/types/database.type";
import CreateProcessExecutionDialog from "./dialogs/CreateProcessExecutionDialog";
import CreateReprocessExecutionDialog from "./dialogs/CreateReprocessExecutionDialog";
import MoveExternalProcessExecutionDialog from "./dialogs/MoveExternalProcessExecutionDialog";
import SkipProcessExecutionDialog from "./dialogs/SkipProcessExecutionDialog";

type ProcessExecutionActionsProps = {
  processState: ProcessState;
  processStates: ProcessState[];
};

export default function ProcessExecutionActions({
  processState,
  processStates,
}: ProcessExecutionActionsProps) {
  const { previousProcess, nextProcess, movimentation } = processState;
  const isLastProcess = nextProcess == null;
  const antiLastProcess = processStates[processStates.length - 2];
  const isAntiLastProcess = antiLastProcess.process.id === processState.process.id;

  if (processState.avaliableAmount == 0) return null;

  if (movimentation.status == "CANCELLED") return null;

  if (movimentation.status == "COMPLETED" && !isLastProcess) {
    return null;
  }

  return (
    <div className="flex gap-1">
      {nextProcess && <CreateProcessExecutionDialog processState={processState} />}
      {nextProcess && !isAntiLastProcess && (
        <SkipProcessExecutionDialog processStates={processStates} processState={processState} />
      )}
      {previousProcess && <CreateReprocessExecutionDialog processState={processState} />}
      {nextProcess && <MoveExternalProcessExecutionDialog processState={processState} />}
    </div>
  );
}
