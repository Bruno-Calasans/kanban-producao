import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";
import { groupDeadlinesByDates } from "@/utils/groupDeadlinesByDates";
import { ProductionDeadlinePopulated } from "@/types/database.type";
import { FilterItem } from "@/components/custom/FilterItems";
import { DeadlineDateType } from "./MonthlyDeadlineFilters";
import { groupDeadlinesByMonth } from "@/utils/groupDeadlinesByMonth";

type MonthlyDeadlineCalendarCardProps = {
  deadlines: ProductionDeadlinePopulated[];
  selectedDeadlineDateTypes: FilterItem[];
  onClickDate: (deadlines: ProductionDeadlinePopulated[]) => void;
};

export default function MonthlyDeadlineCalendarCard({
  deadlines,
  selectedDeadlineDateTypes,
  onClickDate,
}: MonthlyDeadlineCalendarCardProps) {
  const [month, setMonth] = useState<Date>(new Date());

  const deadlinesByMonth = useMemo(() => {
    return groupDeadlinesByMonth({ deadlines, month });
  }, [deadlines, month]);

  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <Calendar
          mode="single"
          numberOfMonths={1}
          captionLayout="dropdown-months"
          month={month}
          onMonthChange={setMonth}
          // className="[--cell-size:--spacing(11)] md:[--cell-size:--spacing(16)]"
          // modifiers={{
          //   deadlines: deadlineDates,
          //   startedDealines: startDeadlineDates,
          //   finishedDeadlineDates: finishedDeadlineDates,
          // }}
          modifiersClassNames={{
            selected: "selected",
            // today: "text-black font-bold",
            // deadlines: "border-1 border-black-500 mx-0.5",
            // startedDealines: "border-1 border-indigo-500 mx-0.5",
            // finishedDeadlineDates: "border-1 border-emerald-500 mx-0.5",
          }}
          formatters={{
            formatMonthDropdown: (date) => {
              return date.toLocaleString("default", { month: "long" });
            },
          }}
          components={{
            DayButton: ({ children, modifiers, day, ...props }) => {
              const deadlinesInThisDay = deadlinesByMonth.get(day.date.getDate());

              if (!deadlinesInThisDay)
                return (
                  <CalendarDayButton day={day} modifiers={modifiers} {...props} className="h-26">
                    {children}
                  </CalendarDayButton>
                );

              const { plannedStartDeadlines, plannedEndDeadlines, finishedDeadlines, deadlines } =
                deadlinesInThisDay;

              return (
                <CalendarDayButton
                  day={day}
                  modifiers={modifiers}
                  {...props}
                  className="h-26"
                  onClick={(e) => onClickDate(deadlines)}
                  onBlur={(e) => console.log("blur")}
                >
                  {children}

                  {/* Prazos que terminaram neste dia */}
                  {plannedStartDeadlines.length > 0 &&
                    selectedDeadlineDateTypes.some((t) => t.value == DeadlineDateType.END) && (
                      <Badge
                        variant="ghost"
                        className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 mt-1"
                      >
                        {plannedStartDeadlines.length} prazo(s)
                      </Badge>
                    )}

                  {/* Prazos que começam neste dia */}
                  {plannedEndDeadlines.length > 0 &&
                    selectedDeadlineDateTypes.some((t) => t.value == DeadlineDateType.START) && (
                      <Badge
                        variant="ghost"
                        className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 mt-1"
                      >
                        {plannedEndDeadlines.length} início(s)
                      </Badge>
                    )}

                  {/* Prazos que terminam neste dia */}
                  {finishedDeadlines.length > 0 &&
                    selectedDeadlineDateTypes.some((t) => t.value == DeadlineDateType.FINISHED) && (
                      <Badge
                        variant="ghost"
                        className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 mt-1"
                      >
                        {finishedDeadlines.length} finalizado(s)
                      </Badge>
                    )}
                </CalendarDayButton>
              );
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
