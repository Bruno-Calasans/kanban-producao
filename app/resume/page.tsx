"use client";

import Loader from "@/components/custom/Loader";
import PageMsg from "@/components/custom/msgs/PageMsg";
import PageTitle from "@/components/custom/PageTitle";
import DepartamentTabs from "@/components/resume/DepartamentTabs";
import useGetAllActiveDepartaments from "@/hooks/departament/useGetAllActiveDepartaments";
import useGetAllProductionDeadlines from "@/hooks/production-deadline/useGetAllProductionDeadlines";
import useGetAllFlowTemplates from "@/hooks/production-flow-template/useGetAllFlowTemplates";
import useGetAllProductions from "@/hooks/production/useGetAllProductions";
import useGetAllProductionDepartamentStates from "@/hooks/production-departament-state/useGetAllProductionDepartamentStates";
import { groupDeadlinesByProduction } from "@/utils/groupDeadlinesByProduction";
import { groupProductionsByDepartament } from "@/utils/groupProductionsByDepartament";
import { groupProductionFlowByFlowTemplates } from "@/utils/groupProductionFlowByFlowTemplates";
import { groupDeadlineStatusByDeadline } from "@/utils/groupDeadlineStatusByDeadline";
import { useMemo } from "react";
import { groupDeadlinesByDepartament } from "@/utils/groupDeadlinesByDepartament";

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

  const {
    productionsByDepartament,
    deadlinesByProduction,
    deadlineStatusByDeadline,
    deadlinesByDepartament,
  } = useMemo(() => {
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

    const deadlinesByDepartament = groupDeadlinesByDepartament(deadlines);

    return {
      deadlinesByProduction,
      productionsByDepartament,
      deadlineStatusByDeadline,
      deadlinesByDepartament,
    };
  }, [deadlines, flowTemplates, departamentStatesByProduction]);

  const isLoading =
    isDepartamentsLoading ||
    isProductionsLoading ||
    isDeadlinesLoading ||
    isFlowTemplatesLoading ||
    isDepartamentStatesByProductionLoading;

  const error =
    departamentsError ||
    productionsError ||
    deadlinesError ||
    flowTemplatesError ||
    departamentStatesByProductionError;

  if (isLoading) {
    return <Loader title="Carregando produções..." />;
  }

  if (error)
    return (
      <PageMsg
        title="Erro ao carregar produções"
        content={
          <>
            <p>Desculpe, mas não foi possível carregar as produções</p>
            <p>
              Error: <code>{error.message}</code>
            </p>
          </>
        }
      />
    );

  return (
    <section>
      <div className="flex flex-col mb-4">
        <PageTitle>Resumo</PageTitle>
        <p>Resume todas as produções por departamento.</p>
      </div>
      <DepartamentTabs
        departaments={departaments}
        productionsByDepartament={productionsByDepartament}
        deadlineStatusByDeadline={deadlineStatusByDeadline}
        deadlinesByDepartament={deadlinesByDepartament}
        departamentStatesByProduction={departamentStatesByProduction}
      />
    </section>
  );
}
