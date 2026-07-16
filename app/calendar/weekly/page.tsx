"use client";

import WeeklyDeadlineTable from "@/components/calendar/weekly/WeeklyDeadlineTable";
import Loader from "@/components/custom/Loader";
import PageMsg from "@/components/custom/msgs/PageMsg";
import useGroupAllGoalsByDeadline from "@/hooks/deadline-goal/useGroupAllGoalsByDeadline";
import useGetAllProductionDeadlines from "@/hooks/production-deadline/useGetAllProductionDeadlines";
import useGetAllProductionDepartamentStates from "@/hooks/production-departament-state/useGetAllProductionDepartamentStates";
import { DailyGoalPopulated } from "@/types/database.type";

export default function MonthlyCalendarPage() {
  // Pega todas as produções
  const {
    data: deadlinesData,
    isLoading: isDeadlinesLoading,
    error: deadlineError,
  } = useGetAllProductionDeadlines();
  const deadlines = deadlinesData?.data || [];

  // agrupa todos os estados do departamento por produção
  const productions = deadlines.map((deadline) => deadline.production);
  const {
    departamentStatesByProduction,
    isLoading: isDepartamentStatesByProductionLoading,
    error: departamentStatesByProductionError,
  } = useGetAllProductionDepartamentStates({ productions });

  // Agrupa metas por prazo
  const {
    data: goalsByDeadlineData,
    error: goalsByDeadlineDataError,
    isLoading: isGoalsByDeadlineDataPending,
  } = useGroupAllGoalsByDeadline({ deadlines });
  const goalsByDeadline = goalsByDeadlineData || new Map<number, DailyGoalPopulated[]>();

  const isLoading =
    isDeadlinesLoading || isDepartamentStatesByProductionLoading || isGoalsByDeadlineDataPending;

  const error = deadlineError || departamentStatesByProductionError || goalsByDeadlineDataError;

  if (isLoading) return <Loader title="Carregando prazos..." />;

  if (error)
    return (
      <PageMsg
        title="Erro ao carregar produções"
        backBtnLabel="Voltar às produções"
        backBtnUrl="/productions"
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
      <WeeklyDeadlineTable
        productions={productions}
        deadlines={deadlines}
        goalsByDeadline={goalsByDeadline}
        departamentStatesByProduction={departamentStatesByProduction}
      />
    </section>
  );
}
