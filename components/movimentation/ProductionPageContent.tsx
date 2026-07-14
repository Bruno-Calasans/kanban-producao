import { ProductionPopulated } from "@/types/database.type";
import PageMsg from "@/components/custom/msgs/PageMsg";
import Loader from "@/components/custom/Loader";
import ProductionHeaderActions from "./header/ProductionHeaderActions";
import ProductionTabs from "./tabs/ProductionTabs";
import useDepartamentState from "@/hooks/departament-state/useDepartamentState";
import useGetAllMovimentationsByProduction from "@/hooks/movimentation/useGetAllMovimentationsByProduction";
import useGetAllDeadlinesByProduction from "@/hooks/production-deadline/useGetAllDeadlinesByProduction";
import useDepartamentDeadlineState from "@/hooks/departament-deadline-state/useDepartamentDeadlineState";
import useGetAllProductionDeadlineLogsByDeadlines from "@/hooks/production-deadline-log/useGetAllProductionDeadlineLogsByDeadlines";

type ProductionPageContentProps = {
  production: ProductionPopulated;
};

export default function ProductionPageContent({ production }: ProductionPageContentProps) {
  const {
    departamentStates,
    flowTemplates,
    isPending: isDepartamentStatePending,
    isError: departamentStateError,
  } = useDepartamentState({ production });

  const {
    data: movimentationsData,
    error: movimentationError,
    isPending: isMovimentationsPending,
  } = useGetAllMovimentationsByProduction(production?.id);
  const movimentations = movimentationsData?.data || [];

  const {
    data: deadlineData,
    error: deadlineError,
    isPending: isDeadlinePending,
  } = useGetAllDeadlinesByProduction(production?.id);
  const productionDeadlines = deadlineData?.data || [];

  const {
    data: deadlineLogsData,
    error: deadlineLogsError,
    isPending: isDeadlineLogsPending,
  } = useGetAllProductionDeadlineLogsByDeadlines(productionDeadlines.map((d) => d.id));
  const deadlineLogs = deadlineLogsData?.data || [];

  const { departamentDeadlineStates } = useDepartamentDeadlineState({
    production,
    productionDeadlines,
    productionDepartamentStates: departamentStates,
  });

  const isPending =
    isDepartamentStatePending ||
    isMovimentationsPending ||
    isDeadlinePending ||
    isDeadlineLogsPending;

  const isError = departamentStateError || movimentationError || deadlineError || deadlineLogsError;

  if (isPending) return <Loader title="Carregando dados da produção..." />;

  if (isError)
    return (
      <PageMsg
        title="Erro ao carregar dados da produção"
        content="Desculpe, mas não foi possível carregar as informações dessa produção"
        backBtnLabel="Voltar às produções"
        backBtnUrl="/productions"
      />
    );

  return (
    <section>
      <ProductionHeaderActions
        production={production}
        movimentations={movimentations}
        flowTemplates={flowTemplates}
        deadlines={productionDeadlines}
        departamentStates={departamentStates}
        departamentDeadlineStates={departamentDeadlineStates}
      />
      <ProductionTabs
        deadlines={productionDeadlines}
        movimentations={movimentations}
        departamentStates={departamentStates}
        departamentDeadlineStates={departamentDeadlineStates}
        deadlineLogs={deadlineLogs}
      />
    </section>
  );
}
