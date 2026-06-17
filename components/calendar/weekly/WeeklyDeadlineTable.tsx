/* eslint-disable react-hooks/preserve-manual-memoization */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DAYS_OF_WEEK } from "@/constants/date";
import { cn } from "@/lib/utils";
import { createCalendarMatrix } from "@/utils/createCalendarMatrix";
import { normalizeWeekDays } from "@/utils/createNormalizedWeekDays";
import { groupDeadlinesByDepartament } from "@/utils/groupDeadlinesByDepartament";
import { useMemo } from "react";
import { sortByDeadlinePriority } from "@/utils/sortByDeadlinePriority";
import { calcExternalDepartamentState } from "@/utils/calcExternalDepartamentState";
import { isToday } from "date-fns";
import { useSelectedWeekDay } from "@/hooks/local-storage/useSelectedWeekDay";
import { groupDeadlinesByProduction } from "@/utils/groupDeadlinesByProduction";
import WeekSelector from "@/components/calendar/weekly/WeekSelector";
import Loader from "@/components/custom/Loader";
import PageMsg from "@/components/custom/msgs/PageMsg";
import useWeek from "@/hooks/use-week/useWeek";
import useGroupAllGoalsByDeadline from "@/hooks/deadline-goal/useGroupAllGoalsByDeadline";
import useGetAllProductionDepartamentStates from "@/hooks/production-departament-state/useGetAllProductionDepartamentStates";
import ExternalWeekDeadlineCard from "./cards/ExternalWeekDeadlineCard/ExternalWeekDeadlineCard";
import InternalWeekDeadlineCard from "@/components/calendar/weekly/cards/InternalWeekDeadlineCard/InternalWeekDeadlineCard";
import useGetAllProductionDeadlines from "@/hooks/production-deadline/useGetAllProductionDeadlines";

export default function WeeklyDeadlineTable() {
  const { selectedWeekDay } = useSelectedWeekDay();
  const { weekDays, startDayOfWeek, getCurrentWeek, getNextWeek, getPreviousWeek } = useWeek({
    startDate: selectedWeekDay ? new Date(selectedWeekDay) : new Date(),
  });

  // Pega todas as produções no intervalo de data (talvez refazer)
  const {
    data: deadlinesData,
    isLoading: isDeadlinesLoading,
    isError: deadlineError,
  } = useGetAllProductionDeadlines();
  const deadlines = deadlinesData?.data || [];

  // agrupa todos os estados do departamento por produção
  const productions = deadlines.map((deadline) => deadline.production);
  const {
    departamentStatesByProduction,
    isLoading: isDepartamentStatesByProductionLoading,
    isError: departamentStatesByProductionError,
  } = useGetAllProductionDepartamentStates({ productions });

  // Agrupa metas por deadline
  const {
    data: goalsByDeadlineData,
    isError: goalsByDeadlineDataError,
    isLoading: isGoalsByDeadlineDataPending,
  } = useGroupAllGoalsByDeadline({ deadlines });
  const goalsByDeadline = goalsByDeadlineData;

  const normalizedWeekDays = useMemo(() => normalizeWeekDays(weekDays), [weekDays]);

  // Agrupa prazos por departamento
  const deadlinesByDepartament = useMemo(() => groupDeadlinesByDepartament(deadlines), [deadlines]);

  // Agrupa prazos por produção
  const deadlinesByProduction = useMemo(
    () => groupDeadlinesByProduction(deadlines),
    [deadlines, departamentStatesByProduction],
  );

  // Prazos por departamento, por dia da semana
  const calendarMatrix = useMemo(
    () =>
      createCalendarMatrix({
        deadlines,
        normalizedWeekDays,
      }),
    [deadlines, normalizedWeekDays],
  );

  const sortedDepartments = [...deadlinesByDepartament.entries()].sort((a, b) => a[0] - b[0]);

  const createRows = () => {
    return normalizedWeekDays.map((day) => (
      <TableRow key={day.key}>
        <TableHead
          id={`day-${day.key}`}
          className={cn(
            "font-semibold",
            isToday(day.date) ? "bg-black/90 text-white" : "bg-black/30",
          )}
        >
          <p>{DAYS_OF_WEEK[day.date.getDay() - 1]}</p>
          <p>{day.key}</p>
        </TableHead>

        {sortedDepartments.map(([departmentId, departmentDeadlines]) => {
          const department = departmentDeadlines[0].departament;
          const weekMap = calendarMatrix.get(departmentId);
          const deadlines = weekMap?.get(day.key);

          return (
            <TableCell
              key={`${day.key}-${department.id}`}
              className={cn(
                "",
                department.name === "CORTE" && "bg-pink-200",
                department.name === "ESTAMPARIA" && "bg-emerald-200",
                department.name === "BORDADO" && "bg-orange-200",
                department.name === "COSTURA" && "bg-yellow-200",
                department.name === "ACABAMENTO" && "bg-purple-200",
                department.name === "FACÇÃO" && "bg-blue-200",
              )}
            >
              <div className="m-0 p-0 grid md:grid-cols-1 xl:grid-cols-2">
                {deadlines?.map((deadline) => {
                  if (deadline.departament.is_external) {
                    return (
                      <ExternalWeekDeadlineCard
                        key={`${department.id}-${deadline.id}-${day.key}`}
                        deadline={deadline}
                        weekDay={day.date}
                        departament={department}
                        departamentStates={
                          departamentStatesByProduction.get(deadline.production.id) || []
                        }
                      />
                    );
                  }

                  return (
                    <InternalWeekDeadlineCard
                      key={`${department.id}-${deadline.id}-${day.key}`}
                      deadline={deadline}
                      weekDay={day.date}
                      departament={department}
                      weekDailyGoals={goalsByDeadline?.get(deadline.id) || []}
                      departamentStates={
                        departamentStatesByProduction.get(deadline.production.id) || []
                      }
                    />
                  );
                })}
              </div>
            </TableCell>
          );
        })}
      </TableRow>
    ));
  };

  const rows = useMemo(
    () => createRows(),
    [
      calendarMatrix,
      deadlinesByDepartament,
      normalizedWeekDays,
      weekDays,
      goalsByDeadline,
      departamentStatesByProduction,
    ],
  );

  const uniqueProductions = useMemo(
    () => Array.from(new Map(productions.map((item) => [item.id, item])).values()),
    [productions],
  );

  const isLoading =
    isDeadlinesLoading || isDepartamentStatesByProductionLoading || isGoalsByDeadlineDataPending;
  const isError = deadlineError || departamentStatesByProductionError || goalsByDeadlineDataError;

  if (isLoading) return <Loader title="Carregando prazos..." />;

  if (isError) return <PageMsg title="Erro ao carregar prazos" />;

  return (
    <section>
      <WeekSelector
        startDayOfWeek={startDayOfWeek}
        getCurrentWeek={getCurrentWeek}
        getNextWeek={getNextWeek}
        getPreviousWeek={getPreviousWeek}
        productions={uniqueProductions}
        deadlinesByProduction={deadlinesByProduction}
        departamentStatesByProduction={departamentStatesByProduction}
      />

      <div className="overflow-auto max-h-[90vh]">
        <Table className="overflow-x-none w-fit">
          {/* <TableHeader>

            <TableRow>
              <TableHead className="w-[150px] font-semibold bg-muted/50 sticky top-0 z-30">
                DEPARTAMENTOS
              </TableHead>

              {normalizedWeekDays.map(({ key, date, isToday }) => (
                <TableHead
                  key={key}
                  className={cn(
                    "w-[150px] p-2 font-semibold bg-black/80 text-white sticky top-0 z-20",
                    isToday && "bg-black/90 text-white",
                  )}
                >
                  <p className="flex flex-col">{DAYS_OF_WEEK[date.getDay() - 1]}</p>
                  <p>{isToday ? "Hoje" : key}</p>
                </TableHead>
              ))}

            </TableRow>
          </TableHeader> */}

          {/* 
          <TableBody>
            {normalizedWeekDays.map((day) => (
              <TableRow key={day.key}>
                <TableHead>
                  <p>{DAYS_OF_WEEK[day.date.getDay() - 1]}</p>
                  <p>{day.isToday ? "Hoje" : day.key}</p>
                </TableHead>

                {sortedDepartments.map(([departmentId]) => {
                  const deadlines = calendarMatrix.get(departmentId)?.get(day.key);

                  return <TableCell key={`${day.key}-${departmentId}`}>...</TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody> */}

          {/* Inverted header columns */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-25 font-semibold bg-muted/50 sticky top-0 z-20">
                DIA
              </TableHead>

              {[...deadlinesByDepartament.entries()]
                .sort((a, b) => a[0] - b[0])
                .map(([_, departmentDeadlines]) => {
                  const department = departmentDeadlines[0].departament;

                  return (
                    <TableHead
                      key={department.id}
                      className="p-2 font-semibold bg-black/80 text-white sticky top-0 z-20"
                    >
                      {department.name}
                    </TableHead>
                  );
                })}
            </TableRow>
          </TableHeader>

          <TableBody>{rows}</TableBody>
        </Table>
      </div>
    </section>
  );
}
