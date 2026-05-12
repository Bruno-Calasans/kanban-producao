"use client";

import * as React from "react";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import Loader from "@/components/custom/Loader";
import PageMsg from "@/components/custom/msgs/PageMsg";
import { Badge } from "@/components/ui/badge";
import PageTitle from "@/components/custom/PageTitle";
import useGetAllMovimentationDeadlinesWithProduct from "@/hooks/movimentation-deadline/useGetAllMovimentationDeadlineWithProduct";
import DepartamentItemSelector, {
  DepartamentItem,
} from "@/components/calendar/DepartamentItemSelector";
import DeadlineCard from "@/components/calendar/DeadlineCard";

export default function MonthlyCalendarPage() {
  const { data, isPending, error, status } = useGetAllMovimentationDeadlinesWithProduct();
  const deadlines = data?.data || [];
  const notEndDeadlines = deadlines.filter((deadline) => !deadline.finished_at);
  const [selectedDepartaments, setSelectedDepartaments] = React.useState<DepartamentItem[]>([]);

  const startDeadlineDates = notEndDeadlines.map((deadline) => new Date(deadline?.started_at));
  const finishedDeadlineDates = deadlines.map((deadline) => new Date(deadline?.finished_at));
  const deadlineDates = notEndDeadlines.map((deadline) => new Date(deadline?.expected_at));
  const selectedDeadlines = notEndDeadlines.filter((deadline) =>
    selectedDepartaments.some((departament) => departament.value === deadline.departament.id),
  );

  if (isPending) return <Loader title="Carregando prazos..." />;

  if (error)
    return (
      <PageMsg
        title="Erro ao carregar prazos"
        content="Ocorreu um erro ao carregar os prazos."
        backBtnUrl="/"
        backBtnLabel="Voltar à página inicial"
      />
    );

  return (
    <div>
      <PageTitle>Calendário Mensal</PageTitle>

      <DepartamentItemSelector
        deadlines={deadlines}
        isLoading={isPending}
        onSelectDepartaments={setSelectedDepartaments}
      />

      <div className="flex gap-4 justify-between">
        <div className="flex flex-col flex-1">
          <p className="font-bold mb-2">Para entregar ({selectedDeadlines.length})</p>
          <div className="flex flex-col gap-3 p-1 overflow-y-scroll h-full">
            {selectedDeadlines.map((deadline) => (
              <DeadlineCard key={deadline.id} deadline={deadline} />
            ))}
          </div>
        </div>

        <Card className="p-0">
          <CardContent className="p-0">
            <Calendar
              mode="single"
              // defaultMonth={range?.from}
              // selected={range}
              // onSelect={setRange}
              numberOfMonths={1}
              captionLayout="dropdown-months"
              className="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(16)]"
              modifiers={{
                deadlines: deadlineDates,
                startedDealines: startDeadlineDates,
                finishedDeadlineDates: finishedDeadlineDates,
              }}
              modifiersClassNames={{
                deadlines: "border-1 border-red-500",
                startedDealines: "border-1 border-indigo-500",
                finishedDeadlineDates: "border-1 border-emerald-500",
              }}
              formatters={{
                formatMonthDropdown: (date) => {
                  return date.toLocaleString("default", { month: "long" });
                },
              }}
              components={{
                DayButton: ({ children, modifiers, day, ...props }) => {
                  const deadlinesInThisDay = deadlineDates.filter(
                    (deadlineDate) =>
                      deadlineDate.toLocaleDateString() === day.date.toLocaleDateString(),
                  );

                  const startedDealinesInThisDay = startDeadlineDates.filter(
                    (deadlineDate) =>
                      deadlineDate.toLocaleDateString() === day.date.toLocaleDateString(),
                  );

                  const finishedDeadlineDatesInThisDay = finishedDeadlineDates.filter(
                    (deadlineDate) =>
                      deadlineDate.toLocaleDateString() === day.date.toLocaleDateString(),
                  );

                  if (finishedDeadlineDatesInThisDay.length > 0) {
                    return (
                      <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                        {children}
                        <Badge
                          variant="ghost"
                          className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 mt-1 "
                        >
                          {finishedDeadlineDatesInThisDay.length} término(s)
                        </Badge>
                      </CalendarDayButton>
                    );
                  }

                  if (deadlinesInThisDay.length > 0) {
                    return (
                      <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                        {children}
                        <Badge
                          variant="ghost"
                          className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 mt-1"
                        >
                          {deadlinesInThisDay.length} entrega(s)
                        </Badge>
                      </CalendarDayButton>
                    );
                  }

                  if (startedDealinesInThisDay.length > 0) {
                    return (
                      <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                        {children}
                        <Badge
                          variant="ghost"
                          className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 mt-1"
                        >
                          {startedDealinesInThisDay.length} iniciado(s)
                        </Badge>
                      </CalendarDayButton>
                    );
                  }

                  return (
                    <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                      {children}
                    </CalendarDayButton>
                  );
                },
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
