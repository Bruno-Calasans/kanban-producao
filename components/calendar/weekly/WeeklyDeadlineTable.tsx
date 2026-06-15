/* eslint-disable react-hooks/preserve-manual-memoization */
import WeekSelector from "@/components/calendar/weekly/WeekSelector";
import Loader from "@/components/custom/Loader";
import PageMsg from "@/components/custom/msgs/PageMsg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DAYS_OF_WEEK } from "@/constants/date";
import useGetAllMovimentationDeadlineInRange from "@/hooks/production-deadline/useGetAllProductionDeadlinesInRange";
import useGetAllMovimentationsProcesStates from "@/hooks/movimentation-process-state/useGetAllMovimentationsProcesStates";
import useWeek from "@/hooks/use-week/useWeek";
import { cn } from "@/lib/utils";
import { createCalendarMatrix } from "@/utils/createCalendarMatrix";
import { normalizeWeekDays } from "@/utils/createNormalizedWeekDays";
import { groupDeadlinesByDepartament } from "@/utils/groupDeadlinesByDepartament";
import { useMemo } from "react";
import useGroupAllMetasInRangeByDeadline from "@/hooks/deadline-meta/useGroupAllMetasInRangeByDeadline";
import { sortByDeadlinePriority } from "@/utils/sortByDeadlinePriority";
import { calcExternalProcessStates } from "@/utils/calcExternalDepartamentState";
import ExternalWeekDeadlineCard from "./cards/ExternalWeekDeadlineCard/ExternalWeekDeadlineCard";
import InternalWeekDeadlineCard from "@/components/calendar/weekly/cards/InternalWeekDeadlineCard/InternalWeekDeadlineCard";
import { isToday } from "date-fns";
import { useSelectedWeekDay } from "@/hooks/local-storage/useSelectedWeekDay";
import { groupDeadlinesByMovimentation } from "@/utils/groupDeadlinesByMovimentation";

export default function WeeklyDeadlineTable() {
  const { selectedWeekDay } = useSelectedWeekDay();
  const { weekDays, startDayOfWeek, endDayOfWeek, getCurrentWeek, getNextWeek, getPreviousWeek } =
    useWeek({
      startDate: selectedWeekDay ? new Date(selectedWeekDay) : new Date(),
    });

  const {
    data: movimentationDeadlineData,
    isLoading: isMovimentationDeadlineLoading,
    isError: movimentationDeadlineError,
  } = useGetAllMovimentationDeadlineInRange(startDayOfWeek, endDayOfWeek);
  const deadlines = movimentationDeadlineData?.data || [];

  const movimentations = deadlines.map((deadline) => deadline.movimentation);
  const {
    processStatesByMovimentation,
    isLoading: isMovimentationExecutionTemplateLoading,
    isError: movimentationExecutionTemplateError,
  } = useGetAllMovimentationsProcesStates({ movimentations });

  const {
    data: metasInRangeByDeadlineData,
    isError: metasInRangeByDeadlineError,
    isLoading: isMetasInRangeByDeadlineLoading,
  } = useGroupAllMetasInRangeByDeadline({ from: startDayOfWeek, to: endDayOfWeek, deadlines });
  const metasInRangeByDeadline = metasInRangeByDeadlineData;

  const normalizedWeekDays = useMemo(() => normalizeWeekDays(weekDays), [weekDays]);

  const deadlinesByDepartament = useMemo(() => groupDeadlinesByDepartament(deadlines), [deadlines]);

  const deadlinesByMovimentation = useMemo(
    () => groupDeadlinesByMovimentation(deadlines),
    [deadlines, processStatesByMovimentation],
  );

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
                        processStates={
                          processStatesByMovimentation.get(deadline.movimentation.id) || []
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
                      metasInThisWeek={metasInRangeByDeadline?.get(deadline.id) || []}
                      processStates={
                        processStatesByMovimentation.get(deadline.movimentation.id) || []
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
      metasInRangeByDeadline,
      processStatesByMovimentation,
    ],
  );

  const uniqueMovimentations = useMemo(
    () => Array.from(new Map(movimentations.map((item) => [item.id, item])).values()),
    [movimentations],
  );

  const isLoading =
    isMovimentationDeadlineLoading ||
    isMovimentationExecutionTemplateLoading ||
    isMetasInRangeByDeadlineLoading;

  const isError =
    movimentationDeadlineError ||
    movimentationExecutionTemplateError ||
    metasInRangeByDeadlineError;

  if (isLoading) return <Loader title="Carregando prazos..." />;

  if (isError) return <PageMsg title="Erro ao carregar prazos" />;

  return (
    <section>
      <WeekSelector
        startDayOfWeek={startDayOfWeek}
        getCurrentWeek={getCurrentWeek}
        getNextWeek={getNextWeek}
        getPreviousWeek={getPreviousWeek}
        movimentations={uniqueMovimentations}
        deadlinesByMovimentation={deadlinesByMovimentation}
        processStatesByMovimentation={processStatesByMovimentation}
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
