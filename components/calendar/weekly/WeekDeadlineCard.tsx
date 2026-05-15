import { Departament, MovimentationDeadlinePopulated } from "@/types/database.type";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useWeeklyDeadline } from "@/context/useWeeklyDeadline";
import { differenceInDays } from "date-fns";
import useProcessState from "@/hooks/process-state/useProcessState";
import WeekDeadlineCardContextMenu from "./WeekDeadlineCardContextMenu";
import useGetAllMetasInRange from "@/hooks/meta/useGetAllMetasInRange";
import { formatDate } from "@/utils/formatDate";
import Loader from "@/components/custom/Loader";

export type WeekDeadlineCardProps = {
  deadline: MovimentationDeadlinePopulated;
  departament: Departament;
  isExpected?: boolean;
  weekDays: Date[];
  weekDay: Date;
};

export default function WeekDeadlineCard({
  deadline,
  isExpected,
  departament,
  weekDay,
  weekDays,
}: WeekDeadlineCardProps) {
  const { movimentation, started_at, expected_at, finished_at } = deadline;
  const { selectedDeadline, setSelectedDeadline } = useWeeklyDeadline();
  const {
    processStates,
    isPending: isProcessStatesPending,
    isError: processStateError,
  } = useProcessState({ movimentation });

  const firstDayOfWeek = weekDays[0];
  const lastDayOfWeek = weekDays[weekDays.length - 1];
  const {
    data,
    isPending: isMetasPending,
    error: metaError,
  } = useGetAllMetasInRange(firstDayOfWeek, lastDayOfWeek);

  const metasInThisWeek = data?.data || [];
  const metasInThisWeekDay = metasInThisWeek.filter(
    (meta) => formatDate(new Date(meta.ref_date)) == formatDate(weekDay),
  );
  const amountDoneInThisWeek = metasInThisWeekDay
    .map((meta) => meta.amount_done)
    .reduce((curr, prev) => curr + prev, 0);

  // Quando passar o mouse em cima de um card
  const isSameDeadline = selectedDeadline?.id == deadline.id;

  // Dias entre a data que começou e terminou
  const daysAmount = started_at && expected_at ? differenceInDays(expected_at, started_at) + 1 : 0;

  // Quantidade que deve ser feita
  const totalAmount = movimentation.amount;

  // Quantidade restante no departamento para fazer
  const departamentAvaliableAmount = processStates
    .filter((state) => state.process.departament.id == deadline.departament.id)
    .map((state) => state.avaliableAmount)
    .reduce((prev, curr) => prev + curr, 0);

  // Meta diária
  const amountPerDay = Number.parseInt(String(totalAmount / daysAmount));

  const expectedDate = expected_at ? new Date(expected_at) : undefined;
  const finishedDate = finished_at ? new Date(finished_at) : undefined;
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  expectedDate?.setHours(0, 0, 0, 0);
  finishedDate?.setHours(0, 0, 0, 0);

  const isPending = isProcessStatesPending || isMetasPending;
  const isError = processStateError || metaError;

  const isExpired = expectedDate && expectedDate.getTime() < today.getTime();
  const isFinished = finishedDate;
  const isMetaDone = amountDoneInThisWeek >= amountPerDay;

  if (isPending) return <Loader title="Carregando" />;

  if (isError) return <p>Erro ao carregar</p>;

  return (
    <WeekDeadlineCardContextMenu
      departament={departament}
      processStates={processStates}
      metaAmount={amountPerDay}
      metaWeekDate={weekDay}
      deadline={deadline}
      departamentAvaliableAmount={departamentAvaliableAmount}
      hideFinishAction={departamentAvaliableAmount > 0}
      hideFinishMetaAction={isMetaDone}
    >
      <Badge
        asChild
        className={cn(
          "flex flex-co h-fit rounded-none p-3 mt-2",
          !isFinished && "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
          isExpected &&
            !isFinished &&
            "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
          isExpired && !isFinished && "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
          isSameDeadline && isExpired && "border-amber-700",
          isSameDeadline && !isExpected && !isExpired && "border-blue-700 ",
          isSameDeadline && isExpected && "border-amber-700 ",
          isSameDeadline && (isFinished || isMetaDone) && " border-emerald-700",
          (isFinished || isMetaDone) &&
            "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
        )}
        onMouseMove={() => setSelectedDeadline(deadline)}
        onMouseOut={() => setSelectedDeadline(null)}
      >
        <Link
          className={cn("[a]:hover:bg-secondary hover:border transiton-all")}
          href={`/movimentations/${movimentation.id}`}
        >
          <div className="flex flex-col items-start">
            <p className="font-bold mb-1">{movimentation.product.name}</p>
            <p>
              META: {amountPerDay} || OP: {movimentation.product.op || "N/A"}
            </p>
            <p>
              FEITO: {amountDoneInThisWeek} DE {totalAmount}
            </p>
            {/* <p>RESTANTE: {departamentAvaliableAmount}</p> */}
          </div>
        </Link>
      </Badge>
    </WeekDeadlineCardContextMenu>
  );
}
