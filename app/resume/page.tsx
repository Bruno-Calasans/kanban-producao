"use client";

import Loader from "@/components/custom/Loader";
import PageMsg from "@/components/custom/msgs/PageMsg";
import PageTitle from "@/components/custom/PageTitle";
import DepartamentTabs from "@/components/resume/DepartamentTabs";
import useGetAllActiveDepartaments from "@/hooks/departament/useGetAllActiveDepartaments";
import useGetAllDeadlinesByProduction from "@/hooks/production-deadline/useGetAllDeadlinesByProduction";
import useGetAllProductionDeadlines from "@/hooks/production-deadline/useGetAllProductionDeadlines";
import useGetAllFlowTemplates from "@/hooks/production-flow-template/useGetAllFlowTemplates";
import useGetAllProductions from "@/hooks/production/useGetAllProductions";
import { getAllDeadlinesByProduction } from "@/service/api/productionDeadline";
import { groupDeadlinesByProduction } from "@/utils/groupDeadlinesByProduction";
import { groupProductionsByDepartament } from "@/utils/groupProductionsByDepartament";
import { groupProductionFlowByFlowTemplates } from "@/utils/groupProductionFlowByFlowTemplates";
import { groupDeadlineStatusByDeadline } from "@/utils/groupDeadlineStatusByDeadline";
import useGetAllProductionDepartamentStates from "@/hooks/production-departament-state/useGetAllProductionDepartamentStates";

export default function ResumePage() {
  const {
    data: departamentsData,
    isLoading: isDepartamentsLoading,
    error: departamentsError,
  } = useGetAllActiveDepartaments();
  const departaments = departamentsData?.data || [];

  const {
    data: productionsData,
    isLoading: isProductionsLoading,
    error: productionsError,
  } = useGetAllProductions();
  const productions = productionsData?.data || [];

  const {
    data: deadlinesData,
    isLoading: isDeadlinesLoading,
    error: deadlinesError,
  } = useGetAllProductionDeadlines();
  const deadlines = deadlinesData?.data || [];

  const {
    data: flowTemplatesData,
    isLoading: isFlowTemplatesLoading,
    error: flowTemplatesError,
  } = useGetAllFlowTemplates();
  const flowTemplates = flowTemplatesData?.data || [];

  const {
    departamentStatesByProduction,
    isLoading: isDepartamentStatesByProductionLoading,
    error: departamentStatesByProductionError,
  } = useGetAllProductionDepartamentStates({ productions });

  const deadlinesByProduction = groupDeadlinesByProduction(deadlines);
  const templatesByFlow = groupProductionFlowByFlowTemplates(flowTemplates);

  const productionsByDepartament = groupProductionsByDepartament({
    productions,
    templatesByFlow,
  });

  const deadlineStatusByDeadline = groupDeadlineStatusByDeadline({
    deadlines,
    departamentStatesByProduction,
  });

  const isLoading =
    isDepartamentsLoading || isProductionsLoading || isDeadlinesLoading || isFlowTemplatesLoading;

  const error = departamentsError || productionsError || deadlinesError || flowTemplatesError;

  if (isLoading) {
    return <Loader title="Carregando produtos..." />;
  }

  if (error)
    return (
      <PageMsg
        title="Erro ao carregar produtos"
        content={
          <>
            <p>Desculpe, mas não foi possível carregar os produtos</p>
            <p>
              Error: <code>{error.message}</code>
            </p>
          </>
        }
      />
    );

  return (
    <section>
      <PageTitle>Resumo</PageTitle>
      <p>Resume todas as produções por departamento.</p>
      <DepartamentTabs
        departaments={departaments}
        productionsByDepartament={productionsByDepartament}
        deadlinesByProduction={deadlinesByProduction}
        deadlineStatusByDeadline={deadlineStatusByDeadline}
      />
    </section>
  );
}
