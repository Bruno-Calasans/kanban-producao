import { Button } from "@/components/ui/button";
import { ProcessState, ProcessWithDepartament } from "@/types/database.type";
import CreateProcessExecutionDialog from "./dialogs/CreateProcessExecutionDialog";
import CreateReprocessExecutionDialog from "./dialogs/CreateReprocessExecutionDialog";

type ProcessExecutionActionsProps = {
  processState: ProcessState;
};

export default function ProcessExecutionActions({ processState }: ProcessExecutionActionsProps) {
  const getNextAndPreviousProcesses = () => {
    let previous: ProcessWithDepartament | null = null;
    let next: ProcessWithDepartament | null = null;

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

      next = nextProcessIndex < flowTemplatesSize ? flowTemplates[nextProcessIndex].process : null;
      previous = previousProcessIndex >= 0 ? flowTemplates[previousProcessIndex].process : null;
    }

    return {
      previous,
      next,
    };
  };

  const { next, previous } = getNextAndPreviousProcesses();

  if (processState.avaliableAmount == 0) return null;

  return (
    <div className="flex gap-1">
      {next && <CreateProcessExecutionDialog processState={processState} nextProcess={next} />}
      {/* {previous && (
        <CreateReprocessExecutionDialog processState={processState} previousProcess={previous} />
      )} */}
      {/* <Button size="xs">Ajustar</Button> */}
    </div>
  );
}
