import { Process, ProcessState } from "@/types/database.type";
import CreateProcessExecutionDialog from "./dialogs/CreateProcessExecutionDialog";
import { Button } from "../ui/button";

type ProcessExecutionActionsProps = {
  processState: ProcessState;
};

export default function ProcessExecutionActions({ processState }: ProcessExecutionActionsProps) {
  const getNextAndPreviousProcesses = () => {
    let previous: Process | null = null;
    let next: Process | null = null;

    const { flowTemplates } = processState;
    const flowTemplatesSize = flowTemplates.length;

    if (flowTemplatesSize == 0 || flowTemplatesSize == 1) {
      previous = null;
      next = null;
    } else {
      const currentProcessIndex = flowTemplates.findIndex(
        (flow) => flow.process.id == processState.process.id,
      );

      // Procura o index do próximo processo
      const nextProcessIndex = currentProcessIndex + 1;
      const previousProcessIndex = currentProcessIndex - 1;

      next = nextProcessIndex == flowTemplatesSize ? null : flowTemplates[nextProcessIndex].process;
      previous = previousProcessIndex < 0 ? null : flowTemplates[previousProcessIndex].process;
    }

    return {
      previous,
      next,
    };
  };

  const nextProcess = getNextAndPreviousProcesses();

  if (processState.avaliableAmount == 0) return null;

  return (
    <div className="flex gap-1">
      {nextProcess && <CreateProcessExecutionDialog processState={processState} />}
      <Button size="xs">Reprocessar</Button>
      <Button size="xs">Ajustar</Button>
    </div>
  );
}
