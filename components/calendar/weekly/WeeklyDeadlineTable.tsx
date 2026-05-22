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
import useWeek from "@/hooks/use-week/useWeek";
import { cn } from "@/lib/utils";
import { createCalendarMatrix } from "@/utils/createCalendarMatrix";
import { normalizeWeekDays } from "@/utils/createNormalizedWeekDays";
import { groupDeadlinesByDepartament } from "@/utils/groupDeadlinesByDepartament";
import { isToday } from "date-fns";
import { useMemo } from "react";

export default function WeeklyDeadlineTable() {
  const { weekDays, startDayOfWeek, endDayOfWeek, getCurrentWeek, getNextWeek, getPreviousWeek } =
    useWeek({
      startDate: new Date(),
    });

  const { data, isPending, error } = useGetAllMovimentationDeadlineInRange(
    startDayOfWeek,
    endDayOfWeek,
  );
  const deadlines = data?.data || [];

  const normalizedWeekDays = useMemo(() => normalizeWeekDays(weekDays), [weekDays]);

  const deadlinesByDepartament = useMemo(() => groupDeadlinesByDepartament(deadlines), [deadlines]);

  const calendarMatrix = useMemo(
    () =>
      createCalendarMatrix({
        deadlines,
        normalizedWeekDays,
      }),
    [deadlines, weekDays],
  );

  const createRows = () => {
    const rows = [];

    for (const [departmentId, departmentDeadlines] of deadlinesByDepartament) {
      const department = departmentDeadlines[0].departament;
      const weekMap = calendarMatrix.get(departmentId);

      rows.push(
        <TableRow key={department.id}>
          <TableHead className="w-[150px] font-semibold bg-muted/50">{department.name}</TableHead>

          {normalizedWeekDays.map((day) => {
            const deadlines = weekMap?.get(day.key);

            return (
              <TableCell key={`${department.id}-${day.key}`}>
                <div>
                  {deadlines?.map((deadline) => (
                    <WeekDeadlineCard
                      key={`${department.id}-${deadline.id}-${day.key}`}
                      deadline={deadline}
                      departament={department}
                      weekDay={day.date}
                      weekDays={weekDays}
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

  if (isPending) return <Loader title="Carregando prazos..." />;

  if (error) return <PageMsg title="Erro ao carregar prazos" />;

  return (
    <section>
      <WeekSelector
        startDayOfWeek={startDayOfWeek}
        getCurrentWeek={getCurrentWeek}
        getNextWeek={getNextWeek}
        getPreviousWeek={getPreviousWeek}
      />

      <Table>
        <TableHeader>
          {/* Primeira linha */}
          <TableRow>
            <TableHead className="w-[150px] font-semibold bg-muted/50">DEPARTAMENTOS</TableHead>
            {normalizedWeekDays.map(({ key, date }) => (
              <TableHead
                key={key}
                className={cn(
                  "w-[150px]  p-2 font-semibold bg-muted/50",
                  isToday(date) && "bg-black/60 text-white",
                )}
              >
                <p className="flex flex-col">{DAYS_OF_WEEK[date.getDay() - 1]}</p>
                <p>{isToday(date) ? "Hoje" : key}</p>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{rows}</TableBody>
      </Table>
    </section>
  );
}
