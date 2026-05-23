import WeekDeadlineCard from "@/components/calendar/weekly/WeekDeadlineCard";
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
import useGetAllMovimentationDeadlineInRange from "@/hooks/movimentation-deadline/useGetAllMovimentationDeadlineInRange";
import useGetAllMovimentationsProcesStates from "@/hooks/movimentation-process-state/useGetAllMovimentationsProcesStates";
import useWeek from "@/hooks/use-week/useWeek";
import { cn } from "@/lib/utils";
import { createCalendarMatrix } from "@/utils/createCalendarMatrix";
import { normalizeWeekDays } from "@/utils/createNormalizedWeekDays";
import { groupDeadlinesByDepartament } from "@/utils/groupDeadlinesByDepartament";
import { useMemo } from "react";
import useGroupAllMetasInRangeByDeadline from "@/hooks/deadline-meta/useGroupAllMetasInRangeByDeadline";
import { sortByDeadlinePriority } from "@/utils/sortByDeadlinePriority";

export default function WeeklyDeadlineTable() {
  const { weekDays, startDayOfWeek, endDayOfWeek, getCurrentWeek, getNextWeek, getPreviousWeek } =
    useWeek({
      startDate: new Date(),
    });

  const {
    data: movimentationDeadlineData,
    isPending: isMovimentationDeadlinePending,
    error: movimentationDeadlineError,
  } = useGetAllMovimentationDeadlineInRange(startDayOfWeek, endDayOfWeek);
  const deadlines = movimentationDeadlineData?.data || [];

  const movimentations = deadlines.map((deadline) => deadline.movimentation);
  const {
    processStatesByMovimentation,
    isPending: isMovimentationExecutionTemplatePending,
    isError: movimentationExecutionTemplateError,
  } = useGetAllMovimentationsProcesStates({ movimentations });

  const {
    data: metasInRangeByDeadlineData,
    isPending: isMetasInRangeByDeadlinePending,
    isError: metasInRangeByDeadlineError,
  } = useGroupAllMetasInRangeByDeadline({ from: startDayOfWeek, to: endDayOfWeek, deadlines });
  const metasInRangeByDeadline = metasInRangeByDeadlineData;

  const normalizedWeekDays = useMemo(() => normalizeWeekDays(weekDays), [weekDays]);

  const deadlinesByDepartament = useMemo(() => groupDeadlinesByDepartament(deadlines), [deadlines]);

  const calendarMatrix = useMemo(
    () =>
      createCalendarMatrix({
        deadlines,
        normalizedWeekDays,
      }),
    [deadlines, normalizedWeekDays],
  );

  const createRows = () => {
    const rows = [];

    for (const [departmentId, departmentDeadlines] of deadlinesByDepartament) {
      const department = departmentDeadlines[0].departament;
      const weekMap = calendarMatrix.get(departmentId);

      rows.push(
        <TableRow key={department.id}>
          <TableHead className="w-[150px] font-semibold bg-muted/50 ">{department.name}</TableHead>

          {normalizedWeekDays.map((day) => {
            const deadlines = weekMap?.get(day.key);
            // Fazer depois porque nem todas as metas estão salvas no banco de dados
            const metaInThisDay = deadlines?.map((d) => metasInRangeByDeadline?.get(d.id)) || [];
            // console.log(department.name, day.key, metaInThisDay.filter(m => !!m))

            return (
              <TableCell key={`${department.id}-${day.key}`}>
                <div>
                  {deadlines?.map((deadline) => (
                    <WeekDeadlineCard
                      key={`${department.id}-${deadline.id}-${day.key}`}
                      deadline={deadline}
                      weekDay={day.date}
                      departament={department}
                      metasInThisWeek={metasInRangeByDeadline?.get(deadline.id) || []}
                      processStates={
                        processStatesByMovimentation.get(deadline.movimentation.id) || []
                      }
                    />
                  ))}
                </div>
              </TableCell>
            );
          })}
        </TableRow>,
      );
    }
    return rows;
  };

  const rows = useMemo(
    () => createRows(),
    [calendarMatrix, deadlinesByDepartament, normalizedWeekDays, weekDays],
  );

  console.log(deadlines);

  const isPending =
    isMovimentationDeadlinePending ||
    isMovimentationExecutionTemplatePending ||
    isMetasInRangeByDeadlinePending;

  const isError =
    movimentationDeadlineError ||
    movimentationExecutionTemplateError ||
    metasInRangeByDeadlineError;

  if (isPending) return <Loader title="Carregando prazos..." />;

  if (isError) return <PageMsg title="Erro ao carregar prazos" />;

  return (
    <section>
      <WeekSelector
        startDayOfWeek={startDayOfWeek}
        getCurrentWeek={getCurrentWeek}
        getNextWeek={getNextWeek}
        getPreviousWeek={getPreviousWeek}
      />

      <div className="overflow-auto max-h-[90vh]">
        <Table className="overflow-x-none">
          <TableHeader>
            {/* Primeira linha */}
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
          </TableHeader>
          <TableBody>{rows}</TableBody>
        </Table>
      </div>
    </section>
  );
}
