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
import { MovimentationDeadlinePopulated } from "@/types/database.type";
import { formatDate } from "@/utils/formatDate";

type DeadlineByDepartament = {
  [key in number]: MovimentationDeadlinePopulated[];
};

type DeadlineByDate = {
  [key in string]: MovimentationDeadlinePopulated[];
};

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

  const groupDeadlinesByDepartament = () => {
    const group: DeadlineByDepartament = {};

    for (const deadline of deadlines) {
      const { departament } = deadline;

      if (group[departament.id]) {
        // Adiciona ao grupo se existe
        group[departament.id].push(deadline);
      } else {
        // Cria se não existe
        group[departament.id] = [deadline];
      }
    }

    return group;
  };

  const groupDeadlinesByWeekDay = () => {
    const groups: DeadlineByDate = {};

    for (const deadline of deadlines) {
      const startedAtString = formatDate(new Date(deadline.started_at));
      const expectedAtString = formatDate(new Date(deadline.expected_at));

      for (const weekDay of weekDays) {
        const weekDateString = formatDate(weekDay);
        const dateInThisDay =
          startedAtString === weekDateString || expectedAtString === weekDateString;

        if (!dateInThisDay) continue;

        if (groups[weekDateString]) {
          groups[weekDateString].push(deadline);
        } else {
          groups[weekDateString] = [deadline];
        }
      }
    }

    return groups;
  };

  const deadlinesByDepartamentGroup = groupDeadlinesByDepartament();
  const deadlinesByWeekDay = groupDeadlinesByWeekDay();

  const renderCells = () => {
    const rows: React.ReactNode[] = [];

    for (const departamentKey of Object.keys(deadlinesByDepartamentGroup)) {
      const cells: React.ReactNode[] = [];
      const deadlines = deadlinesByDepartamentGroup[Number(departamentKey)];
      const departament = deadlines[0].departament;

      // Cria primeira célula da tabela
      const firstCell = (
        <TableHead key={departament.id} className="w-[150px] font-semibold bg-muted/50">
          {departament.name}
        </TableHead>
      );
      cells.push(firstCell);

      // Outras células
      for (const weekDay of weekDays) {
        const weekDayString = formatDate(weekDay);
        const deadlineInThisWeek = deadlinesByWeekDay[weekDayString];

        if (deadlineInThisWeek) {
          const startDeadlines = deadlineInThisWeek
            .filter(
              (deadline) =>
                formatDate(new Date(deadline.started_at)) == weekDayString &&
                deadline.departament.id === departament.id,
            )
            .map((deadline) => (
              <WeekDeadlineCard
                key={weekDayString + departament.name + String(deadline.id)}
                deadline={deadline}
              />
            ));

          const endDeadlines = deadlineInThisWeek
            .filter(
              (deadline) =>
                formatDate(new Date(deadline.expected_at)) == weekDayString &&
                deadline.departament.id === departament.id,
            )
            .map((deadline) => (
              <WeekDeadlineCard
                key={weekDayString + departament.name + String(deadline.id)}
                deadline={deadline}
                isExpected
              />
            ));

          cells.push(
            <TableCell key={weekDayString + departament.name + new Date().toLocaleTimeString()}>
              <div>
                {startDeadlines}
                {endDeadlines}
              </div>
            </TableCell>,
          );
        } else {
          cells.push(<TableCell key={weekDayString}></TableCell>);
        }
      }

      rows.push(<TableRow key={departamentKey}>{cells}</TableRow>);
    }

    return rows;
  };

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
          <TableRow>
            <TableHead className="w-[150px] font-semibold bg-muted/50">DEPARTAMENTOS</TableHead>
            {weekDays.map((day) => (
              <TableHead
                key={day.toISOString()}
                className="w-[150px]  p-2 font-semibold bg-muted/50"
              >
                <p className="flex flex-col">{DAYS_OF_WEEK[day.getDay() - 1]}</p>
                <p>({day.toLocaleDateString()})</p>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>{renderCells()}</TableBody>
      </Table>
    </section>
  );
}
