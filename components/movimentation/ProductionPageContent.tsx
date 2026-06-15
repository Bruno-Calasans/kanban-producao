import { ProductionPopulated } from "@/types/database.type";
import PageMsg from "@/components/custom/msgs/PageMsg";
import Loader from "@/components/custom/Loader";
import ProductionHeaderActions from "./header/ProductionHeaderActions";
import ProductionTabs from "./tabs/ProductionTabs";
import useDepartamentState from "@/hooks/process-state/useDepartamentState";
import useGetAllMovimentationsByProduction from "@/hooks/movimentation/useGetAllMovimentationsByProduction";
import useGetAllDeadlinesByProduction from "@/hooks/production-deadline/useGetAllDeadlinesByProduction";
import useDepartamentDeadlineState from "@/hooks/departament-deadline-state/useDepartamentDeadlineState";

type ProductionPageContentProps = {
  production: ProductionPopulated;
};

export default function ProductionPageContent({ production }: ProductionPageContentProps) {
  const {
    departamentStates,
    flowTemplates,
    isPending: isMovimentationsPending,
    isError: departamentStateError,
  } = useDepartamentState({ production });

  const {
    data: movimentationsData,
    error: movimentationError,
    isPending: isMovimwe,
  } = useGetAllMovimentationsByProduction(production?.id);

  const {
    data: deadlineData,
    error: deadlineError,
    isPending: isDeadlinePending,
  } = useGetAllDeadlinesByProduction(production?.id);

  const movimentations = movimentationsData?.data || [];
  const productionDeadlines = deadlineData?.data || [];

  const { departamentDeadlineStates } = useDepartamentDeadlineState({
    production,
    productionDeadlines,
    productionDepartamentStates: departamentStates,
  });

  const isPending = isMovimentationsPending || isMovimwe || isDeadlinePending;
  const isError = departamentStateError || movimentationError || deadlineError;

  if (isPending) return <Loader title="Carregando dados da produção..." />;

  if (isError)
    return (
      <PageMsg
        title="Erro ao carregar dados da produção"
        content="Desculpe, mas não foi possível carregar as informações dessa produção"
        backBtnLabel="Voltar às movimentações"
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
        production={production}
        deadlines={productionDeadlines}
        movimentations={movimentations}
        departamentStates={departamentStates}
        departamentDeadlineStates={departamentDeadlineStates}
      />
    </section>
  );
}
