import useGetAllProcessExecutionsByMovimentation from "@/hooks/process-executation/useGetAllProcessExecutionsByMovimentation";
import useGetAllProductionFlowTemplates from "@/hooks/production-flow-template/useGetAllProductionFlowTemplates";
import { MovimentationPopulated, Process, ProcessState } from "@/types/database.type";
import ProcessStateTable from "../table/ProcessStateTable";
import Loader from "@/components/custom/Loader";

type MovimentationActionsTabProps = {
  movimentation: MovimentationPopulated;
};

export default function MovimentationActionsTab({ movimentation }: MovimentationActionsTabProps) {
  const {
    data: flowTemplateData,
    error: flowTemplateError,
    isPending: isFlowTemplatePending,
  } = useGetAllProductionFlowTemplates(movimentation.product.production_flow_id);

  const {
    data: processExecutionsData,
    error: processExecutionError,
    isPending: isProcessExecutionsPending,
  } = useGetAllProcessExecutionsByMovimentation(movimentation.id);

  const processExecutions = processExecutionsData?.data || [];
  const flowTemplate = flowTemplateData?.data || [];

  const calcAvaliableAmount = () => {
    const processStates: ProcessState[] = [];

    for (const template of flowTemplate) {
      let status: ProcessState["status"] = "PENDING";
      const currentProcess = template.process;
      const sucessExecutions = processExecutions.filter((exe) => exe.status === "SUCCESS");
      const inExecutions = sucessExecutions.filter((exe) => exe.process.id === currentProcess.id);
      const outExecutions = sucessExecutions.filter(
        (exe) => exe.from_process?.id === currentProcess.id,
      );

      const inExecutionsSum = inExecutions
        .map((exe) => exe.amount)
        .reduce((total, curr) => total + curr, 0);

      const outExecutionsSum = outExecutions
        .map((exe) => exe.amount)
        .reduce((total, curr) => total + curr, 0);

      const hasExecutions = inExecutions.length > 0 || outExecutions.length > 0;
      const avaliableAmount = inExecutionsSum - outExecutionsSum;

      if (!hasExecutions) status = "PENDING";
      if (hasExecutions && avaliableAmount == 0) status = "SUCCESS";
      if (hasExecutions && avaliableAmount > 0) status = "IN_PROGRESS";

      processStates.push({
        process: template.process,
        avaliableAmount,
        status,
      });
    }

    return processStates;
  };

  const isPending = isFlowTemplatePending || isProcessExecutionsPending;
  const isError = flowTemplateError || processExecutionError;

  const processStates =
    !isProcessExecutionsPending && !isFlowTemplatePending ? calcAvaliableAmount() : [];

  if (isPending) return <Loader title="Carregando ações...." />;

  if (isError) return <div>Não foi possível carregar as ações</div>;

  return (
    <div>
      <ProcessStateTable processStates={processStates} />
    </div>
  );
}
