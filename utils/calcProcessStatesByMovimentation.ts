import { MovimentationDeadlinePopulated, ProcessState } from "@/types/database.type";
import { calcProcessStates } from "./calcProcessStates";
import useProcessState from "@/hooks/process-state/useProcessState";

type calcProcessStatesByMovimentationProps = {
  deadlines: MovimentationDeadlinePopulated[];
};

export function calcProcessStatesByMovimentation({
  deadlines,
}: calcProcessStatesByMovimentationProps) {
  const map = new Map<number, ProcessState[]>();

  for (const deadline of deadlines) {
    const movimentation = deadline.movimentation;

    const flowTemplates = flowTemplatesByFlowId.get(movimentation.product.production_flow_id) || [];
    const processExecutions = executionsByMovimentationId.get(movimentation.id) || [];

    const states = calcProcessStates({
      movimentation,
      flowTemplates,
      processExecutions,
    });

    map.set(movimentation.id, states);
  }

  return map;
}
