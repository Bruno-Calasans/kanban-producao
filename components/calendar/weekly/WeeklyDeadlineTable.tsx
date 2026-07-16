/* eslint-disable react-hooks/preserve-manual-memoization */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DailyGoalPopulated,
  DepartamentState,
  ProductionDeadlinePopulated,
  ProductionPopulated,
} from "@/types/database.type";
import { DAYS_OF_WEEK } from "@/constants/others/date";
import { cn } from "@/lib/utils";
import { createCalendarMatrix } from "@/utils/createCalendarMatrix";
import { NormalizedWeekDay, normalizeWeekDays } from "@/utils/createNormalizedWeekDays";
import { groupDeadlinesByDepartament } from "@/utils/groupDeadlinesByDepartament";
import { useMemo } from "react";
import { isToday } from "date-fns";
import { useSelectedWeekDay } from "@/hooks/local-storage/useSelectedWeekDay";
import { groupDeadlinesByProduction } from "@/utils/groupDeadlinesByProduction";
import { groupDeadlineStateByProduction } from "@/utils/groupDeadlineStateByProduction";
import { DepartamentDeadlineState } from "@/utils/calcDepartamentDeadlineState";
import WeekSelector from "@/components/calendar/weekly/WeekSelector";
import useWeek from "@/hooks/use-week/useWeek";
import ExternalWeekDeadlineCard from "./cards/ExternalWeekDeadlineCard/ExternalWeekDeadlineCard";
import InternalWeekDeadlineCard from "@/components/calendar/weekly/cards/InternalWeekDeadlineCard/InternalWeekDeadlineCard";
import sortMapByKey from "@/utils/sortMapByKey";

type CreateRowProps = {
  normalizedWeekDays: NormalizedWeekDay[];
  calendarMatrix: Map<number, Map<string, ProductionDeadlinePopulated[]>>;
  sortedDepartments: [number, ProductionDeadlinePopulated[]][];
  deadlineStateByProduction: Map<number, DepartamentDeadlineState[]>;
};

type WeeklyDeadlineTableProps = {
  productions: ProductionPopulated[];
  deadlines: ProductionDeadlinePopulated[];
  goalsByDeadline: Map<number, DailyGoalPopulated[]>;
  departamentStatesByProduction: Map<number, DepartamentState[]>;
};

export default function WeeklyDeadlineTable({
  productions,
  deadlines,
  goalsByDeadline,
  departamentStatesByProduction,
}: WeeklyDeadlineTableProps) {
  const { selectedWeekDay } = useSelectedWeekDay();
  const { weekDays, startDayOfWeek, getCurrentWeek, getNextWeek, getPreviousWeek } = useWeek({
    startDate: selectedWeekDay ? new Date(selectedWeekDay) : new Date(),
  });

  // Prazos por departamento, por dia da semana
  const createRows = ({
    calendarMatrix,
    normalizedWeekDays,
    sortedDepartments,
    deadlineStateByProduction,
  }: CreateRowProps) => {
    return normalizedWeekDays.map((day) => (
      <TableRow key={day.key}>
        {/* Linha de cabeçalho */}
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

        {/* dados da linha */}
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
                  const deadlineStates =
                    deadlineStateByProduction.get(deadline.production.id) || [];

                  const deadlineState = deadlineStates.find(
                    (state) => state.deadline?.id == deadline.id,
                  )!;

                  const weekDailyGoals = goalsByDeadline?.get(deadline.id) || [];

                  const departamentStates =
                    departamentStatesByProduction.get(deadline.production.id) || [];

                  if (department.is_external) {
                    return (
                      <ExternalWeekDeadlineCard
                        key={`${department.id}-${deadline.id}-${day.key}`}
                        deadline={deadline}
                        weekDay={day.date}
                        deadlineState={deadlineState}
                        departamentStates={departamentStates}
                      />
                    );
                  }

                  return (
                    <InternalWeekDeadlineCard
                      key={`${department.id}-${deadline.id}-${day.key}`}
                      deadline={deadline}
                      weekDay={day.date}
                      departament={department}
                      weekDailyGoals={weekDailyGoals}
                      deadlineState={deadlineState}
                      departamentStates={departamentStates}
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

  const { rows, deadlinesByDepartament, deadlineStateByProduction, deadlinesByProduction } =
    useMemo(() => {
      const deadlinesByDepartament = groupDeadlinesByDepartament(deadlines);

      const sortedDepartments = sortMapByKey(deadlinesByDepartament);

      const normalizedWeekDays = normalizeWeekDays(weekDays);

      const deadlinesByProduction = groupDeadlinesByProduction(deadlines);

      const deadlineStateByProduction = groupDeadlineStateByProduction({
        productions,
        deadlinesByProduction,
        departamentStatesByProduction,
      });

      const calendarMatrix = createCalendarMatrix({
        deadlines,
        normalizedWeekDays,
      });

      const rows = createRows({
        normalizedWeekDays,
        calendarMatrix,
        sortedDepartments,
        deadlineStateByProduction,
      });

      return {
        rows,
        deadlineStateByProduction,
        deadlinesByProduction,
        deadlinesByDepartament,
      };
    }, [weekDays, productions, deadlines, goalsByDeadline, departamentStatesByProduction]);

  return (
    <section>
      <WeekSelector
        startDayOfWeek={startDayOfWeek}
        getCurrentWeek={getCurrentWeek}
        getNextWeek={getNextWeek}
        getPreviousWeek={getPreviousWeek}
      />

      <div className="overflow-auto max-h-[90vh]">
        <Table className="overflow-x-none w-fit">
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
