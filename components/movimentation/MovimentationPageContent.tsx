import { MovimentationPopulated } from "@/types/database.type";
import MovimentationInfoHeader from "./MovimentationInfoHeader";
import MovimentationTabs from "./tabs/MovimentationTab";
import useProcessState from "@/hooks/process-state/useProcessState";
import useGetAllProcessExecutionsByMovimentation from "@/hooks/process-executation/useGetAllProcessExecutionsByMovimentation";
import useGetAllMovimentationDeadlinesByMovimentation from "@/hooks/movimentation-deadline/useGetAllMovimentationDeadlinesByMovimentation";
import PageMsg from "@/components/custom/msgs/PageMsg";
import Loader from "@/components/custom/Loader";
import useDepartamentState from "@/hooks/departament-state/useDepartamentState";

type MovimentationPageContentProps = {
  movimentation: MovimentationPopulated;
};

export default function MovimentationPageContent({ movimentation }: MovimentationPageContentProps) {
  const {
    processStates,
    isPending: isProcessStatesPending,
    isError: processStatesError,
    flowTemplates,
  } = useProcessState({ movimentation });

  const {
    data: executionsData,
    error: executionsError,
    isPending: isExecutionPending,
  } = useGetAllProcessExecutionsByMovimentation(movimentation?.id);
  const processExecutions = executionsData?.data || [];

  const {
    data: deadlineData,
    error: deadlineError,
    isPending: isDeadlinePending,
  } = useGetAllMovimentationDeadlinesByMovimentation(movimentation?.id);
  const deadlines = deadlineData?.data || [];

  const { departamentStates } = useDepartamentState({
    movimentation,
    movimentationDeadlines: deadlines,
    movimentationProcessStates: processStates,
  });

  const isPending = isProcessStatesPending || isExecutionPending || isDeadlinePending;
  const isError = processStatesError || executionsError || deadlineError;

  if (isPending) return <Loader title="Carregando dados da movimentação..." />;

  if (isError)
    return (
      <PageMsg
        title="Erro ao carregar dados da movimentação"
        content="Desculpe, mas não foi possível carregar as informações dessa movimentação"
        backBtnLabel="Voltar às movimentações"
        backBtnUrl="/movimentations"
      />
    );

  return (
    <section>
      <MovimentationInfoHeader
        movimentation={movimentation}
        departamentStates={departamentStates}
        deadlines={deadlines}
        processExecutions={processExecutions}
        flowTemplates={flowTemplates}
      />
      <MovimentationTabs
        movimentation={movimentation}
        processStates={processStates}
        processExecutions={processExecutions}
        deadlines={deadlines}
        departamentStates={departamentStates}
      />
    </section>
  );
}
